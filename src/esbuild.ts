/**
 * This entry file is for esbuild plugin.
 *
 * @module
 */

import { SpaceCard, LFS } from './index'

/**
 * Esbuild plugin
 *
 * @example
 * ```ts
 * import { build } from 'esbuild'
 * import { SpaceCard, LFS } from 'hfup/esbuild'
 *
 * build({
 *   plugins: [SpaceCard({ options }), LFS()],
 * })
 * ```
 */
const exports = {
  SpaceCard: SpaceCard.esbuild as typeof SpaceCard.esbuild,
  LFS: LFS.esbuild as typeof LFS.esbuild,
}
export { SpaceCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/space-card'
