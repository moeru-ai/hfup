/**
 * This entry file is for rspack plugin.
 *
 * @module
 */

import { ModelCard as ModelCardImported, SpaceCard as SpaceCardImported, LFS as LFSImported } from './index'

const SpaceCard = SpaceCardImported.rspack as typeof SpaceCardImported.rspack
const ModelCard = ModelCardImported.rspack as typeof ModelCardImported.rspack
const LFS = LFSImported.rspack as typeof LFSImported.rspack

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
  SpaceCard: SpaceCard as typeof SpaceCardImported.rspack,
  ModelCard: ModelCard as typeof ModelCardImported.rspack,
  LFS: LFS as typeof LFSImported.rspack,
}
export { SpaceCard, ModelCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/model-card'
export type * from './plugins/space-card'
