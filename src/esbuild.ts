/**
 * This entry file is for esbuild plugin.
 *
 * @module
 */

import { SpaceCard as SpaceCardImported, LFS as LFSImported } from './index'

const SpaceCard = SpaceCardImported.esbuild as typeof SpaceCardImported.esbuild
const LFS = LFSImported.esbuild as typeof LFSImported.esbuild

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
  SpaceCard: SpaceCard as typeof SpaceCardImported.esbuild,
  LFS: LFS as typeof LFSImported.esbuild,
}
export { SpaceCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/space-card'
