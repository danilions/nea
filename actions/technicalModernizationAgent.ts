// actions/technicalModernizationAgent.ts

/**
 * @fileoverview סוכן זה אחראי על משימות מודרניזציה טכנית בפרויקט,
 * כולל ניהול תלויות, הגדרות TypeScript ומרכוז סגנונות.
 *
 * @typedef {import('./task').Agent} Agent
 * @typedef {import('./task').Task} Task
 */

import { Agent } from './task.js';

export const technicalModernizationAgent: Agent = {
  id: 'technical-modernization-agent',
  name: 'Technical Modernization Agent',
  description: 'Handles core technical debt, dependencies, and configuration updates.',
  tasks: [
    {
      id: 'task-install-react',
      name: 'Install React Dependency',
      description: 'Add React and React-DOM to package.json and install.',
      instructions: [
        'Open `package.json` and add `"react": "^19.0.0"` and `"react-dom": "^19.0.0"` to `devDependencies`.',
        'Execute `pnpm install` (or `npm install`) from the project root in your terminal.'
      ],
      affectedFiles: ['package.json', 'pnpm-lock.yaml'],
      output: '`package.json` updated with React, dependencies installed.'
    },
    {
      id: 'task-enable-typescript-strict',
      name: 'Enable TypeScript Strict Mode',
      description: 'Modify tsconfig.json to enable strict mode and resolve all resulting errors.',
      instructions: [
        'Open `tsconfig.txt` and change `"strict": false` to `"strict": true` in the `compilerOptions` section.',
        'Run `pnpm build` (or `npm run build`) in your terminal to identify all TypeScript errors.',
        'Go through each identified error in your codebase (`.ts`/`.tsx` files) and fix it by adding explicit types, null checks, or refining interfaces/types.'
      ],
      affectedFiles: ['tsconfig.txt', 'All .ts/.tsx files'],
      dependencies: ['task-install-react'],
      output: 'TypeScript strict mode enabled and all type errors resolved.'
    },
    {
      id: 'task-centralize-styling',
      name: 'Centralize Styling & Theming',
      description: 'Create a centralized theme configuration and explore dynamic theming.',
      instructions: [
        'Open `styles/global.css` and define core design tokens (colors, spacing, fonts) as CSS variables under `:root`. Example: `--color-primary: #0070f3;`.',
        'Open `tailwind.config.js` and extend the `theme.extend` section to map Tailwind classes to these new CSS variables. Example: `colors: { primary: "var(--color-primary)" }`.',
        'Update existing components in `src/components/ui/` to exclusively use Tailwind classes based on the new theme tokens (e.g., replace `text-[#hexcode]` with `text-primary`).'
      ],
      affectedFiles: ['styles/global.css', 'tailwind.config.js', 'src/components/ui/*'],
      output: 'Centralized styling system using Tailwind and CSS variables.'
    }
  ]
};