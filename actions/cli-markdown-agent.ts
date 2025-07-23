// /actions/cli-markdown-auto-agent.ts

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import http from 'http';

function parseSteps(md: string) {
  // מזהה שלבים על פי כותרות או מחיצות (אפשר לשכלל REGEX)
  return md.split(/\n[-=]{5,}\n|^### |^שלב \d+/gm).map(s => s.trim()).filter(Boolean);
}

function safeLog(msg: string) {
  console.log(msg);
  fs.appendFileSync('agent_execution.log', `[${new Date().toISOString()}] ${msg}\n`);
}

function shell(cmd: string) {
  safeLog(`>> $ ${cmd}`);
  try {
    const out = execSync(cmd, { stdio: 'pipe' }).toString();
    safeLog(out);
    return out;
  } catch (e: any) {
    safeLog(`[Shell ERROR] ${e.stderr ? e.stderr.toString() : e.message}`);
    return null;
  }
}

function fixJson(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  try {
    JSON.parse(content);
    return true;
  } catch (e) {
    // נסה לתקן סוגריים/פסיקים אוטומטית
    content = content.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
    try {
      JSON.parse(content);
      fs.writeFileSync(filePath, content, 'utf-8');
      safeLog(`Fixed JSON formatting in ${filePath}`);
      return true;
    } catch (e) {
      safeLog(`Failed to fix JSON: ${e}`);
      return false;
    }
  }
}

function fileExists(filePath: string) {
  return fs.existsSync(filePath);
}

function createEmptyImage(p: string) {
  fs.writeFileSync(p, Buffer.from(''), 'binary');
  safeLog(`Created empty image placeholder: ${p}`);
}

async function httpCheck(url: string) {
  return new Promise<number | null>(resolve => {
    http.get(url, res => resolve(res.statusCode ?? null)).on('error', () => resolve(null));
  });
}

function updateReport(section: string, details: string) {
  const rep = 'project_review_report.md';
  let txt = '';
  if (fileExists(rep)) txt = fs.readFileSync(rep, 'utf-8');
  txt += `\n## ${section}\n\n${details}\n`;
  fs.writeFileSync(rep, txt, 'utf-8');
}

async function runAgent(markdownFile: string) {
  const md = fs.readFileSync(markdownFile, 'utf-8');
  const steps = parseSteps(md);

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    safeLog(`\n=== Step ${i + 1} ===\n${step}\n`);

    // דוגמה: בדיקות סביבת dev
    if (/development server/i.test(step)) {
      safeLog('Checking Next.js dev server...');
      const code = await httpCheck('http://localhost:3000');
      safeLog(code === 200 ? '✅ Dev server is UP.' : '❌ Dev server is NOT responding.');
    }

    // קבצי JSON — תיקון/בדיקה
    if (step.match(/airports-routes\.json/i)) {
      ['public/airports-routes.json', 'src/components/globe/airports-routes.json'].forEach(p => {
        if (fileExists(p)) {
          safeLog(`Checking JSON: ${p}`);
          if (!fixJson(p)) safeLog(`❌ Could not fix JSON: ${p}`);
        } else {
          safeLog(`❌ Missing JSON: ${p}`);
        }
      });
    }

    // אייקונים — יצירה אוטומטית
    if (step.match(/apple-touch-icon/)) {
      ['public/apple-touch-icon.png', 'public/apple-touch-icon-precomposed.png'].forEach(icon => {
        if (!fileExists(icon)) createEmptyImage(icon);
      });
    }

    // הפעלת פקודות shell מהטקסט
    [
      { p: /pnpm install/, c: 'pnpm install' },
      { p: /npm install/, c: 'npm install' },
      { p: /pnpm build/, c: 'pnpm build' },
      { p: /npm run build/, c: 'npm run build' },
      { p: /rm -rf .next\/cache/, c: 'rm -rf .next/cache' },
      { p: /npm audit fix/, c: 'npm audit fix --force' },
      { p: /pnpm audit fix/, c: 'pnpm audit fix --force' }
    ].forEach(({ p, c }) => { if (step.match(p)) shell(c); });

    if (/Restart the Next.js development server/.test(step)) {
      safeLog('⚠️  Please open a new terminal and run: pnpm run dev');
      safeLog('Press Enter to continue after the dev server is running...');
      const readline = (await import('readline/promises')).createInterface({ input: process.stdin, output: process.stdout });
      await readline.question('Press Enter to continue...');
      readline.close();
    }

    // Update report on every step
    updateReport(`Step ${i + 1}`, step);

    // Check for halt/stop keywords (if needed)
    if (/STOP_AGENT|CRITICAL_ERROR/.test(step)) {
      safeLog('🚨 Stopping agent on critical error/keyword.');
      break;
    }
  }

  safeLog('\n✅ All steps completed! See agent_execution.log & project_review_report.md for details.\n');
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('cli-markdown-auto-agent.ts')) {
  const mdFile = process.argv[2];
  if (!mdFile) {
    console.log('Usage: pnpm exec tsx actions/cli-markdown-auto-agent.ts <task_markdown.md>');
    process.exit(1);
  }
  runAgent(mdFile);
}

export {};