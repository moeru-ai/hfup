# 🧑‍🚀 hfup

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A collection of tools to help you deploy, bundle HuggingFace Spaces and related assets with ease.

> Where `hfup` stands for HuggingFace up, and the word `up` was inspired from `rollup`, `tsup`, you may think it means "to make your HuggingFace work up and running".

## Installation

Pick the package manager of your choice:

```shell
ni hfup -D # from @antfu/ni, can be installed via `npm i -g @antfu/ni`
pnpm i hfup -D
yarn i hfup -D
npm i hfup -D
```

## CLI

`hfup` can generate HuggingFace artifacts directly, without bundler hooks.

Quick start:

```shell
pnpm add -D hfup
```

Create `hfup.config.json` in your project root:

```shell
npx hfup generate --root . --outDir ./dist
```

This command writes:

- `.gitattributes` (LFS patterns)
- `README.md` (Space or Model card front-matter + README content)

You can also use a config file (`hfup.config.json`, `hfup.config.mjs`, `hfup.config.js`, `hfup.config.cjs`) in your project root or pass one explicitly via `--config`.

```json
{
  "$schema": "https://unpkg.com/hfup@latest/dist/json-schema.json",
  "lfs": {
    "withDefault": true,
    "extraGlobs": ["*.gguf"],
    "extraAttributes": ["data/**/*.bin filter=lfs diff=lfs merge=lfs -text"]
  },
  "spaceCard": {
    "title": "My Space",
    "license": "mit",
    "emoji": "🚀",
    "models": ["openai-community/gpt2"]
  },
  "modelCard": {
    "language": ["en"],
    "library_name": "transformers",
    "pipeline_tag": "text-generation",
    "base_model": "meta-llama/Llama-3.2-1B",
    "license": "mit",
    "tags": ["llm", "instruction-tuned"]
  }
}
```

If you pin schema by version:

```json
{
  "$schema": "https://unpkg.com/hfup@1.0.0/dist/json-schema.json"
}
```

For projects that cannot use `$schema` inline, add a VS Code mapping in `.vscode/settings.json`:

```json
{
  "json.schemas": [
    {
      "fileMatch": ["hfup.config.json"],
      "url": "https://unpkg.com/hfup@latest/dist/json-schema.json"
    }
  ]
}
```

Optional flags:

- `--with-lfs`: generate only `.gitattributes`
- `--with-space-card`: generate only `README.md`
- `--with-model-card`: generate only `README.md`

`--with-space-card` and `--with-model-card` are mutually exclusive because both write `README.md`.

Generate model card only:

```shell
npx hfup generate --root . --outDir . --with-model-card
```

Generate space card only:

```shell
npx hfup generate --root . --outDir . --with-space-card
```

Generate only LFS:

```shell
npx hfup generate --root . --outDir . --with-lfs
```

## JSON Schema in Editors

Use the published JSON schema so non-TypeScript projects (Python/C/etc.) still get IntelliSense.

Inline schema in `hfup.config.json`:

```json
{
  "$schema": "https://unpkg.com/hfup@latest/dist/json-schema.json"
}
```

Or pin a version:

```json
{
  "$schema": "https://unpkg.com/hfup@1.0.0/dist/json-schema.json"
}
```

If you cannot use `$schema` inline, configure VS Code:

```json
{
  "json.schemas": [
    {
      "fileMatch": ["hfup.config.json"],
      "url": "https://unpkg.com/hfup@latest/dist/json-schema.json"
    }
  ]
}
```

## Model Card Plugin

You can generate a Hugging Face model card from bundler hooks too:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { LFS, ModelCard } from 'hfup/vite'

export default defineConfig({
  plugins: [
    LFS(),
    ModelCard({
      language: ['en'],
      library_name: 'transformers',
      pipeline_tag: 'text-generation',
      base_model: 'meta-llama/Llama-3.2-1B',
      license: 'mit',
    }),
  ],
})
```

<details>
<summary>Vite</summary><br/>

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { LFS, SpaceCard } from 'hfup/vite'

export default defineConfig({
  plugins: [
    LFS(),
    SpaceCard({
      title: 'Real-time Whisper WebGPU (Vue)',
      emoji: '🎤',
      colorFrom: 'gray',
      colorTo: 'green',
      sdk: 'static',
      pinned: false,
      license: 'mit',
      models: ['onnx-community/whisper-base'],
      short_description: 'Yet another Real-time Whisper with WebGPU, written in Vue',
      thumbnail: 'https://raw.githubusercontent.com/moeru-ai/airi/refs/heads/main/packages/whisper-webgpu/public/banner.png'
    })
  ]
})
```

<br/></details>

<details>
<summary>Rollup</summary><br/>

```js
// rollup.config.js
import { LFS, SpaceCard } from 'hfup/rollup';

export default {
  plugins: [
    LFS(),
    SpaceCard({
      title: 'Real-time Whisper WebGPU (Vue)',
      emoji: '🎤',
      colorFrom: 'gray',
      colorTo: 'green',
      sdk: 'static',
      pinned: false,
      license: 'mit',
      models: ['onnx-community/whisper-base'],
      short_description: 'Yet another Real-time Whisper with WebGPU, written in Vue',
      thumbnail: 'https://raw.githubusercontent.com/moeru-ai/airi/refs/heads/main/packages/whisper-webgpu/public/banner.png'
    }),
  ],
};
```

<br/></details>

<details>
<summary>Webpack</summary><br/>

```js
// webpack.config.js
const { LFS, SpaceCard } = require("hfup/webpack");

module.exports = {
  /* ... */
  plugins: [
    LFS(),
    SpaceCard({
      title: 'Real-time Whisper WebGPU (Vue)',
      emoji: '🎤',
      colorFrom: 'gray',
      colorTo: 'green',
      sdk: 'static',
      pinned: false,
      license: 'mit',
      models: ['onnx-community/whisper-base'],
      short_description: 'Yet another Real-time Whisper with WebGPU, written in Vue',
      thumbnail: 'https://raw.githubusercontent.com/moeru-ai/airi/refs/heads/main/packages/whisper-webgpu/public/banner.png'
    }),
  ],
};
```

<br/></details>

<details>
<summary>esbuild</summary><br/>

```js
// esbuild.config.js
import { build } from "esbuild";
import { LFS, SpaceCard } from "hfup/esbuild";

build({
  /* ... */
  plugins: [
    LFS(),
    SpaceCard({
      title: 'Real-time Whisper WebGPU (Vue)',
      emoji: '🎤',
      colorFrom: 'gray',
      colorTo: 'green',
      sdk: 'static',
      pinned: false,
      license: 'mit',
      models: ['onnx-community/whisper-base'],
      short_description: 'Yet another Real-time Whisper with WebGPU, written in Vue',
      thumbnail: 'https://raw.githubusercontent.com/moeru-ai/airi/refs/heads/main/packages/whisper-webgpu/public/banner.png'
    }),
  ],
});
```

<br/></details>

<details>
<summary>Rspack</summary><br/>

```js
// rspack.config.mjs
import { LFS, SpaceCard } from "hfup/rspack";

/** @type {import('@rspack/core').Configuration} */
export default {
  plugins: [
    LFS(),
    SpaceCard({
      title: 'Real-time Whisper WebGPU (Vue)',
      emoji: '🎤',
      colorFrom: 'gray',
      colorTo: 'green',
      sdk: 'static',
      pinned: false,
      license: 'mit',
      models: ['onnx-community/whisper-base'],
      short_description: 'Yet another Real-time Whisper with WebGPU, written in Vue',
      thumbnail: 'https://raw.githubusercontent.com/moeru-ai/airi/refs/heads/main/packages/whisper-webgpu/public/banner.png'
    })
  ],
};
```

<br/></details>

<details>
<summary>Rolldown</summary><br/>

```js
// rolldown.config.js
import { defineConfig } from "rolldown";
import { LFS, SpaceCard } from "hfup/rolldown";

export default defineConfig({
  plugins: [
    LFS(),
    SpaceCard({
      title: 'Real-time Whisper WebGPU (Vue)',
      emoji: '🎤',
      colorFrom: 'gray',
      colorTo: 'green',
      sdk: 'static',
      pinned: false,
      license: 'mit',
      models: ['onnx-community/whisper-base'],
      short_description: 'Yet another Real-time Whisper with WebGPU, written in Vue',
      thumbnail: 'https://raw.githubusercontent.com/moeru-ai/airi/refs/heads/main/packages/whisper-webgpu/public/banner.png'
    }),
  ],
});
```

<br/></details>

## Features

- Still manually writing HuggingFace Spaces configurations?
- Having trouble to quickly handle and edit the `.gitattributes` file for Git LFS?
- Don't want any of the HuggingFace Spaces front-matter appear in `README.md`?
- Fighting against annoying errors when deploying your HuggingFace Spaces?

`hfup` is here to help you!

- 🚀 Automatically...
  - generate `.gitattributes` file for Git LFS.
  - generate HuggingFace Spaces front-matter in `README.md`.
  - search for your `README.md` file and merge the front-matter header.
  - generate a dedicated `README.md` file right inside the `outDir` of build.
- 🔐 Intellisense ready, type safe for Spaces configurations.
- 📦 Out of the box support for Vite.

## What will happen

After bundling, a dedicated README with merged front-matter header will be generated in the root of your project:

```md
---
title: Real-time Whisper WebGPU (Vue)
emoji: 🎤
colorFrom: gray
colorTo: green
sdk: static
pinned: false
license: mit
models:
- onnx-community/whisper-base
short_description: Yet another Real-time Whisper with WebGPU, written in Vue
thumbnail: https://raw.githubusercontent.com/moeru-ai/airi/refs/heads/main/packages/whisper-webgpu/public/banner.png
---

# Real-time Whisper WebGPU (Vue)
```

## License

[MIT License](./LICENSE.md).

[npm-version-src]: https://img.shields.io/npm/v/hfup?style=flat&colorA=18181B&colorB=f7d031
[npm-version-href]: https://npmjs.com/package/hfup
[npm-downloads-src]: https://img.shields.io/npm/dm/hfup?style=flat&colorA=18181B&colorB=f7d031
[npm-downloads-href]: https://npmjs.com/package/hfup
[bundle-src]: https://img.shields.io/bundlephobia/minzip/hfup?style=flat&colorA=18181B&colorB=f7d031&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=hfup
[license-src]: https://img.shields.io/github/license/moeru-ai/hfup.svg?style=flat&colorA=18181B&colorB=f7d031
[license-href]: https://github.com/moeru-ai/hfup/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=18181B&colorB=f7d031
[jsdocs-href]: https://www.jsdocs.io/package/hfup
