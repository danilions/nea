// actions/documentationAgent.ts

/**
 * @fileoverview סוכן זה אחראי על עדכון והרחבת התיעוד בפרויקט,
 * כולל הוספת סעיפים חדשים ל-README והנחיות לוקליזציה לעברית.
 *
 * @typedef {import('./task').Agent} Agent
 * @typedef {import('./task').Task} Task
 */

import { Agent } from './task.js';

export const documentationAgent: Agent = {
  id: 'documentation-agent',
  name: 'Documentation Agent',
  description: 'Updates and expands project documentation.',
  tasks: [
    {
      id: 'task-expand-readme',
      name: 'Expand README.md',
      description: 'Add sections for Accessibility, DevOps, CI/CD, and Security to the README.',
      instructions: [
        'Open `README.md`.',
        'Add a dedicated `## Accessibility Guidelines` section, detailing best practices for accessible component development (ARIA, keyboard navigation, color contrast).',
        'Add a `## DevOps & CI/CD` section, explaining the GitHub Actions workflow (`.github/workflows/ci.yml`) and deployment processes.',
        'Include a `## Security Best Practices` section covering dependency updates, secrets management, and common web vulnerabilities.',
        'Update the `## UI/UX Reimagination: The Galactic Globe` section to reflect the new design concept and implementation guidelines.'
      ],
      affectedFiles: ['README.md'],
      output: 'Comprehensive `README.md` updated with new critical sections.'
    },
    {
      id: 'task-hebrew-localization-guidelines',
      name: 'Add Hebrew Localization Guidelines',
      description: 'Create basic Hebrew localization files and add documentation on translation processes.',
      instructions: [
        'In your terminal, navigate to the project root and run: `mkdir -p public/locales/he/ && cp public/locales/en/*.json public/locales/he/` to create Hebrew locale directories and copy English templates.',
        'Open `i18n.js`. Verify or update its configuration to ensure `he` (Hebrew) is recognized as a supported language and its resources are loaded.',
        'Open `README.md` (or create `LOCALIZATION.md`) and add a `## Localization (תרגום)` section. Detail: the structure of translation files, how to add new Hebrew translation keys, edit existing ones, and maintain consistency across languages. Also, include considerations for RTL (Right-To-Left) layout if applicable.'
      ],
      affectedFiles: ['public/locales/he/*', 'i18n.js', 'README.md'],
      output: 'Hebrew localization infrastructure and documentation established.'
    }
  ]
};