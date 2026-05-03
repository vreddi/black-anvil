export type Plugin = {
  name: string;
  packageName: string;
  description: string;
  generators: { name: string; description: string }[];
  install: string;
  repo: string;
  npm: string;
};

export const plugins: Plugin[] = [
  {
    name: "Nx Package Plugin",
    packageName: "@blackanvil/nx-package-plugin",
    description:
      "Scaffold modern, dual-format TypeScript packages bundled with tsup. Generates an opinionated package.json with conditional exports, tsup config, tsconfig, and Nx project wiring out of the box.",
    generators: [
      {
        name: "tsup-package",
        description:
          "Generate a TypeScript package configured to use tsup as its bundler.",
      },
    ],
    install: "pnpm add -D @blackanvil/nx-package-plugin",
    repo: "https://github.com/vishrutreddi/foundry/tree/main/packages/nx-package-plugin",
    npm: "https://www.npmjs.com/package/@blackanvil/nx-package-plugin",
  },
];
