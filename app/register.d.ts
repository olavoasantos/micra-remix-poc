/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />
/// <reference types="vitest/globals" />
/// <reference types="@micra/application/register" />
/// <reference types="@micra/core/application/globals" />

/**
 * Alias for Remix's build output.
 * @example import build from '@remix-build';
 */
declare module '@remix-build' {
  export const entry: import('@remix-run/node').ServerBuild['entry'];
  export const routes: import('@remix-run/node').ServerBuild['routes'];
  export const assets: import('@remix-run/node').ServerBuild['assets'];
  export const publicPath: import('@remix-run/node').ServerBuild['publicPath'];
  export const assetsBuildDirectory: import('@remix-run/node').ServerBuild['assetsBuildDirectory'];
  export const future: import('@remix-run/node').ServerBuild['future'];
  export const dev: import('@remix-run/node').ServerBuild['dev'];
  export default import('@remix-run/node').ServerBuild;
}
