import fs from 'fs';
import path from 'path';

async function main() {
  const [, , taskFile] = process.argv;
  if (!taskFile || !fs.existsSync(taskFile)) {
    console.error('❌ Must provide a valid path to a task.json file.');
    process.exit(1);
  }
  const raw = fs.readFileSync(taskFile, 'utf-8');
  const task = JSON.parse(raw);
  const agentId = (task.agent || '').replace(/^agent-/, '').replace(/-.*/, '');
  const actionPath = path.resolve(__dirname, `../actions/agent-${agentId}.ts`);
  if (fs.existsSync(actionPath)) {
    try {
      const mod = await import(actionPath);
      if (typeof mod.default === 'function') {
        await mod.default(task, taskFile);
      } else {
        console.error(`❌ No default export function in ${actionPath}`);
        process.exit(1);
      }
    } catch (e) {
      console.error(`❌ Error running agent-${agentId}:`, e);
      process.exit(1);
    }
  } else {
    console.warn(
      `⚠️  No implementation for agent-${agentId}. Please create actions/agent-${agentId}.ts`,
    );
    process.exit(0);
  }
}

main();
