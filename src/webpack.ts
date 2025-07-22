/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import { SpaceCard as SpaceCardImported, LFS as LFSImported } from './index'

const SpaceCard = SpaceCardImported.rolldown as typeof SpaceCardImported.rolldown
const LFS = LFSImported.rolldown as typeof LFSImported.rolldown

/**
 * Webpack plugin
 *
 * @example
 * ```ts
 * // webpack.config.js
 * const plugins = require('hfup/webpack')
 *
 * module.exports = {
 *  plugins: [plugins.SpaceCard({ options }), plugins.LFS()],
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
