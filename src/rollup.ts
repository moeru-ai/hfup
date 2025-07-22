/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { SpaceCard as SpaceCardImported, LFS as LFSImported } from './index'

const SpaceCard = SpaceCardImported.rollup as typeof SpaceCardImported.rollup
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
  LFS: LFS as typeof LFSImported.rollup,
}
export { SpaceCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/space-card'
