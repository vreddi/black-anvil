import { createTreeWithEmptyWorkspace } from "@nx/devkit/testing";
import type { Tree } from "@nx/devkit";

import tsupPackageGenerator from "./tsup-package";
import { TsupPackageGeneratorSchema } from "./schema";

describe("tsup-package generator", () => {
  let tree: Tree;
  const baseOptions: TsupPackageGeneratorSchema = {
    name: "test",
    description: "Test package",
    platform: "node-only",
    dropLocation: "packages/test",
    baseTsconfigPath: "../../tsconfig.base.json",
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it("should run successfully", async () => {
    await tsupPackageGenerator(tree, { ...baseOptions, addProjectFile: false });

    // Check that core files are generated
    expect(tree.exists("packages/test/package.json")).toBe(true);
    expect(tree.exists("packages/test/tsup.config.ts")).toBe(true);
    expect(tree.exists("packages/test/tsconfig.json")).toBe(true);
    expect(tree.exists("packages/test/src/index.ts")).toBe(true);
  });

  it("should generate tsup.config.ts with default options", async () => {
    await tsupPackageGenerator(tree, { ...baseOptions, addProjectFile: false });
    const tsupConfig = tree.read("packages/test/tsup.config.ts", "utf-8");

    expect(tsupConfig).toContain("sourcemap: true");
    expect(tsupConfig).toContain("splitting: false");
  });

  it("should read tsup options from JSON file", async () => {
    // Create a tsup options file
    tree.write(
      "tsup-options.json",
      JSON.stringify({
        sourcemap: false,
        splitting: true,
      })
    );

    await tsupPackageGenerator(tree, {
      ...baseOptions,
      tsupOptionsFile: "tsup-options.json",
    });

    const tsupConfig = tree.read("packages/test/tsup.config.ts", "utf-8");

    expect(tsupConfig).toContain("sourcemap: false");
    expect(tsupConfig).toContain("splitting: true");
  });

  it("should merge partial tsup options with defaults", async () => {
    // Create a tsup options file with only splitting
    tree.write(
      "tsup-options.json",
      JSON.stringify({
        splitting: true,
      })
    );

    await tsupPackageGenerator(tree, {
      ...baseOptions,
      tsupOptionsFile: "tsup-options.json",
    });

    const tsupConfig = tree.read("packages/test/tsup.config.ts", "utf-8");

    // sourcemap should be default (true), splitting should be from file
    expect(tsupConfig).toContain("sourcemap: true");
    expect(tsupConfig).toContain("splitting: true");
  });

  it("should throw error if tsup options file does not exist", async () => {
    await expect(
      tsupPackageGenerator(tree, {
        ...baseOptions,
        tsupOptionsFile: "non-existent.json",
      })
    ).rejects.toThrow("Could not read tsup options file");
  });
});
