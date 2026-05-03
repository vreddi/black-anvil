# Foundry

> Opinionated Nx plugins for shipping modern TypeScript projects, built by [Black Anvil](https://github.com/vishrutreddi).

Foundry is the home for a small, growing collection of [Nx](https://nx.dev) plugins I extract from my own projects and open-source so other developers can use them too. Each plugin is opinionated by design — the goal is to encode a working setup rather than expose every possible knob.

## What's inside

This repository is an Nx monorepo (managed with [pnpm](https://pnpm.io)) containing:

| Path | Description |
| --- | --- |
| [`apps/documentation`](./apps/documentation) | The Foundry documentation site — a [TanStack Start](https://tanstack.com/start) app (React 19 + Vite + Tailwind v4) that lists the available plugins. |
| [`packages/nx-package-plugin`](./packages/nx-package-plugin) | `@blackanvil/nx-package-plugin` — Nx generators for scaffolding TypeScript packages bundled with [tsup](https://tsup.egoist.dev). |

## Plugins

### [`@blackanvil/nx-package-plugin`](./packages/nx-package-plugin)

Scaffolds a modern, dual-format (ESM + CJS) TypeScript package with:

- A `package.json` using conditional `exports` and a `types`-first resolution order
- A ready-to-go `tsup.config.ts`
- TypeScript and Nx project configuration wired into the workspace
- Vitest set up for tests

```sh
nx generate @blackanvil/nx-package-plugin:tsup-package --name=@scope/package-name
```

See the [package README](./packages/nx-package-plugin/README.md) and the [`tsup-package` generator docs](./packages/nx-package-plugin/src/generators/tsup-package/README.md) for full details.

## Getting started

Install dependencies:

```sh
pnpm install
```

Run the documentation site locally:

```sh
pnpm nx dev documentation
```

Build everything:

```sh
pnpm build
```

Run tests across the workspace:

```sh
pnpm test
```

## Repository layout

```
foundry/
├── apps/
│   └── documentation/        # TanStack Start docs site
├── packages/
│   └── nx-package-plugin/    # @blackanvil/nx-package-plugin
├── docs/                     # Workspace-level architecture & publishing notes
├── nx.json                   # Nx workspace config
└── pnpm-workspace.yaml
```

## Releases

Versioning and publishing are handled by [`nx release`](https://nx.dev/features/manage-releases):

```sh
pnpm release:dry-run   # preview a release
pnpm release           # cut a release
```

## Contributing

Issues and pull requests are welcome. These plugins are intentionally opinionated — if a default doesn't work for you, open an issue and let's talk about it before it becomes a configuration option.

## License

MIT
