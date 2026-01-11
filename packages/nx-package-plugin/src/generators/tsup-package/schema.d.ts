export interface TsupPackageGeneratorSchema {
  /**
   * The name of the package
   */
  name: string;

  /**
   * The description of the package
   */
  description?: string;

  /**
   * The variant of the package
   * @default "node-only"
   */
  platform?: "node-only" | "browser-only" | "node-and-browser";

  /**
   * The location to drop the package
   * @default "packages"
   */
  dropLocation?: string;

  /**
   * The path to the base tsconfig.json. If nothing is provided
   * the tsconfig.json will be generated without extending any
   * other tsconfig.json. This is useful if you want to create a
   * package that is not part of an Nx workspace.
   * @default undefined
   */
  baseTsconfigPath?: string;

  /**
   * Whether to add a project file
   * @default true
   */
  addProjectFile?: boolean;
}
