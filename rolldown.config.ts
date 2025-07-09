import { defineConfig, RolldownOptions } from 'rolldown'
import builtins from 'builtin-modules'
import UnpluginIsolatedDecl from 'unplugin-isolated-decl/rolldown'

function entryFor(integration: 'esbuild' | 'rolldown' | 'rollup' | 'rspack' | 'vite' | 'webpack'): RolldownOptions[] {
  return [
    {
      input: `src/${integration}.ts`,
      output: [
        {
          file: `dist/${integration}.mjs`,
          format: 'esm',
        }
      ],
      external: [
        ...builtins,
        'defu',
        'gray-matter',
      ]
    },
    {
      input: `src/${integration}.ts`,
      plugins: [UnpluginIsolatedDecl()],
      output: [
        {
          file: `dist/${integration}.d.mts`,
          format: 'esm',
        },
      ],
      external: [
        ...builtins,
        'defu',
        'gray-matter',
      ]
    },
  ]
}

export default defineConfig([
  ...entryFor('esbuild'),
  ...entryFor('rolldown'),
  ...entryFor('rollup'),
  ...entryFor('rspack'),
  ...entryFor('vite'),
  ...entryFor('webpack'),
])
