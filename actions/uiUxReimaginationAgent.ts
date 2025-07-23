// actions/uiUxReimaginationAgent.ts

/**
 * @fileoverview סוכן זה אחראי על שינוי משמעותי בחוויית המשתמש והעיצוב,
 * תוך מיקוד בגלובוס האינטראקטיבי כמרכז הממשק.
 *
 * @typedef {import('./task').Agent} Agent
 * @typedef {import('./task').Task} Task
 */

import { Agent } from './task.js';

export const uiUxReimaginationAgent: Agent = {
  id: 'ui-ux-reimagination-agent',
  name: 'UI/UX Reimagination Agent',
  description: 'Orchestrates the redesign of the website around the interactive globe.',
  tasks: [
    {
      id: 'task-globe-refactor',
      name: 'Refactor GlobeVisualization Component',
      description: 'Enhance src/components/globe/GlobeVisualization.tsx to be the primary interactive element and menu.',
      instructions: [
        'Open `src/components/globe/GlobeVisualization.tsx`. Evaluate its current 3D rendering library (if `sigma` is only for graphs, consider `three.js` or `react-three-fiber` for full 3D globe visualization).',
        'Implement dynamic points of interest on the globe. These points should represent navigation links (e.g., `/about`, `/services`).',
        'Add `onClick` and `onHover` event listeners to these points to trigger visual animations (e.g., glow, pulse) and navigate using Next.js `useRouter`.',
        'Refactor `src/app/page.tsx` to center `GlobeVisualization` as the main hero section. Remove or adapt existing sections like `Experience.tsx`, `TimelineRail.tsx`, etc., to either be accessible via globe interactions or moved to other pages.'
      ],
      affectedFiles: ['src/components/globe/GlobeVisualization.tsx', 'src/app/page.tsx', 'package.json' /* if new 3D lib */],
      dependencies: ['task-install-react', 'task-enable-typescript-strict'],
      output: 'Interactive globe serving as main UI with navigation capabilities.'
    },
    {
      id: 'task-milky-way-background',
      name: 'Implement Milky Way Background',
      description: 'Add a dynamic, subtle Milky Way background to the layout.',
      instructions: [
        'Open `styles/global.css`. Define CSS `@keyframes` for a subtle starfield animation (e.g., `twinkle` or `moveBackground`).',
        'Add a new `div` element with a class like `milky-way-background` to `src/app/layout.tsx`. Position it with `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1;`.',
        'Apply the defined CSS animations and background properties (e.g., `background-image` of a Milky Way texture) to this `div`. Ensure responsiveness for various screen sizes.'
      ],
      affectedFiles: ['src/app/layout.tsx', 'styles/global.css', 'public/images/milky-way.jpg' /* if adding image */],
      output: 'Animated Milky Way background integrated into global layout.'
    },
    {
      id: 'task-integrate-framer-motion-animations',
      name: 'Integrate Framer Motion Animations',
      description: 'Utilize framer-motion for smooth transitions and interactions on the globe and UI components.',
      instructions: [
        'Import `motion` from `framer-motion` into `src/components/globe/GlobeVisualization.tsx`. Apply `motion` components (`<motion.div>`, `<motion.mesh>`) to animate globe rotation, zoom levels, and point interactions (e.g., `whileHover`, `whileTap`).',
        'Open `src/components/ui/Modal.tsx`. Wrap the modal content with `<AnimatePresence>` and `<motion.div>` to implement entrance and exit animations (e.g., `initial`, `animate`, `exit` variants for fade and slide effects).',
        'Consider animating the visibility or size of `src/components/Header.tsx` based on user interaction with the globe (e.g., `animate={{ opacity: isGlobeActive ? 0.5 : 1 }}`).'
      ],
      affectedFiles: ['src/components/globe/GlobeVisualization.tsx', 'src/components/ui/Modal.tsx', 'src/components/Header.tsx'],
      dependencies: ['task-globe-refactor'],
      output: 'Enhanced animations across key UI components using Framer Motion.'
    }
  ]
};