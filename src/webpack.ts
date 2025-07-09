/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import { SpaceCard, LFS } from './index'

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
  SpaceCard: SpaceCard.rolldown as typeof SpaceCard.rolldown,
  LFS: LFS.rolldown as typeof LFS.rolldown,
}
export { SpaceCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/space-card'
