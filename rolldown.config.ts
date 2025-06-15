import { defineConfig } from 'rolldown'
import builtins from 'builtin-modules'
import UnpluginIsolatedDecl from 'unplugin-isolated-decl/rolldown'

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.mjs',
        format: 'esm',
      }
    ],
    external: [
      ...builtins,
      'vite',
      'defu',
      'gray-matter',
    ]
  },
  {
    input: 'src/index.ts',
    plugins: [UnpluginIsolatedDecl()],
    output: [
      {
        file: 'dist/index.d.mts',
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
  {
    input: 'src/vite/index.ts',
    output: [
      {
        file: 'dist/vite/index.mjs',
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
  {
    input: 'src/vite/index.ts',
    plugins: [UnpluginIsolatedDecl()],
    output: [
      {
        file: 'dist/vite/index.d.mts',
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
