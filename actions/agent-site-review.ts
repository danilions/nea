// actions/agent-site-review.ts

/**
 * @fileoverview סוכן זה אחראי על סקירה ראשונית של האתר, זיהוי בעיות בסיסיות,
 * ואיסוף מידע לקראת משימות שדרוג עתידיות.
 *
 * @typedef {import('./task').Agent} Agent
 * @typedef {import('./task').Task} Task
 */

import { Agent } from './task';

export const siteReviewAgent: Agent = {
  id: 'site-review-agent',
  name: 'Site Review Agent',
  description: 'Performs an initial audit of the website to identify core issues and gather information for future tasks.',
  tasks: [
    {
      id: 'review-tech-stack-versions',
      name: 'Review Technology Stack Versions',
      description: 'Audit the current versions of core technologies (Next.js, React, Tailwind, TypeScript) from package.json.',
      instructions: [
        'Open `package.json` and `tsconfig.txt`.',
        'Identify the exact versions for Next.js, React, Tailwind, and TypeScript.',
        'Note any missing key dependencies (e.g., React itself, if not already addressed).',
        'Assess if versions are outdated compared to latest stable releases.'
      ],
      affectedFiles: ['package.json', 'tsconfig.txt'],
      output: 'Report on current technology versions and potential outdated dependencies.'
    },
    {
      id: 'audit-typescript-config',
      name: 'Audit TypeScript Configuration',
      description: 'Check TypeScript strict mode and other compiler options for best practices.',
      instructions: [
        'Open `tsconfig.txt`.',
        'Verify if `"strict": true` is enabled. If not, flag this as a critical improvement area.',
        'Review other `compilerOptions` for common best practices (e.g., `noImplicitAny`, `forceConsistentCasingInFileNames`).'
      ],
      affectedFiles: ['tsconfig.txt'],
      output: 'Report on TypeScript configuration adherence to best practices.'
    },
    {
      id: 'evaluate-styling-approach',
      name: 'Evaluate Styling Approach',
      description: 'Analyze how global and component-specific styles are managed and identify centralization opportunities.',
      instructions: [
        'Open `styles/global.css`, `tailwind.config.js`, and a sample UI component (`src/components/ui/Button.tsx`).',
        'Determine if design tokens (colors, spacing, fonts) are centralized using CSS variables or Tailwind theme extensions.',
        'Assess consistency in styling application (e.g., direct CSS vs. Tailwind classes vs. CSS-in-JS if any).',
        'Identify opportunities for better theme management and component styling consistency.'
      ],
      affectedFiles: ['styles/global.css', 'tailwind.config.js', 'src/components/ui/*'],
      output: 'Report on current styling methodology and recommendations for centralization.'
    },
    {
      id: 'check-documentation-gaps',
      name: 'Check Documentation Gaps',
      description: 'Identify missing or incomplete documentation sections.',
      instructions: [
        'Open `README.md`.',
        'Check for sections related to Accessibility, DevOps/CI/CD, Security, and Multilingual contribution guidelines (especially Hebrew).',
        'Note any areas where current documentation is sparse or non-existent.'
      ],
      affectedFiles: ['README.md'],
      output: 'List of identified documentation gaps.'
    },
    {
      id: 'initial-accessibility-scan',
      name: 'Initial Accessibility Scan (Conceptual)',
      description: 'Perform a high-level conceptual scan for obvious accessibility issues.',
      instructions: [
        'Visually inspect key pages for obvious color contrast issues (e.g., light text on light background).',
        'Attempt basic keyboard navigation (using `Tab` key) on the homepage and a modal (if present). Note any non-focusable elements.',
        'Check if major images appear to have `alt` attributes (conceptual check, full audit requires tools).'
      ],
      affectedFiles: ['src/app/page.tsx', 'src/components/ui/Modal.tsx', 'All images in `public/`'],
      output: 'Preliminary findings on accessibility, noting areas for detailed audit.'
    }
  ]
};