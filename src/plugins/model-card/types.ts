import type { License } from '../space-card/types'

export const baseModelRelationValues = ['finetune', 'adapter', 'merge', 'quantized'] as const

export interface ModelCardSections {
  model_description?: string
  intended_uses?: string
  limitations?: string
  training_data?: string
  evaluation?: string
  environmental_impact?: string
  citation?: string
  model_card_authors?: string
  model_card_contact?: string
  more_information?: string
}

export interface ModelCardConfiguration {
  title?: string
  language?: string[]
  tags?: string[]
  license?: License | 'other'
  license_name?: string
  license_link?: string
  datasets?: string[]
  metrics?: string[]
  pipeline_tag?: string
  library_name?: string
  base_model?: string | string[]
  base_model_relation?: typeof baseModelRelationValues[number]
  new_version?: string
  thumbnail?: string
  model_name?: string
  body?: string
  sections?: ModelCardSections
  metadata?: Record<string, unknown>
}
