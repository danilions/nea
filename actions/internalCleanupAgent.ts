// actions/internalCleanupAgent.ts

/**
 * @fileoverview
 * סוכן זה אחראי על משימות ניקוי פנימיות, בדיקות אימות, ואופטימיזציות כלליות
 * לאחר שינויים משמעותיים בקוד הפרויקט (כמו הסרת רכיבים).
 * מטרתו לוודא שהפרויקט נקי, יציב, ומוכן להמשך פיתוח.
 *
 * @typedef {import('./task').Agent} Agent
 * @typedef {import('./task').Task} Task
 */

import { Agent } from './task';

export const internalCleanupAgent: Agent = {
  id: 'internal-cleanup-agent',
  name: 'Internal Project Cleanup & Optimization Agent',
  description: 'Finalizes refactoring by ensuring unused components are fully removed, project configurations are optimized, and basic health checks are performed.',
  tasks: [
    {
      id: 'cleanup-agent-files-structure',
      name: 'Cleanup Agent and Actions Directory Structure',
      description: 'Remove duplicate agent files and incorrect directory nesting for agent definitions.',
      instructions: [
        'Delete the redundant directory: `actions/actions/`.',
        'Delete the duplicate file: `actions/fullMissionPlan.js`.',
        'Delete the duplicate file: `agents/ run-agent.ts`. (Note the space in the filename, ensure correct deletion).',
        'Ensure `actions/fullMissionPlan.ts` is the single source for all agent definitions.',
        'Verify that `scripts/run-agent.ts` correctly imports from `actions/fullMissionPlan.ts` or individual agent files directly under `actions/`.'
      ],
      affectedFiles: [
        'actions/actions/', // Directory to delete
        'actions/fullMissionPlan.js', // File to delete
        'agents/ run-agent.ts', // File to delete
        'actions/fullMissionPlan.ts', // Verify this is the canonical one
        'scripts/run-agent.ts' // Verify imports
      ],
      output: 'Agent and actions directory structure is clean and correct.'
    },
    {
      id: 'cleanup-unused-dependencies',
      name: 'Remove Unused Dependencies',
      description: 'Identify and remove any dependencies in `package.json` that are no longer used after component deletions and refactoring.',
      instructions: [
        'Open `package.json`.',
        'Remove `globe.gl` from `dependencies` (it is no longer used).',
        'If `sigma` is *only* used by `NetworkGraph.tsx` and `NetworkGraph.tsx` is now part of `ActorModal` and *not* using `sigma` for 3D rendering (which is now done by react-three-fiber), then remove `sigma` as well. If `NetworkGraph.tsx` still uses `sigma` for its 2D graph, then keep `sigma`. (Based on previous instructions, `NetworkGraph.tsx` *was* updated to use `sigma`, so keep it for now unless explicitly told otherwise).',
        'Run `pnpm install` (or `npm install`) to update `pnpm-lock.yaml` and remove the uninstalled packages.'
      ],
      affectedFiles: ['package.json', 'pnpm-lock.yaml'],
      output: '`package.json` is cleaned from unused dependencies.'
    },
    {
      id: 'resolve-storybook-peer-dependencies',
      name: 'Resolve Storybook Peer Dependency Issues',
      description: 'Address the persistent peer dependency warnings related to Storybook packages.',
      instructions: [
        'Review the specific Storybook peer dependency warnings from your `pnpm install` output.',
        'Based on the expected Storybook version (e.g., `8.x` or `9.x`), explicitly install the missing `storybook` package as a `devDependency`. Example: `pnpm add -D storybook@^8.x.x` or `pnpm add -D storybook@^9.x.x`.',
        'If warnings persist, consider upgrading all `@storybook/*` packages to a consistent, latest major version using `pnpm update "@storybook/*" --latest` and then `pnpm install`.'
      ],
      affectedFiles: ['package.json', 'pnpm-lock.yaml'],
      output: 'Storybook peer dependency warnings are resolved.'
    },
    {
      id: 'final-typescript-strict-check',
      name: 'Final TypeScript Strict Mode Check',
      description: 'Re-run TypeScript build to ensure no new strict mode errors appeared after recent changes and all types are correct.',
      instructions: [
        'Run `pnpm build` (or `npm run build`) in your terminal.',
        'If any TypeScript errors are reported, go through each one and fix it by adding explicit types, null checks, or refining interfaces/types until the build passes without errors.'
      ],
      affectedFiles: ['All .ts/.tsx files'],
      output: 'Project builds successfully with TypeScript strict mode enabled and no new type errors.'
    },
    {
      id: 'basic-project-health-check',
      name: 'Basic Project Health Check (Build & Run)',
      description: 'Perform a final build and run the application to ensure everything works as expected after all changes.',
      instructions: [
        'Run `pnpm build` (or `npm run build`) in your terminal to ensure a production-ready build can be created.',
        'Run `pnpm dev` (or `npm run dev`) and open the application in your browser (usually `http://localhost:3000`).',
        'Visually inspect the homepage: Verify the Galactic Globe loads correctly, textures are visible, animations are smooth, and UI elements (search bar, modal) are functional and responsive.',
        'Check the browser developer console (F12) for any runtime errors or warnings.'
      ],
      affectedFiles: [],
      output: 'Confirmation that the application builds and runs without critical errors, and the core UI is functional.'
    }
  ]
};
