import { mkdir, writeFile } from 'node:fs/promises'
import { basename, isAbsolute, join, resolve } from 'node:path'
import { cwd, exit } from 'node:process'
import { parseArgs } from 'node:util'
import { pathToFileURL } from 'node:url'

import type { LFSOptions } from './plugins/lfs'
import type { ModelCardOptions } from './plugins/model-card'
import type { SpaceCardOptions } from './plugins/space-card'
import { generateGitAttributes } from './plugins/lfs'
import { generateModelCardReadme } from './plugins/model-card'
import { generateSpaceCardReadme } from './plugins/space-card'
import { exists } from './utils/fs'

interface HfupConfig {
  lfs?: Partial<LFSOptions>
  spaceCard?: SpaceCardOptions
  modelCard?: ModelCardOptions
}

function printHelp() {
  console.log(`hfup CLI

Usage:
  hfup generate [options]

Options:
  --root <path>        Root directory used to resolve source files (default: cwd)
  --outDir <path>      Directory where generated files are written (default: root)
  --config <path>      Config file path (json/js/mjs/cjs)
  --with-lfs           Generate .gitattributes
  --with-space-card    Generate README.md with HuggingFace front matter
  --with-model-card    Generate README.md with HuggingFace model card front matter
  --help               Show this help
`)
}

async function loadConfig(configPath: string): Promise<HfupConfig> {
  const absoluteConfigPath = resolve(configPath)
  if (!(await exists(absoluteConfigPath))) {
    throw new Error(`Config file does not exist: ${absoluteConfigPath}`)
  }

  if (absoluteConfigPath.endsWith('.json')) {
    const { readFile } = await import('node:fs/promises')
    const content = await readFile(absoluteConfigPath, 'utf-8')
    return JSON.parse(content) as HfupConfig
  }

  const module = await import(pathToFileURL(absoluteConfigPath).href)
  return (module.default ?? module) as HfupConfig
}

async function findDefaultConfig(root: string): Promise<string | undefined> {
  const candidateFiles = [
    'hfup.config.json',
    'hfup.config.mjs',
    'hfup.config.js',
    'hfup.config.cjs',
  ]

  for (const candidateFile of candidateFiles) {
    const candidatePath = join(root, candidateFile)
    if (await exists(candidatePath)) {
      return candidatePath
    }
  }

  return undefined
}

function resolveOutputPath(root: string, outDir: string): string {
  return isAbsolute(outDir) ? outDir : resolve(root, outDir)
}

async function main() {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: {
      root: { type: 'string' },
      outDir: { type: 'string' },
      config: { type: 'string' },
      'with-lfs': { type: 'boolean' },
      'with-space-card': { type: 'boolean' },
      'with-model-card': { type: 'boolean' },
      help: { type: 'boolean' },
    },
    strict: true,
  })

  if (values.help || positionals.length === 0) {
    printHelp()
    return
  }

  const command = positionals[0]
  if (command !== 'generate') {
    throw new Error(`Unknown command: ${command}`)
  }

  const root = resolve(values.root ?? cwd())
  const outDir = resolveOutputPath(root, values.outDir ?? root)

  const explicitConfigPath = values.config ? resolve(values.config) : undefined
  const discoveredConfigPath = explicitConfigPath ?? await findDefaultConfig(root)
  const config = discoveredConfigPath ? await loadConfig(discoveredConfigPath) : {}

  if (values['with-space-card'] && values['with-model-card']) {
    throw new Error('`--with-space-card` and `--with-model-card` cannot be used together because both write README.md')
  }

  const shouldGenerateLFS = values['with-lfs'] || (!values['with-lfs'] && !values['with-space-card'] && !values['with-model-card'])

  const noCardFlagProvided = !values['with-space-card'] && !values['with-model-card']
  const shouldGenerateModelCard = values['with-model-card'] || (noCardFlagProvided && Boolean(config.modelCard) && !config.spaceCard)
  const shouldGenerateSpaceCard = values['with-space-card'] || (noCardFlagProvided && !shouldGenerateModelCard)

  await mkdir(outDir, { recursive: true })

  const writes: Promise<void>[] = []
  if (shouldGenerateLFS) {
    const lfsContent = generateGitAttributes(config.lfs)
    writes.push(writeFile(join(outDir, '.gitattributes'), lfsContent, 'utf-8'))
  }

  if (shouldGenerateSpaceCard) {
    const spaceCardContent = await generateSpaceCardReadme({
      ...config.spaceCard,
      root,
    })
    writes.push(writeFile(join(outDir, 'README.md'), spaceCardContent, 'utf-8'))
  }
  else if (shouldGenerateModelCard) {
    const modelCardContent = await generateModelCardReadme({
      ...config.modelCard,
      root,
    })
    writes.push(writeFile(join(outDir, 'README.md'), modelCardContent, 'utf-8'))
  }

  await Promise.all(writes)

  const outputs = [
    shouldGenerateLFS ? '.gitattributes' : null,
    (shouldGenerateSpaceCard || shouldGenerateModelCard) ? 'README.md' : null,
  ].filter(Boolean).join(', ')

  console.log(`Generated ${outputs} in ${outDir}${discoveredConfigPath ? ` (config: ${basename(discoveredConfigPath)})` : ''}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  exit(1)
})
