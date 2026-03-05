import { cwd } from 'node:process'
import type { ModelCardConfiguration, ModelCardSections } from './types'

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defu } from 'defu'
import grayMatter from 'gray-matter'

import { exists } from '../../utils/fs'

import { createUnplugin, type UnpluginInstance } from 'unplugin'

export interface ModelCardOptions extends ModelCardConfiguration {
  root?: string
}

function renderSections(sections?: ModelCardSections): string {
  if (!sections) {
    return ''
  }

  const orderedKeys: (keyof ModelCardSections)[] = [
    'model_description',
    'intended_uses',
    'limitations',
    'training_data',
    'evaluation',
    'environmental_impact',
    'citation',
    'model_card_authors',
    'model_card_contact',
    'more_information',
  ]

  const rendered = orderedKeys
    .filter((key) => sections[key]?.trim())
    .map((key) => {
      const heading = key
        .replaceAll('_', ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
      return `## ${heading}\n\n${sections[key]!.trim()}`
    })

  return rendered.join('\n\n')
}

export async function generateModelCardReadme(configurations: ModelCardOptions = {}): Promise<string> {
  const { root = cwd(), metadata: extraMetadata, body, sections, ...inputConfiguration } = configurations
  const resolvedConfiguration = defu<ModelCardConfiguration, ModelCardConfiguration[]>(
    inputConfiguration,
    {},
  )

  const rootPackageJSONPath = join(root, 'package.json')
  let packageJSON: Record<string, any> | undefined
  if (await exists(rootPackageJSONPath)) {
    const rootPackageJSONContent = await readFile(rootPackageJSONPath, 'utf-8')
    packageJSON = JSON.parse(rootPackageJSONContent)
  }

  const rootReadmePaths: string[] = [
    join(root, 'README.md'),
    join(root, 'readme.md'),
    join(root, 'README.markdown'),
    join(root, 'readme.markdown'),
    join(root, 'README'),
    join(root, 'readme'),
  ]
  let readme: string | undefined
  for (const rootReadmePath of rootReadmePaths) {
    if (await exists(rootReadmePath)) {
      const readReadme = await readFile(rootReadmePath, 'utf-8')
      const { content } = grayMatter(readReadme)
      readme = content
      break
    }
  }

  if (!resolvedConfiguration.title) {
    resolvedConfiguration.title = packageJSON?.name ?? 'Model Card'
  }

  const frontMatter: Record<string, unknown> = {
    ...resolvedConfiguration,
    ...extraMetadata,
  }
  delete frontMatter.title
  delete frontMatter.body
  delete frontMatter.sections
  delete frontMatter.metadata

  const fallbackReadme = `# ${resolvedConfiguration.title}`
  const baseReadme = body ?? readme ?? fallbackReadme
  const sectionBlock = renderSections(sections)
  const combinedBody = sectionBlock ? `${baseReadme}\n\n${sectionBlock}` : baseReadme

  return grayMatter.stringify({ content: `\n${combinedBody}` }, frontMatter)
}

export const ModelCard: UnpluginInstance<ModelCardOptions | undefined, false>
  = createUnplugin((configurations = {}) => {
    let generatedReadme = ''

    return {
      name: 'hfup:modelcard-readme',
      async buildStart() {
        generatedReadme = await generateModelCardReadme(configurations)
      },
      buildEnd() {
        this.emitFile({
          type: 'asset',
          fileName: 'README.md',
          source: generatedReadme,
        })
      },
    }
  })

export type * from './types'
