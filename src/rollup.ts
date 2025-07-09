/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { SpaceCard, LFS } from './index'

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
  SpaceCard: SpaceCard.rollup as typeof SpaceCard.rollup,
  LFS: LFS.rollup as typeof LFS.rollup,
}
export { SpaceCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/space-card'
