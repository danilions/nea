import fs from 'fs';
import yaml from 'yaml';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

function runStep(step: any): boolean {
  console.log(`\n>>> ${step.name || 'Step'} <<<`);
  try {
    execSync(step.run, { stdio: 'inherit', shell: '/bin/zsh' });
    console.log('✅ Success');
    return true;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('❌ Failed:', e.message);
    } else {
      console.error('❌ Failed:', JSON.stringify(e));
    }
    return false;
  }
}

function runMission(yamlPath: string): void {
  const doc = yaml.parse(fs.readFileSync(yamlPath, 'utf8'));
  console.log(`\n=== ${doc.task} ===\n${doc.description}\n`);
  for (const step of doc.steps) {
    if (!runStep(step)) break;
  }
}

function main() {
  const file = process.argv[2];
  if (!file) {
    // fallback to all missions in the directory (optional)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const missionsDir = path.resolve(__dirname, '../agent-missions/homepage-upgrade');
    const files = fs.readdirSync(missionsDir).filter(f => f.endsWith('.yaml'));
    for (const f of files) runMission(path.join(missionsDir, f));
  } else {
    runMission(file);
  }
}
main();