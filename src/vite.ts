/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import { SpaceCard as SpaceCardImported, LFS as LFSImported } from './index'

const SpaceCard = SpaceCardImported.vite as typeof SpaceCardImported.vite
const LFS = LFSImported.vite as typeof LFSImported.vite

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { SpaceCard, LFS } from 'hfup/vite'
 *
 * export default defineConfig({
 *   plugins: [SpaceCard({ options }), LFS()],
 * })
 * ```
 */
const exports = {
  SpaceCard: SpaceCard as typeof SpaceCardImported.vite,
  LFS: LFS as typeof LFSImported.vite,
}

export { SpaceCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/space-card'
