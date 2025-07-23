// Auto-generated JS version of fullMissionPlan for Node.js ESM automation

export const siteReviewAgent = {
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
        'Note any missing key dependencies (e.g., React itself).',
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

export const technicalModernizationAgent = {
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
    },
    {
      id: 'task-install-3d-libs',
      name: 'Install 3D Libraries',
      description: 'Install three.js, @react-three/fiber, and @react-three/drei for 3D globe visualization.',
      instructions: [
        'Execute `pnpm add three @react-three/fiber @react-three/drei` (or `npm install three @react-three/fiber @react-three/drei`) in your terminal.'
      ],
      affectedFiles: ['package.json', 'pnpm-lock.yaml'],
      output: '3D rendering libraries installed and ready for use.'
    }
  ]
};

export const accessibilityAgent = {
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
        'Specifically ensure interactive points on the globe (`src/components/globe/GalacticGlobeApp.tsx`) have proper ARIA labels if they are clickable/focusable.'
      ],
      affectedFiles: ['src/components/ui/*', 'src/components/globe/GalacticGlobeApp.tsx'],
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
      affectedFiles: ['src/components/ui/*', 'src/components/globe/GalacticGlobeApp.tsx'],
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

export const uiUxReimaginationAgent = {
  id: 'ui-ux-reimagination-agent',
  name: 'UI/UX Reimagination Agent',
  description: 'Orchestrates the redesign of the website around the interactive globe.',
  tasks: [
    {
      id: 'task-create-galactic-globe-app',
      name: 'Create GalacticGlobeApp Component',
      description: 'Create the main GalacticGlobeApp.tsx component with the provided 3D globe, animations, and UI.',
      instructions: [
        'Create a new file: `src/components/globe/GalacticGlobeApp.tsx`.',
        'Paste the entire React component code for the "Galactic Globe Interactive Application" (as previously provided) into this new file.',
        'Ensure all imports (React, Three.js, React-Three-Fiber, Drei, Framer Motion) are correct.',
        'Replace placeholder texture URLs in `GalacticGlobeApp.tsx` with actual paths to high-resolution Earth textures (map, bump, specular, clouds, night lights) located in your `public/` directory (e.g., `/images/earth_map.jpg`).'
      ],
      affectedFiles: ['src/components/globe/GalacticGlobeApp.tsx', 'public/images/*'],
      dependencies: ['task-install-react', 'task-enable-typescript-strict', 'task-install-3d-libs'],
      output: '`GalacticGlobeApp.tsx` created with full 3D globe implementation.'
    },
    {
      id: 'task-update-homepage',
      name: 'Update Homepage to Use GalacticGlobeApp',
      description: 'Replace the existing homepage content with the new GalacticGlobeApp component.',
      instructions: [
        'Open `src/app/page.tsx`.',
        'Import `GalacticGlobeApp` from `@/components/globe/GalacticGlobeApp`.',
        'Replace all existing content within the `export default function HomePage() { return (...) }` with `<GalacticGlobeApp />`.',
        'Remove any old imports or usage of components that previously formed the homepage (e.g., `Header`, `Experience`, `TimelineRail`, etc.) unless they are explicitly used *within* `GalacticGlobeApp`.',
        'Ensure `src/components/globe/airports-routes.json` is accessible and correctly structured as the data source.'
      ],
      affectedFiles: ['src/app/page.tsx'],
      dependencies: ['task-create-galactic-globe-app'],
      output: 'Homepage (`src/app/page.tsx`) now displays the Galactic Globe application.'
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
      affectedFiles: ['src/app/layout.tsx', 'styles/global.css', 'public/images/milky-way.jpg'],
      output: 'Animated Milky Way background integrated into global layout.'
    },
    {
      id: 'task-integrate-framer-motion-animations',
      name: 'Integrate Framer Motion Animations',
      description: 'Utilize framer-motion for smooth transitions and interactions on the globe and UI components.',
      instructions: [
        'Import `motion` from `framer-motion` into `src/components/globe/GalacticGlobeApp.tsx`. Apply `motion` components (`<motion.div>`, `<motion.mesh>`) to animate globe rotation, zoom levels, and point interactions (e.g., `whileHover`, `whileTap`).',
        'Ensure `src/components/ui/Modal.tsx` (as used within `GalacticGlobeApp`) wraps its content with `<AnimatePresence>` and `<motion.div>` to implement entrance and exit animations (e.g., `initial`, `animate`, `exit` variants for fade and slide effects).',
        'Consider animating the visibility or size of `src/components/Header.tsx` based on user interaction with the globe (e.g., `animate={{ opacity: isGlobeActive ? 0.5 : 1 }}`).'
      ],
      affectedFiles: ['src/components/globe/GalacticGlobeApp.tsx', 'src/components/ui/Modal.tsx', 'src/components/Header.tsx'],
      dependencies: ['task-create-galactic-globe-app'],
      output: 'Enhanced animations across key UI components using Framer Motion.'
    }
  ]
};

export const documentationAgent = {
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
    },
    {
      id: 'task-document-3d-libs',
      name: 'Document 3D Libraries Usage',
      description: 'Add documentation on how Three.js, React-Three-Fiber, and Drei are used in the project.',
      instructions: [
        'Open `README.md` or create a new dedicated documentation file (e.g., `docs/3d-implementation.md`).',
        'Document the purpose of each 3D library (`three.js`, `@react-three/fiber`, `@react-three/drei`) in the context of the Galactic Globe.',
        'Provide basic guidelines for adding new 3D elements or extending the globe functionality.'
      ],
      affectedFiles: ['README.md', 'docs/3d-implementation.md'],
      output: 'Documentation updated with details on 3D library usage.'
    }
  ]
};
