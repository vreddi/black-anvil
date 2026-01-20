import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from "@nx/devkit";
import * as path from "path";
import type { TsupPackageGeneratorSchema } from "./schema";
import type { TsupOptions } from "./tsup-options";

/** Default tsup options */
const DEFAULT_TSUP_OPTIONS: Required<TsupOptions> = {
  sourcemap: true,
  splitting: false,
};

/**
 * Reads tsup options from a JSON file if provided, otherwise returns defaults.
 */
function getTsupOptions(tree: Tree, optionsFilePath?: string): Required<TsupOptions> {
  if (!optionsFilePath) {
    return DEFAULT_TSUP_OPTIONS;
  }

  const fileContent = tree.read(optionsFilePath, "utf-8");
  if (!fileContent) {
    throw new Error(`Could not read tsup options file: ${optionsFilePath}`);
  }

  const userOptions: TsupOptions = JSON.parse(fileContent);
  return {
    ...DEFAULT_TSUP_OPTIONS,
    ...userOptions,
  };
}

export async function tsupPackageGenerator(
  tree: Tree,
  options: TsupPackageGeneratorSchema
) {
  const projectRoot = options.dropLocation ?? `packages/${options.name}`;
  const tsupOptions = getTsupOptions(tree, options.tsupOptionsFile);

  if (options.addProjectFile) {
    addProjectConfiguration(tree, options.name, {
      root: projectRoot,
      projectType: "library",
      sourceRoot: `${projectRoot}/src`,
      targets: {},
    });
  }

  generateFiles(tree, path.join(__dirname, "files"), projectRoot, {
    ...options,
    tsupOptions,
  });
  await formatFiles(tree);
}

export default tsupPackageGenerator;
