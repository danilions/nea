# Copilot Instructions for Lions of Zion Website

## Project Architecture

- **Monorepo Structure:** Main app in `src/`, backend GraphQL API in `server/`, agents/tasks in `actions/`.
- **Frontend:** Next.js (React 19), TypeScript, Tailwind CSS, Framer Motion, i18n via `react-i18next`.
- **3D Visualization:** Uses Three.js, React-Three-Fiber, and Drei for the interactive globe (`src/components/globe/`). Textures are loaded from `public/images/`.
- **Backend:** ApolloServer with Neo4j integration (`server/api.ts`, `server/schema.graphql`). Environment variables for DB and auth in `vercel.json`.

## Developer Workflows

- **Start Dev Server:** `pnpm dev` or VS Code "dev" task.
- **Build:** `pnpm build`
- **Test:** `pnpm test` (Jest, Testing Library, setup in `jest.config.cjs` and `src/setupTests.ts`)
- **Lint:** `pnpm lint`
- **Type Check:** `pnpm type-check`
- **Storybook:** `pnpm storybook` for UI component development.
- **Agents:** Run automation agents via `pnpm run:agents` (see `scripts/run-agent.ts`).

## Key Conventions & Patterns

- **Design Tokens:** Colors, fonts, spacing centralized in `global.css` and extended in `tailwind.config.js` via CSS variables.
- **Component Imports:** Use path aliases (`@/components/...`) as defined in `tsconfig.json`.
- **Accessibility:** All interactive UI elements must have ARIA attributes, keyboard navigation, and focus management (see `docs/uiux-guidelines.md` and `actions/accessibilityAgent.ts`).
- **3D Globe:** Extend globe by creating new React components using `@react-three/fiber` primitives and Drei helpers. Document new 3D features in `docs/3d-implementation.md`.
- **Testing:** UI tests use Testing Library; global mocks in `src/setupTests.ts`.
- **Internationalization:** Use `useTranslation` hook and translation keys from `public/locales/`.

## Integration Points

- **GraphQL API:** Queries for actors/narratives in `server/api.ts` and `server/schema.graphql`.
- **External Data:** Globe loads airport/route data from `public/airports-routes.json`.
- **Environment Variables:** Set in `vercel.json` for DB/auth keys.

## Agent/Task System

- **Agents:** Defined in `actions/` (e.g., `accessibilityAgent.ts`, `fullMissionPlan.ts`). Each agent has tasks with explicit instructions, affected files, and expected outputs.
- **Extend Agents:** Follow the `Agent` and `Task` TypeScript interfaces in `actions/task.ts`.
- **Accessibility Agent:** Implements ARIA, keyboard navigation, and color contrast checks (see `actions/accessibilityAgent.ts`).

## UI/UX & Accessibility

- **Keyboard Navigation:** All modals, buttons, and globe markers must be focusable and operable via keyboard.
- **ARIA:** Use `aria-label`, `role`, and related attributes on all interactive elements.
- **Color Contrast:** Ensure all colors meet WCAG AA standards; see comments in `global.css` and `docs/uiux-guidelines.md`.

## Example Patterns

- **Globe Texture Loading:** See `GalacticGlobeApp.tsx` for manual texture loading and error handling.
- **Centralized Styling:** Use Tailwind classes mapped to CSS variables (e.g., `text-primary`).
- **Agent Task Definition:** See `actions/fullMissionPlan.ts` for agent/task structure and documentation.

---

**Feedback Request:**  
Please review and let me know if any section is unclear, missing, or needs more detail. I can iterate further based on your feedback.
