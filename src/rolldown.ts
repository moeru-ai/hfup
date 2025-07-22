/**
 * This entry file is for Rolldown plugin.
 *
 * @module
 */

import { SpaceCard as SpaceCardImported, LFS as LFSImported } from './index'

const SpaceCard = SpaceCardImported.rolldown as typeof SpaceCardImported.rolldown
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
  LFS: LFS as typeof LFSImported.rolldown,
}
export { SpaceCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/space-card'
