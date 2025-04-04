import { defineConfig } from 'rolldown'
import builtins from 'builtin-modules'
import UnpluginIsolatedDecl from 'unplugin-isolated-decl/rolldown'

export default defineConfig([
  {
    input: 'src/vite/index.ts',
    output: [
      {
        file: 'dist/vite/index.mjs',
        format: 'esm',
      },
      {
        file: 'dist/vite/index.cjs',
        format: 'commonjs',
      },
    ],
    external: [
      ...builtins,
      'vite',
      'defu',
      'gray-matter',
    ]
  },
  {
    input: 'src/vite/index.ts',
    plugins: [UnpluginIsolatedDecl()],
    output: [
      {
        file: 'dist/vite/index.d.ts',
        format: 'esm',
      },
    ],
    external: [
      ...builtins,
      'vite',
      'defu',
      'gray-matter',
    ]
  },
])
