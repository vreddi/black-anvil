/**
 * Tsup configuration options that can be customized via JSON file.
 * This interface corresponds to the tsup-options.schema.json schema.
 */
export interface TsupOptions {
  /**
   * Generate source maps for debugging.
   * When enabled, creates .map files alongside output files.
   * @default true
   */
  sourcemap?: boolean;

  /**
   * Enable code splitting.
   * When enabled, shared code between entry points is split into separate chunks.
   * Useful for reducing bundle size when multiple entry points share code.
   * Note: Only works with ESM format.
   * @default false
   */
  splitting?: boolean;
}
