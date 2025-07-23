
/**
 * @fileoverview
 * סוכן זה אחראי על משימות ניקוי פנימיות, בדיקות אימות, ואופטימיזציות כלליות
 * לאחר שינויים משמעותיים בקוד הפרויקט (כמו הסרת רכיבים).
 * מטרתו לוודא שהפרויקט נקי, יציב, ומוכן להמשך פיתוח.
 *
 * @typedef {import('./task').Agent} Agent
 * @typedef {import('./task').Task} Task
 */

import { Agent } from '../task';

export const internalCleanupAgent: Agent = {
  id: 'internal-cleanup-agent',
  name: 'Internal Project Cleanup & Optimization Agent',
  description: 'Finalizes refactoring by ensuring unused components are fully removed, project configurations are optimized, and basic health checks are performed.',
  tasks: [
    {
      id: 'cleanup-removed-components-references',
      name: 'Cleanup References to Removed Components',
      description: 'Scan the entire codebase for any remaining imports or references to previously removed components and delete them.',
      instructions: [
        'Scan all `.tsx`, `.ts`, and `.js` files in `src/` and `styles/` directories.',
        'Specifically look for and remove any `import` statements referencing:',
        '  - `ClientBackground` (from `ClientBackground.tsx`)',
        '  - `GlobeVisualization` (from `GlobeVisualization.tsx`)',
        '  - `CommandPalette` (from `CommandPalette.tsx`)',
        '  - `TimelineRail` (from `TimelineRail.tsx`)',
        '  - `FeedRail` (from `FeedRail.tsx`)',
        '  - `EvidenceVault` (from `EvidenceVault.tsx`)',
        'Also, search for and remove any JSX usage (e.g., `<ClientBackground />`, `<GlobeVisualization />`) of these components.',
        'Remove any test files associated with these components if they still exist (e.g., `GlobeVisualization.test.tsx`, `TimelineRail.test.tsx`, `FeedRail.test.tsx`, `EvidenceVault.test.tsx`).'
      ],
      affectedFiles: [
        'src/**/*.tsx', 'src/**/*.ts', 'src/**/*.js', // All source files
        'styles/**/*.css', // Potentially global CSS references
        'src/app/layout.tsx', // Specific check
        'src/app/page.tsx', // Specific check
        'src/components/index.ts', // Specific check for barrel file
        'src/components/globe/GlobeVisualization.test.tsx', // Example test file
        'src/components/timeline/TimelineRail.test.tsx', // Example test file
        'src/components/updates/FeedRail.test.tsx', // Example test file
        'src/components/vault/EvidenceVault.test.tsx' // Example test file
      ],
      output: 'Codebase is free of references to removed components.'
    },
    {
      id: 'verify-homepage-integration',
      name: 'Verify Core UI Integration (GalacticGlobeApp)',
      description: 'Confirm that `src/app/page.tsx` exclusively uses `GalacticGlobeApp.tsx` as its main content entry point.',
      instructions: [
        'Open `src/app/page.tsx`.',
        'Verify that it imports only `GalacticGlobeApp` from `@/components/globe/GalacticGlobeApp`.',
        'Verify that the `HomePage` component (or its equivalent) returns only `<GalacticGlobeApp />` and no other UI components.'
      ],
      affectedFiles: ['src/app/page.tsx'],
      output: 'Homepage (`src/app/page.tsx`) correctly integrates `GalacticGlobeApp` as the sole main UI component.'
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
      dependencies: ['cleanup-removed-components-references', 'verify-homepage-integration'], // Depends on previous cleanup
      output: 'Project builds successfully with TypeScript strict mode enabled and no new type errors.'
    },
    {
      id: 'review-unused-dependencies',
      name: 'Review and Remove Unused Dependencies',
      description: 'Identify and remove any dependencies in `package.json` that are no longer used after component deletions and refactoring.',
      instructions: [
        'Manually review `package.json` `dependencies` and `devDependencies` sections.',
        'Look for packages that were primarily used by the components you deleted (e.g., `globe.gl` if `GlobeVisualization` was its only user, `sigma` if `NetworkGraph` was its only user, `@headlessui/react` if `ActorModal` and `Modal` were the only users and `Modal` is now internal to `GalacticGlobeApp`).',
        'Consider running a tool like `depcheck` (install with `pnpm add -D depcheck` then run `pnpm depcheck`) to help identify unused dependencies, but review its output carefully as it might miss dynamic imports or specific usages.',
        'Remove identified unused dependencies using `pnpm remove <package-name>` (or `npm uninstall <package-name>`).'
      ],
      affectedFiles: ['package.json', 'pnpm-lock.yaml'],
      dependencies: ['cleanup-removed-components-references'], // Depends on cleanup being done
      output: '`package.json` is cleaned from unused dependencies, improving build times and bundle size.'
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
      affectedFiles: [], // This task checks the whole project, doesn't modify specific files directly
      dependencies: ['final-typescript-strict-check', 'review-unused-dependencies'], // Depends on code being clean and built
      output: 'Confirmation that the application builds and runs without critical errors, and the core UI is functional.'
    }
  ]
};
