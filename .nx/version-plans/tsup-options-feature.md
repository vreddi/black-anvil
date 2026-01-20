---
"@blackanvil/nx-package-plugin": minor
---

feat(nx-package-plugin): add customizable tsup options via JSON configuration file

Added support for customizing tsup build options through an external JSON configuration file:
- New `tsupOptionsFile` generator option to specify path to configuration file
- JSON schema for tsup options (`tsup-options.schema.json`) for editor support
- Initial support for `sourcemap` (default: true) and `splitting` (default: false) options
- Options are merged with defaults, allowing partial configuration
