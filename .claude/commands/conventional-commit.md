# Conventional Commit

Create a conventional commit for the current changes following project conventions.

## Instructions

1. **Analyze the changes** by running:
   - `git status` to see modified/staged files
   - `git diff --staged` to see staged changes (or `git diff` if nothing staged)

2. **Determine the scope** from the Nx workspace:
   - Run `pnpm nx show projects --affected` to find affected projects
   - If a single project is affected, use its name **without the `@blackanvil/` prefix** as the scope
   - If multiple projects are affected, use the most relevant one or omit scope for cross-cutting changes
   - For root/workspace changes (nx.json, package.json, CI), use scope like `workspace`, `ci`, or `deps`

3. **Choose the commit type** based on the changes:
   | Type | Description |
   |------|-------------|
   | `feat` | New feature or capability |
   | `fix` | Bug fix |
   | `docs` | Documentation only |
   | `style` | Formatting, no code change |
   | `refactor` | Code change that neither fixes a bug nor adds a feature |
   | `perf` | Performance improvement |
   | `test` | Adding or fixing tests |
   | `build` | Build system or dependencies |
   | `ci` | CI configuration |
   | `chore` | Other changes (tooling, config) |

4. **Format the commit message**:
   ```
   <type>(<scope>): <short description>

   [optional body with more details]

   [optional footer for breaking changes or issue refs]
   ```

   Rules:
   - Subject line: lowercase, no period, max 72 chars
   - Use imperative mood: "add" not "added" or "adds"
   - Breaking changes: add `!` after scope, e.g., `feat(api)!: remove deprecated endpoint`

5. **Stage files if needed** and create the commit

## Examples

For changes to `packages/nx-package-plugin`:
```
feat(nx-package-plugin): add support for custom output paths
```

For CI workflow changes:
```
ci: add publish workflow for npm releases
```

For breaking changes:
```
feat(nx-package-plugin)!: change default build output directory

BREAKING CHANGE: Output directory changed from `lib/` to `dist/`
```

For documentation:
```
docs(nx-package-plugin): update README with new options
```

## Scope Reference

| Project | Scope |
|---------|-------|
| `@blackanvil/nx-package-plugin` | `nx-package-plugin` |
| `@blackanvil/workspace` (root) | `workspace` |
| Documentation app | `documentation` |
| GitHub Actions | `ci` |
| Dependencies | `deps` |
