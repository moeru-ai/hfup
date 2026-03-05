/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import { ModelCard as ModelCardImported, SpaceCard as SpaceCardImported, LFS as LFSImported } from './index'

const SpaceCard = SpaceCardImported.vite as typeof SpaceCardImported.vite
const ModelCard = ModelCardImported.vite as typeof ModelCardImported.vite
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
  ModelCard: ModelCard as typeof ModelCardImported.vite,
  LFS: LFS as typeof LFSImported.vite,
}

export { SpaceCard, ModelCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/model-card'
export type * from './plugins/space-card'
