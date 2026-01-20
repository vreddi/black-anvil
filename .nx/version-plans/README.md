# Version Plans

This directory contains version plan files for Nx Release.

## Creating a Version Plan

```bash
pnpm release:plan
```

Or manually create a file with YAML frontmatter:

```markdown
---
"@blackanvil/nx-package-plugin": minor
---

Description of the changes
```

## Version Types

- `major` - Breaking changes
- `minor` - New features
- `patch` - Bug fixes

See `docs/publishing.md` for more details.
