# UB Society Mascot & Character Visual Guide

This document defines the official visual design system and prompt engineering rules for the UB Society 3D mascot characters.
All promotional imagery, documentation thumbnails, and chapter headers feature these characters to create an approachable, cohesive, and instantly recognizable brand identity.

---

## 1. Character Visual DNA

The reference mascot is a round, plump, hyper-tactile 3D animated monster creature inspired by top-tier feature animation studios (Pixar and DreamWorks).

```
                      ( \  / )       <-- Tiny curved ear tufts / horns
                     /  ----  \
                    /  (o)(o)  \     <-- Massive glossy cartoon eyes
                   |    \__/    |    <-- Wide joyful open mouth (clean white teeth, pink tongue)
                   |  ( ~~~~ )  |    <-- Plump, round ball-shaped body with dense fluffy fur
                    \  \____/  /
                     (==)  (==)      <-- Stubby padded feet
```

### Core Anatomical Rules
- **Body Shape:** Plump, spherical, cuddly bean-like silhouette. Low center of gravity.
- **Fur Texture:** Ultra-dense, soft, individually groomed fibers. Visible subsurface scattering where light penetrates the outer fur edges.
- **Facial Features:**
  - Huge, glossy spherical cartoon eyes with prominent black pupils and white reflective highlights.
  - Wide open-mouthed crescent smile with clean, friendly white teeth and a soft pink tongue.
  - Expressive brow ridges integrated into the fur shape.
- **Appendages:**
  - Tiny, curved horns or soft fur tufts on the top corners of the head.
  - Stubby, rounded arms tucked warmly against the body.
  - Padded, flat, paw-like feet at the base.
- **Personality:** Friendly, intellectually curious, energetic, approachable, never intimidating or scary.

---

## 2. Universal Background & Lighting Standard

To ensure seamless integration with the documentation's dark theme, all character renders must adhere strictly to the following environmental constraints:

- **Background:** **Pure, solid, pitch-black (`#000000`)**.
  - No floor planes, no ground shadow drops, no room walls, and no gradient fades.
  - The subject must float or stand cleanly in an infinite black void.
- **Lighting Setup:**
  - **Key & Fill Light:** Soft, diffused front studio lighting that evenly illuminates the facial expression without harsh glare.
  - **Rim / Edge Light (Crucial):** High-intensity colorful rim lighting wrapping around the silhouette of the fur. This rim light separates the colorful creature cleanly from the black background and produces glowing subsurface fur scattering.

---

## 3. Standardized Persona Profiles

The curriculum uses standard pedagogical personas throughout the lessons.
Each persona is visually realized as a variation of the mascot with distinct fur color, props, and facial attitude:

| Persona | Role in Curriculum | Fur Color | Signature Prop | Expression |
| :--- | :--- | :--- | :--- | :--- |
| **Alice** | Curious Builder & Honest Transactor | **Sky Blue / Cyan** | Brass magnifying spectacles or glowing stylus | Inquisitive, beaming, joyful |
| **Bob** | Steadfast Guardian & Verifier | **Warm Amber / Orange** | Tiny construction/miner helmet or key shield | Proud, sturdy, reliable |
| **Charlie & Dave** | Consensus Committee Peers | **Sunny Yellow & Mint Green** | Dual glowing walkie-talkies or audio headsets | Collaborative, friendly |
| **Eve** | Mempool Snooper & MEV Searcher | **Midnight Indigo / Dark Violet** | Glowing high-tech monocle or night-vision visor | Intrigued, sly, observant |
| **Mallory** | Byzantine Attacker & Chaos Goblin | **Fiery Crimson / Ruby Red** | Tangled ball of red yarn or tiny crooked wand | Cheeky, smirking, mischievous |

---

## 4. Google Flow / Imagen Prompt Formula

When generating new character assets in **Google Flow** or **Imagen**, use the standardized modular formula below:

```text
[Style Header] + [Subject & Anatomy] + [Fur Color & Texture] + [Expression & Props] + [Lighting & Pure Black Void] + [Quality & Render Engine]
```

### Prompt Template

```text
A high-end 3D Pixar-style animated render of an adorable, round, plump fluffy creature with [COLOR] fur, huge glossy expressive cartoon eyes, tiny curved head horns, and a [EXPRESSION]. The creature is [ACTION / WEARING PROPS]. Crisp [COLOR] studio rim lighting and subsurface scattering highlight every strand of soft, dense fur against a completely pure, solid, pitch-black background with zero floor planes, zero environment, and zero shadows. Ultra-detailed 3D CGI character, clean silhouette, 8k resolution, cinematic character render.
```

---

## 5. Negative Prompt & Quality Guards

When prompting image generators with negative prompt capabilities, provide the following guardrails:

```text
white background, grey background, studio floor, horizon line, ground shadow, gradients, environment background, scary monster, creepy, sharp fangs, horror, realistic human face, distorted anatomy, extra limbs, blurry fur, noise, compression artifacts, watermark, low quality
```

---

## 6. Asset Storage Guidelines

When generated images are finalized for production:
- Save high-resolution PNGs with black background intact to `docs/public/images/characters/`.
- File naming convention:
  - Mascot persona: `mascot-[persona].png` (e.g., `mascot-alice.png`, `mascot-bob.png`).
  - Module thumbnail: `module-[number]-[topic].png` (e.g., `module-01-distributed-trust.png`).
