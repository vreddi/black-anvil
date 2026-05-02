# Publishing Guide

This document describes how to publish packages in the Foundry monorepo.

## Overview

The Foundry monorepo uses **Nx Release** with independent versioning. Each package maintains its own version and changelog, allowing for granular releases.

### Key Features

- **Independent versioning**: Each package has its own version
- **Version plans**: Explicit version control via markdown files
- **Conventional commits**: Automatic version bumping based on commit messages
- **GitHub releases**: Automatic GitHub release creation with changelogs
- **npm provenance**: Secure package publishing with provenance attestation

## Workflow

```
Developer creates version plan
         │
         ▼
    Merge to develop
         │
         ▼
   Release workflow runs
   ├─ version bump
   ├─ changelog + GitHub release
   ├─ npm publish (with provenance)
   └─ push tags
```

A single `Release` workflow handles versioning, changelogs, GitHub releases,
and npm publishing in one run. Tag pushes do **not** trigger a separate
publish job — this avoids the GitHub Actions limitation where pushes made
with the default `GITHUB_TOKEN` cannot trigger downstream workflows.

## Creating a Version Plan

Version plans allow you to explicitly specify version bumps for packages.

### Using the CLI

```bash
# Interactive version plan creation
pnpm release:plan

# Check existing version plans
pnpm release:plan:check
```

### Manual Creation

Create a markdown file in `.nx/version-plans/` with a unique name:

```markdown
---
"@blackanvil/nx-package-plugin": minor
---

Added support for custom tsup configurations
```

### Version Bump Types

| Type | When to use |
|------|-------------|
| `major` | Breaking changes |
| `minor` | New features (backwards compatible) |
| `patch` | Bug fixes |
| `premajor` | Pre-release major |
| `preminor` | Pre-release minor |
| `prepatch` | Pre-release patch |

## Conventional Commits

You can also use conventional commits for automatic version determination:

| Commit prefix | Version bump |
|--------------|--------------|
| `feat:` | minor |
| `fix:` | patch |
| `feat!:` or `BREAKING CHANGE:` | major |
| `docs:`, `chore:`, `style:`, etc. | no bump |

### Examples

```bash
# Minor version bump
git commit -m "feat(nx-package-plugin): add support for custom output paths"

# Patch version bump
git commit -m "fix(nx-package-plugin): resolve path resolution issue on Windows"

# Major version bump (breaking change)
git commit -m "feat(nx-package-plugin)!: change default output directory"
```

## Release Process

### Automatic (Recommended)

1. Create a version plan or use conventional commits
2. Merge changes to `develop` branch
3. Release workflow automatically:
   - Bumps versions based on version plans/conventional commits
   - Generates changelogs
   - Creates git tags + GitHub releases
   - Publishes to npm with provenance

### Manual Release

For testing or special cases:

```bash
# Dry run to see what would happen
pnpm release:dry-run

# First release (skips changelog from commits)
pnpm release -- --first-release

# Release with verbose output
pnpm release -- --verbose
```

### GitHub Actions Manual Trigger

1. Go to Actions > Release workflow
2. Click "Run workflow"
3. Options:
   - `dry_run`: Preview changes without making them
   - `first_release`: Use for initial package release

## Required Secrets

Configure these in GitHub repository settings:

| Secret | Description | Required |
|--------|-------------|----------|
| `NPM_ACCESS_TOKEN` | npm automation token | Yes |
| `NX_CLOUD_ACCESS_TOKEN` | Nx Cloud token (optional, uses nxCloudId if not set) | No |

### Creating an npm Token

1. Go to [npmjs.com](https://www.npmjs.com/) > Access Tokens
2. Generate New Token > Automation
3. Copy the token
4. Add as `NPM_ACCESS_TOKEN` secret in GitHub

## Troubleshooting

### "No projects to release"

Ensure packages have:
- `publishable` tag in `project.json`
- `nx-release-publish` target defined
- Not marked as `private: true` in `package.json`

### "Permission denied" during publish

- Verify `NPM_ACCESS_TOKEN` is set correctly
- Ensure the npm token has publish permissions
- Check if package name is available on npm

### Version plan not detected

- Verify file is in `.nx/version-plans/` directory
- Check YAML frontmatter syntax
- Ensure package name matches exactly

### Changelog not generated

- Ensure `fetch-depth: 0` in checkout action
- Verify git history is available
- Check conventional commit format

## Verification Commands

```bash
# List publishable projects
pnpm nx show projects --with-target=nx-release-publish

# Check release configuration
pnpm nx release --dry-run

# Verify version plans
pnpm release:plan:check
```

## Architecture

### Tag Format

Tags follow the pattern `{projectName}@{version}`:
- `@blackanvil/nx-package-plugin@1.0.0`
- `@blackanvil/some-other-package@2.3.1`

### Changelog Locations

- **Workspace changelog**: `CHANGELOG.md` (root)
- **Project changelogs**: `packages/{project}/CHANGELOG.md`

### GitHub Releases

Each release creates a GitHub release with:
- Tag name as title
- Generated changelog as body
- Links to npm package
