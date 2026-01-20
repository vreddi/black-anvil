## 0.2.0 (2026-01-20)

### 🚀 Features

- feat(nx-package-plugin): add customizable tsup options via JSON configuration file ([f61d150](https://github.com/vreddi/black-anvil/commit/f61d150))

  Added support for customizing tsup build options through an external JSON configuration file:
  - New `tsupOptionsFile` generator option to specify path to configuration file
  - JSON schema for tsup options (`tsup-options.schema.json`) for editor support
  - Initial support for `sourcemap` (default: true) and `splitting` (default: false) options
  - Options are merged with defaults, allowing partial configuration

### ❤️ Thank You

- Claude Opus 4.5
- Vishrut Reddi @vreddi

## 0.1.0 (2026-01-20)

### 🚀 Features

- Initial release of the Nx package plugin with tsup-package generator for scaffolding TypeScript packages. ([ef23d83](https://github.com/vreddi/black-anvil/commit/ef23d83))

### ❤️ Thank You

- Claude Opus 4.5
- Vishrut Reddi @vreddi