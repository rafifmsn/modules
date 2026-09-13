# UB Society Modules

UB Society provides open Web3 and blockchain education through structured learning modules covering blockchain fundamentals, smart contract development, and decentralized systems.
This repository contains the source code, modular curriculum tracks, and configuration for the documentation portal.

## Prerequisites

- Node.js 18.x or higher (22.x recommended)
- pnpm 10.x or higher

## Getting Started

### 1. Install Dependencies

Install repository dependencies using pnpm:

```bash
pnpm install
```

### 2. Run Local Development Server

Start VitePress in development mode with hot-module replacement:

```bash
pnpm run docs:dev
```

The local development server runs at `http://localhost:5173`.

### 3. Production Build

Compile static HTML files, client JavaScript bundles, and local search indices:

```bash
pnpm run docs:build
```

Build outputs are generated in `docs/.vitepress/dist`.

### 4. Preview Production Build

Serve the built static assets locally to test production output:

```bash
pnpm run docs:preview
```

## Repository Structure

- `docs/`: VitePress documentation source files, articles, and curriculum modules.
  - `docs/learn/fundamentals/`: Comprehensive conceptual and architectural curriculum covering distributed trust, cryptography, state models, and consensus.
  - `docs/learn/builder-foundations/`: Smart contract development, testing frameworks, and application architectures.
  - `docs/learn/protocol-engineering/`: Virtual machine internals, consensus implementations, and Layer 2 rollups.
  - `docs/public/`: Static global brand assets, logos, and Open Graph preview images.
  - `docs/.vitepress/`: Site configuration, navigation sidebars, theme overrides, and custom stylesheets.
- `.github/`: Issue templates and pull request configuration.
- `CONTRIBUTING.md`: Writing guidelines, sentence-per-line standards, and pull request procedures.
- `SECURITY.md`: Security vulnerability disclosure policy.
- `wrangler.jsonc`: Cloudflare Workers deployment configuration.

## Adding and Modifying Content

Content pages and their sidebar navigation are managed through Markdown files and explicit VitePress configuration.

### 1. Create the Content File

Add your Markdown file to the appropriate track directory, such as `docs/learn/fundamentals/01-introduction.md`.
Ensure that each complete sentence is placed on its own line and no emojis are used.

### 2. Configure Sidebar Navigation and Order

Open `docs/.vitepress/sidebar.ts`.
Add your page link to the corresponding track items array.
The display order in the portal matches the array order:

```ts
"/learn/fundamentals/": [
  {
    text: "Blockchain Fundamentals",
    items: [
      { text: "Track Overview", link: "/learn/fundamentals/" },
      { text: "01. Introduction", link: "/learn/fundamentals/01-introduction" },
    ],
  },
],
```

### 3. Store Images and Static Assets

- **Module Assets:** Store module-specific illustrations, diagrams, and figures in an `assets/` subfolder colocated within that module directory, such as `docs/learn/fundamentals/01-distributed-trust/assets/`.
- **Relative Referencing:** Reference assets via relative paths in Markdown, such as `![Point Addition](./assets/ec-point-addition.svg)`.
  Vite optimizes, hashes, and validates these links at build time.
- **Global Assets:** Store shared brand assets, logos, and Open Graph previews in `docs/public/` and reference them with root paths, such as `/logo-dark.svg`.

### 4. Verify Local Build

Run the local build runner to ensure all internal links, images, and formatting compile without errors:

```bash
pnpm run docs:build
```

For complete editorial, mathematical formatting, and code style standards, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Deployment

This portal is deployed to Cloudflare Workers using Static Assets mapped to `docs/.vitepress/dist`.
Deployments are performed manually from your terminal to manage build quotas.

### Manual Deployment via Wrangler

Build the static output and deploy using `pnpm dlx wrangler`:

```bash
pnpm run docs:build
pnpm dlx wrangler deploy
```

Alternatively, use the predefined package script:

```bash
pnpm run deploy
```

### Local Worker Preview

To preview the worker and static assets locally using Wrangler:

```bash
pnpm run docs:build
pnpm dlx wrangler dev
```
