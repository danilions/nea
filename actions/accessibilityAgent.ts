// actions/accessibilityAgent.ts

/**
 * @fileoverview סוכן זה מתמקד בשיפור הנגישות (Accessibility) של הפרויקט,
 * כולל הטמעת מאפייני ARIA, הבטחת ניווט מקלדת ובדיקת ניגודיות צבעים.
 *
 * @typedef {import('./task').Agent} Agent
 * @typedef {import('./task').Task} Task
 */

import { Agent } from './task.js';

export const accessibilityAgent: Agent = {
  id: 'accessibility-agent',
  name: 'Accessibility Agent',
  description: 'Ensures the application meets accessibility standards.',
  tasks: [
    {
      id: 'task-implement-aria',
      name: 'Implement ARIA Attributes',
      description: 'Add appropriate ARIA attributes to all interactive UI components.',
      instructions: [
        'Review all interactive components in `src/components/ui/` (e.g., `Button.tsx`, `Modal.tsx`, `SearchBar.tsx`).',
        'Add `aria-label`, `role`, `aria-hidden`, and other relevant ARIA attributes based on component type and state. Example: `<button aria-label="סגור חלון">`.',
        'Specifically ensure interactive points on the globe (`src/components/globe/GlobeVisualization.tsx`) have proper ARIA labels if they are clickable/focusable.'
      ],
      affectedFiles: ['src/components/ui/*', 'src/components/globe/GlobeVisualization.tsx'],
      output: 'UI components are semantically rich with ARIA attributes.'
    },
    {
      id: 'task-keyboard-navigation',
      name: 'Ensure Keyboard Navigation',
      description: 'Verify and implement full keyboard navigability for all interactive elements.',
      instructions: [
        'Test tab order across all pages (especially main page and modals) by pressing the `Tab` key.',
        'Ensure all clickable elements (buttons, links, globe points) are focusable and can be activated via `Enter` or `Space` keys.',
        'In `src/components/ui/Modal.tsx`, implement focus management: move focus to the first interactive element when the modal opens, and trap focus within the modal until closed. Restore focus to the triggering element on close.'
      ],
      affectedFiles: ['src/components/ui/*', 'src/components/globe/GlobeVisualization.tsx'],
      output: 'Website fully navigable using only a keyboard.'
    },
    {
      id: 'task-color-contrast',
      name: 'Check Color Contrast & Alt Text',
      description: 'Ensure sufficient color contrast and provide alt text for images.',
      instructions: [
        'Use browser developer tools (e.g., Chrome Lighthouse Audit, axe DevTools extension) to audit color contrast ratios across the site, focusing on text and interactive elements.',
        'Adjust colors in `styles/global.css` or `tailwind.config.js` if contrast ratios are below WCAG guidelines (minimum 4.5:1 for normal text).',
        'Add descriptive `alt` attributes to all `<img>` tags throughout the project. For meaningful SVG icons, use `aria-label` or `<title>` within the SVG element.'
      ],
      affectedFiles: ['styles/global.css', 'tailwind.config.js', 'src/components/*', 'public/*'],
      output: 'Improved visual accessibility and screen reader support for images.'
    }
  ]
};