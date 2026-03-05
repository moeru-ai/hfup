import { writeFile } from 'node:fs/promises'

import { hfupConfigSchema } from '../dist/schema.mjs'

await writeFile(
  'dist/json-schema.json',
  `${JSON.stringify(hfupConfigSchema, null, 2)}\n`,
  'utf-8',
)
