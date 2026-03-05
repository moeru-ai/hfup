/**
 * This entry file is for Rolldown plugin.
 *
 * @module
 */

import { ModelCard as ModelCardImported, SpaceCard as SpaceCardImported, LFS as LFSImported } from './index'

const SpaceCard = SpaceCardImported.rolldown as typeof SpaceCardImported.rolldown
const ModelCard = ModelCardImported.rolldown as typeof ModelCardImported.rolldown
const LFS = LFSImported.rolldown as typeof LFSImported.rolldown

/**
 * Rolldown plugin
 *
 * @example
 * ```ts
 * // rolldown.config.js
 * import { SpaceCard, LFS } from 'hfup/rolldown'
 *
 * export default {
 *   plugins: [SpaceCard({ options }), LFS()],
 * }
 * ```
 */
const exports = {
  SpaceCard: SpaceCard as typeof SpaceCardImported.rolldown,
  ModelCard: ModelCard as typeof ModelCardImported.rolldown,
  LFS: LFS as typeof LFSImported.rolldown,
}
export { SpaceCard, ModelCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/model-card'
export type * from './plugins/space-card'
