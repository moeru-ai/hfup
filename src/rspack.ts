/**
 * This entry file is for rspack plugin.
 *
 * @module
 */

import { SpaceCard, LFS } from './index'

/**
 * Rspack plugin
 *
 * @example
 * ```ts
 * const hfupPlugins = require('hfup/rspack')
 * // rspack.config.js
 * module.exports = {
 *  plugins: [hfupPlugins.SpaceCard({ options }), hfupPlugins.LFS()],
 * }
 * ```
 */
const exports = {
  SpaceCard: SpaceCard.rspack as typeof SpaceCard.rspack,
  LFS: LFS.rspack as typeof LFS.rspack,
}
export { SpaceCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/space-card'
