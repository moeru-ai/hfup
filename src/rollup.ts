/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { ModelCard as ModelCardImported, SpaceCard as SpaceCardImported, LFS as LFSImported } from './index'

const SpaceCard = SpaceCardImported.rollup as typeof SpaceCardImported.rollup
const ModelCard = ModelCardImported.rollup as typeof ModelCardImported.rollup
const LFS = LFSImported.rollup as typeof LFSImported.rollup

/**
 * Rollup plugin
 *
 * @example
 * ```ts
 * // rollup.config.js
 * import { SpaceCard, LFS } from 'hfup/rollup'
 *
 * export default {
 *   plugins: [SpaceCard({ options }), LFS()],
 * }
 * ```
 */
const exports = {
  SpaceCard: SpaceCard as typeof SpaceCardImported.rollup,
  ModelCard: ModelCard as typeof ModelCardImported.rollup,
  LFS: LFS as typeof LFSImported.rollup,
}
export { SpaceCard, ModelCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/model-card'
export type * from './plugins/space-card'
