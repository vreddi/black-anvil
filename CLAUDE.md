# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Nx monorepo (v22.3.3) using pnpm as the package manager. It contains:
- **apps/documentation**: A TanStack Start documentation site (React 19, SSR-capable)
- **packages/nx-package-plugin**: Custom Nx generator for scaffolding TypeScript packages with tsup

## Common Commands

### Documentation App (apps/documentation)
```bash
pnpm dev              # Start Vite dev server (port 3000)
pnpm build            # Production build
pnpm test             # Run Vitest tests
pnpm lint             # Biome linting
pnpm format           # Biome formatting
pnpm check            # Biome check (lint + format)
```

### Nx Workspace
```bash
pnpm nx build <project>           # Build a specific project
pnpm nx test <project>            # Test a specific project
pnpm nx graph                     # Visualize project dependencies
pnpm nx sync                      # Sync TypeScript project references
```

### Package Generation
```bash
nx generate @blackanvil/nx-package-plugin:tsup-package --name=@scope/package-name
```

### shadcn Components
```bash
pnpm dlx shadcn@latest add <component>   # Add shadcn component (run from apps/documentation)
```

## Architecture

### Documentation App Stack
- **Framework**: TanStack Start (SSR meta-framework for React)
- **Routing**: TanStack Router with file-based routing in `src/routes/`
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Forms**: TanStack React Form
- **Animations**: Motion library
- **Error Tracking**: Sentry (`@sentry/tanstackstart-react`)
- **Build**: Vite + Nitro server runtime
- **Environment**: T3 Env for type-safe env vars (`src/env.ts`)

### Key Directory Structure (Documentation App)
```
apps/documentation/src/
├── routes/           # File-based routing (auto-generates routeTree.gen.ts)
│   ├── __root.tsx   # Root layout
│   └── index.tsx    # Home page
├── components/ui/   # shadcn components
├── lib/             # Utilities
└── env.ts           # Type-safe environment variables
```

### Nx Plugin
The `@blackanvil/nx-package-plugin` provides a `tsup-package` generator that creates TypeScript packages with:
- Dual ESM/CJS output via tsup
- Automatic type definition generation
- Vitest testing setup

## Code Style

- **Linting/Formatting**: Biome (2-tab indentation, double quotes)
- **TypeScript**: Strict mode, ES2022 target
- Base config in `tsconfig.base.json`

## Sentry Instrumentation

Server functions should be instrumented with Sentry:

```tsx
import * as Sentry from '@sentry/tanstackstart-react'

Sentry.startSpan({ name: 'Operation description' }, async () => {
  // Server function implementation
})
```

## TanStack Router Notes

- Routes are auto-generated from file structure in `src/routes/`
- Use `Link` component from `@tanstack/react-router` for SPA navigation
- Root layout in `__root.tsx` wraps all routes
- Route loaders handle data fetching before render
