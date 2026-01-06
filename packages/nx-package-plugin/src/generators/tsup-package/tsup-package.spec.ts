import { createTreeWithEmptyWorkspace } from "@nx/devkit/testing";
import { Tree, readProjectConfiguration } from "@nx/devkit";

import tsupPackageGenerator from "./tsup-package";
import { TsupPackageGeneratorSchema } from "./schema";

describe("package generator", () => {
  let tree: Tree;
  const options: TsupPackageGeneratorSchema = { name: "test" };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it("should run successfully", async () => {
    await tsupPackageGenerator(tree, options);
    const config = readProjectConfiguration(tree, "test");
    expect(config).toBeDefined();
  });
});
