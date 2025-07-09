/**
 * This entry file is for Rolldown plugin.
 *
 * @module
 */

import { SpaceCard, LFS } from './index'

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
  SpaceCard: SpaceCard.rolldown as typeof SpaceCard.rolldown,
  LFS: LFS.rolldown as typeof LFS.rolldown,
}
export { SpaceCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/space-card'
