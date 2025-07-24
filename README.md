## Debugging (VS Code, Chrome/Firefox DevTools)

- **VS Code**: Go to the Debug panel (⇧+⌘+D), pick a launch config (see .vscode/launch.json), and F5 to start debugging.  
- **Browser DevTools**: Open Chrome/Firefox devtools (Sources/Debugger tab). Use breakpoints, or add `debugger;` in code.
- **Server-side debugging**: Run `pnpm dev` (or `npm run dev`) to start Next.js with Node.js inspector enabled.  
  - To attach, go to chrome://inspect or about:debugging in Firefox, and click "inspect" on the running Node process.

More info: https://nextjs.org/docs/pages/building-your-application/configuring/debugging
