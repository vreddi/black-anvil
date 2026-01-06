import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from "@nx/devkit";
import * as path from "path";
import type { TsupPackageGeneratorSchema } from "./schema";

export async function tsupPackageGenerator(
  tree: Tree,
  options: TsupPackageGeneratorSchema
) {
  const projectRoot = `packages/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: "library",
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, "files"), projectRoot, options);
  await formatFiles(tree);
}

export default tsupPackageGenerator;
