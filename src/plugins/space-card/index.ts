import { cwd } from 'node:process'
import type { License, SpaceConfiguration } from './types'

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defu } from 'defu'
import grayMatter from 'gray-matter'

import { exists } from '../../utils/fs'
import { licenseValues } from './types'

import { createUnplugin, type UnpluginInstance } from 'unplugin'

export interface SpaceCardOptions extends SpaceConfiguration {
  root?: string
}

const defaultSpaceCardConfiguration: Pick<SpaceConfiguration, 'emoji' | 'sdk' | 'pinned' | 'license'> = {
  emoji: '🚀',
  sdk: 'static',
  pinned: false,
  license: 'unknown',
}

export async function generateSpaceCardReadme(configurations: SpaceCardOptions = {}): Promise<string> {
  const { root = cwd(), ...inputConfiguration } = configurations
  const resolvedConfiguration = defu<SpaceConfiguration, SpaceConfiguration[]>(
    inputConfiguration,
    defaultSpaceCardConfiguration,
  )

  const rootPackageJSONPath = join(root, 'package.json')
  let packageJSON: Record<string, any> | undefined
  if (await exists(rootPackageJSONPath)) {
    const rootPackageJSONContent = await readFile(rootPackageJSONPath, 'utf-8')
    packageJSON = JSON.parse(rootPackageJSONContent)
  }

  let readme: string | undefined
  const rootReadmePaths: string[] = [
    join(root, 'README.md'),
    join(root, 'readme.md'),
    join(root, 'README.markdown'),
    join(root, 'readme.markdown'),
    join(root, 'README'),
    join(root, 'readme'),
  ]
  for (const rootReadmePath of rootReadmePaths) {
    if (await exists(rootReadmePath)) {
      const readReadme = await readFile(rootReadmePath, 'utf-8')
      const { content } = grayMatter(readReadme)
      readme = content
      break
    }
  }

  if (resolvedConfiguration.title == null) {
    if (!packageJSON) {
      throw new Error(`\`title\` is required when \`package.json\` does not exist in the root directory (${rootPackageJSONPath})`)
    }
    if (!packageJSON.name) {
      throw new Error('`title` is required when `name` does not exist in the root package.json')
    }

    resolvedConfiguration.title = packageJSON.name
  }

  if (resolvedConfiguration.license == null) {
    if (!packageJSON) {
      throw new Error(`\`license\` is required when \`package.json\` does not exist in the root directory (${rootPackageJSONPath})`)
    }
    if (!packageJSON.license) {
      throw new Error('`license` is required when `license` does not exist in the root package.json')
    }

    const license = String(packageJSON.license).toLowerCase()
    if (!(licenseValues.includes(license))) {
      throw new Error(`Auto discovered license \`${license}\` in \`package.json\` is not supported. Must be one of licenses: ${licenseValues.join(', ')} to specified in \`configuration\` argument`)
    }

    resolvedConfiguration.license = license as License
  }

  if (resolvedConfiguration.sdk == null) {
    resolvedConfiguration.sdk = 'static'
  }

  if (resolvedConfiguration.short_description && resolvedConfiguration.short_description.length > 60) {
    throw new Error('short_description must be less or equal to 60 characters')
  }

  const fallbackReadme = `# ${resolvedConfiguration.title}`
  return grayMatter.stringify({ content: `\n${readme ?? fallbackReadme}` }, resolvedConfiguration)
}

// Please find the documentation at:
// Spaces Configuration Reference
// https://huggingface.co/docs/hub/spaces-config-reference
// https://huggingface.co/docs/hub/model-cards#model-card-metadata
export const SpaceCard: UnpluginInstance<SpaceConfiguration & { root?: string } | undefined, false>
  = createUnplugin((configurations = {}) => {
  let generatedReadme = ''

  return {
    name: 'hfup:spacecard-readme',
     async buildStart() {
      generatedReadme = await generateSpaceCardReadme(configurations)
    },
    buildEnd() {
      this.emitFile({
        type: 'asset',
        fileName: 'README.md',
        source: generatedReadme,
      })
    }
  }
  })
