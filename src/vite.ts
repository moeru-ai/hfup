/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import { SpaceCard, LFS } from './index'

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { SpaceCard, LFS } from 'hfup/vite'
 *
 * export default defineConfig({
 *   plugins: [SpaceCard({ options }), LFS()],
 * })
 * ```
 */
const exports = {
  SpaceCard: SpaceCard.vite as typeof SpaceCard.vite,
  LFS: LFS.vite as typeof LFS.vite,
}
export { SpaceCard, LFS }
export { exports as 'module.exports' }
export type * from './plugins/lfs'
export type * from './plugins/space-card'
