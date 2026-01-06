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
   * Whether to add a project file
   * @default true
   */
  addProjectFile?: boolean;
}
