import defu from 'defu'
import { cwd } from 'node:process'

import { createUnplugin, type UnpluginInstance } from 'unplugin'

export interface LFSOptions {
  enableFn: (ctx: LFSOptions) => boolean | Promise<boolean>
  extraGlobs: string[]
  extraAttributes: string[]
  withDefault: boolean
  root: string
}

const defaultLFSOptions: LFSOptions = {
  root: cwd(),
  enableFn: async () => true,
  extraGlobs: [],
  extraAttributes: [],
  withDefault: true,
}

const defaultGitAttributes = `# Default
*.7z filter=lfs diff=lfs merge=lfs -text
*.arrow filter=lfs diff=lfs merge=lfs -text
*.bin filter=lfs diff=lfs merge=lfs -text
*.bz2 filter=lfs diff=lfs merge=lfs -text
*.ckpt filter=lfs diff=lfs merge=lfs -text
*.ftz filter=lfs diff=lfs merge=lfs -text
*.gz filter=lfs diff=lfs merge=lfs -text
*.h5 filter=lfs diff=lfs merge=lfs -text
*.joblib filter=lfs diff=lfs merge=lfs -text
*.lfs.* filter=lfs diff=lfs merge=lfs -text
*.mlmodel filter=lfs diff=lfs merge=lfs -text
*.model filter=lfs diff=lfs merge=lfs -text
*.msgpack filter=lfs diff=lfs merge=lfs -text
*.npy filter=lfs diff=lfs merge=lfs -text
*.npz filter=lfs diff=lfs merge=lfs -text
*.onnx filter=lfs diff=lfs merge=lfs -text
*.ot filter=lfs diff=lfs merge=lfs -text
*.parquet filter=lfs diff=lfs merge=lfs -text
*.pb filter=lfs diff=lfs merge=lfs -text
*.pickle filter=lfs diff=lfs merge=lfs -text
*.pkl filter=lfs diff=lfs merge=lfs -text
*.pt filter=lfs diff=lfs merge=lfs -text
*.pth filter=lfs diff=lfs merge=lfs -text
*.rar filter=lfs diff=lfs merge=lfs -text
*.safetensors filter=lfs diff=lfs merge=lfs -text
saved_model/**/* filter=lfs diff=lfs merge=lfs -text
*.tar.* filter=lfs diff=lfs merge=lfs -text
*.tar filter=lfs diff=lfs merge=lfs -text
*.tflite filter=lfs diff=lfs merge=lfs -text
*.tgz filter=lfs diff=lfs merge=lfs -text
*.wasm filter=lfs diff=lfs merge=lfs -text
*.xz filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
*.zst filter=lfs diff=lfs merge=lfs -text
*tfevents* filter=lfs diff=lfs merge=lfs -text
`

export function resolveLFSOptions(rawOptions?: Partial<LFSOptions>): LFSOptions {
  return defu<LFSOptions, LFSOptions[]>(rawOptions, defaultLFSOptions)
}

export function generateGitAttributes(rawOptions?: Partial<LFSOptions>): string {
  const options = resolveLFSOptions(rawOptions)
  const extraGlobsIntoGitAttributes = options.extraGlobs.map((glob) => {
    return `${glob} filter=lfs diff=lfs merge=lfs -text`
  })
  const sections = [
    options.extraAttributes.join('\n').trim(),
    extraGlobsIntoGitAttributes.join('\n').trim(),
    options.withDefault ? defaultGitAttributes.trim() : '',
  ].filter(Boolean)

  return `${sections.join('\n')}\n`
}

export const LFS: UnpluginInstance<Partial<LFSOptions> | undefined, false>
  = createUnplugin((rawOptions) => {
    const options = resolveLFSOptions(rawOptions)

    return {
      name: 'hfup:lfs-gitattributes',
      async buildEnd() {
        if (options?.enableFn && !(await options.enableFn(options))) {
          return
        }

        this.emitFile({
          type: 'asset',
          fileName: '.gitattributes',
          source: generateGitAttributes(options),
        })
      }
    }
  })
