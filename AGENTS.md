# Agent Guidelines and Repository Handbook

This repository houses the educational curriculum and documentation portal for the United Blockchain Society.
All AI agents, automated contributors, and editors operating in this codebase must adhere to the workflows, constraints, and architecture outlined in this document.

## Essential Reference Files

Before starting any task, read and respect the following core files:

- `VOICE.md`: The mandatory writing style, tone guide, and pedagogical depth standards.
  All content generation and editing must strictly follow these rules.
- `CONTRIBUTING.md`: Authoring standards, directory structures, and pull request conventions.
- `README.md`: Repository overview, prerequisite setup, and local build commands.
- `docs/.vitepress/config.mts`: Core VitePress settings, Markdown plugins, KaTeX configuration, and metadata.
- `docs/.vitepress/sidebar.ts`: Navigation sidebar structure and lesson ordering.
- `docs/.vitepress/theme/custom.css`: Theme styling, dark and light mode color palette, and layout rules.
- `docs/.vitepress/theme/mermaid-modal.ts`: Fullscreen lightbox controller for Mermaid diagrams with pan and zoom.

## Editorial Constraints and Voice Rules

Strict adherence to `VOICE.md` is mandatory for all Markdown and documentation edits:

1. **Sentence Per Line:**
   Every complete sentence in Markdown files must be placed on its own line.
   Do not group multiple sentences into single continuous paragraphs.
   This maintains clean Git diffs and simplifies review.
2. **Zero Emojis:**
   Do not use emojis anywhere in this repository.
   This applies to Markdown files, code comments, commit messages, and PR descriptions.
3. **Punctuation Restrictions:**
   Never use em dashes (`—`) or en dashes (`–`).
   Use commas, periods, colons, parentheses, or plain hyphens instead.
4. **No Meta Announcements or Boilerplate:**
   Do not write introductory filler such as "In this section we will explore" or "Let us dive into."
   Begin directly with technical substance.
   Do not append labeled conclusion sections such as "Conclusion", "Summary", or "Key Takeaways" unless specifically requested.

## Mermaid Diagram Syntax Guardrails

Mermaid diagrams render client-side via `vitepress-plugin-mermaid`.
Because `pnpm run docs:build` renders pages via Server-Side Rendering (SSR), VitePress does not execute client-side diagram parsing at build time.
Syntax errors in Mermaid diagrams will only trigger runtime errors in the user's browser console unless prevented.
Follow these syntax rules when creating or editing Mermaid diagrams:

1. **Subgraph Titles:**
   Never write subgraphs with raw parentheses or punctuation in the header, such as `subgraph AMM (Model)`.
   Mermaid treats parentheses as shape definitions and fails to parse.
   Always assign a safe alphanumeric ID and quote the label:
   ```mermaid
   subgraph SafeId ["Title with (Parens) and : Colons"]
       A --> B
   end
   ```
2. **Node Identifiers and Labels:**
   Node IDs must never contain spaces.
   Write `Layer1["Layer 1"]`, never `Layer 1`.
   Always wrap node labels in double quotes if they contain parentheses, brackets, or comparison signs:
   ```mermaid
   BlockFast["Blocks Produced in < 10 Minutes"]
   ```
3. **Sequence Diagram Delimiters:**
   In sequence diagrams, semicolons (`;`) act as command terminators.
   Never use semicolons inside notes, actor descriptions, or messages.
   Use commas or words like `and` instead.
4. **Arrow and Comparison Operators in Notes:**
   Avoid raw comparison symbols (`<`, `>`) or arrow characters (`->`, `-->`) in sequence diagram notes or link labels without quoting.
   Use descriptive phrases like `above 1.1` or wrap the label in explicit quotes: `-->|"Calls tokenURI(42)"|`.

## Static Asset and Image Management

Follow these colocation rules when adding images or diagrams:

1. **Colocate Module Assets:**
   Store lesson-specific images, SVGs, and diagrams inside an `assets/` subfolder within that module's directory.
   Example: `docs/learn/fundamentals/01-distributed-trust/assets/merkle-tree.svg`.
2. **Relative Referencing:**
   Reference images using relative paths starting with `./assets/`:
   ```markdown
   ![Merkle Proof Path](./assets/merkle-tree.svg)
   ```
   Vite validates these paths at build time and throws errors if an image is missing or misspelled.
3. **Global Site Assets:**
   Store brand assets, navigation logos, and social preview cards in `docs/public/`.
   Reference them with root-relative paths, such as `/logo-dark.svg`.
4. **Format Preference:**
   Use SVG for vector architecture diagrams and flowcharts.
   Use WebP or optimized PNG for screenshots or raster graphics.

## File and Directory Naming Standards

Maintain strict structural consistency across all tracks and modules:

1. **Two-Digit Zero-Padded Prefixes:**
   Prefix all module directories and lesson files with two digits indicating sequence order (`01-`, `02-`, `03-`).
   Example directory: `docs/learn/fundamentals/01-distributed-trust/`.
   Example file: `02-cryptographic-hash-functions-and-merkle-trees.md`.
2. **Lowercase Kebab-Case:**
   All filenames and directories must use exclusively lowercase letters, numbers, and hyphens.
   Never use uppercase letters, underscores, or spaces in filenames or asset paths.
3. **Track and Module Entry Points:**
   Each track directory must use `index.md` as its root overview (for example, `docs/learn/fundamentals/index.md`).

## Track Structure and Sidebar Navigation

The curriculum is divided into three primary tracks under `docs/learn/`:

- `fundamentals/`: Theoretical foundations, cryptographic primitives, state models, consensus, and Layer 2 concepts.
- `builder-foundations/`: Practical smart contract development, EVM memory layout, Foundry testing, and application architecture.
- `protocol-engineering/`: Client implementations, custom rollup sequencers, and low-level protocol mechanics.

When adding, renaming, or removing pages:
1. Create or modify the Markdown file in the appropriate track folder adhering to naming standards.
2. Register the file path and link title in `docs/.vitepress/sidebar.ts`.
3. Verify that the track's `index.md` syllabus links match the updated paths.

## Git Workflow and Operational Rules

1. **Build Verification Before Commit:**
   Always run `pnpm run docs:build` after editing content to verify that all internal links, Markdown syntax, and KaTeX equations compile without error.
2. **Local Commits Only:**
   Commit changes locally to the current working feature branch.
   Never execute `git push` unless the user explicitly asks to push.
3. **Commit Message Format:**
   Use Conventional Commits syntax (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`).
   Keep commit messages concise, descriptive, and technical.
   Do not include AI signatures, assistant attributions, or co-author tags in commit messages.
