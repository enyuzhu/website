# Portfolio site — project context

Personal portfolio for Amy: engineer first, product designer second, architect as creative foundation. Target audience: creative companies hiring for SWE and product design roles.

## Positioning and hierarchy

- Dominance order: ML/CS (primary) > UX/product design (secondary) > architecture (creative depth, framed as origin/training, not a peer offering)
- Hero identity: "engineer." as the static word (evolves the earlier "designer." homepage), with a subline positioning design and architecture as how she thinks, e.g. "who designs like a UX-er and thinks like an architect"
- Nav order: engineering · design · architecture · about — nav items sized/weighted by hierarchy (engineering strongest, architecture smallest)
- Content allocation: 3 ML/CS projects (each links to GitHub, technical writeups with metrics and tradeoffs), 2 UX case studies, architecture as a single PDF flipbook behind a small physical-feeling folio button
- Architecture doubles as site-wide visual texture: blueprint linework in backgrounds, plan-style annotations, dimension-style labels on project cards

## Color palette (MP071 by Alex Cristache)

| Token | Name | Hex | Role |
|---|---|---|---|
| --moonlight | Magical Moonlight | #F0EEEB | Light bg |
| --polar | Polar Drift | #CCD5DA | Light secondary bg / muted surfaces |
| --buckthorn | Sea Buckthorn | #FFBF65 | Warm accent (mid) |
| --coral | Miami Coral | #FD8973 | Warm accent (strong), hero punctuation |
| --ateneo | Ateneo Blue | #003A6C | Dark primary / text on light |
| --neverything | Neverything | #13181B | Darkest bg |

Light-to-dark order: moonlight → polar → buckthorn → coral → ateneo → neverything.

Verified contrast (from palette sheet): ateneo on moonlight 18.13:1, ateneo on polar 14.10:1, ateneo on buckthorn 12.89:1, ateneo on coral 9:1, buckthorn on neverything 17.88:1, buckthorn on ateneo 11.53:1. Text pairings: ateneo blue text on the four light/warm swatches; buckthorn/coral text on ateneo and neverything.

Aesthetic reference: soft grain gradients between adjacent palette colors (sunset feel: neverything/ateneo dissolving into coral/buckthorn), used sparingly for hero and section transitions.

## Landing page concept: morphing node system

One shared set of nodes that reconnects into three representations of the same thinking:

- ML/CS state: neural network graph (input → hidden → output layers)
- UX/design state: UI wireframe (header, nav rail, content cards)
- Architecture state: floor plan (walls, rooms, plan view)

Nodes animate positions (lerp/ease), edges fade out during movement and redraw in the new configuration.

## Transition and color system

Node/edge colors are mapped along the palette's light-to-dark axis, and page transitions animate through that axis:

- Home → ML/CS: nodes start in light palette colors (moonlight, polar) and transition to the dark end (ateneo, neverything) as the neural network reveals. Light → dark = descending into the technical.
- Home → UX design and Home → Architecture: same transition mechanic but with the color order reversed relative to the ML direction (dark → light), so these pages resolve into the light/warm end of the palette.
- Discipline → discipline: transition colors run in the respective order between the two disciplines' home colors (e.g. moving from ML's dark end to design's light end animates dark → light; the reverse animates light → dark).
- Default state on Home load: the network/node field rests in light colors; ML is the default morph target.

ASSUMPTION TO CONFIRM: each discipline owns a zone of the palette — ML/CS = neverything + ateneo (dark), UX design = buckthorn + coral (warm), architecture = moonlight + polar (light, blueprint-adjacent). Adjust if the intended mapping differs.

## Architecture section

- Entry: small folio/book object with a satisfying open animation, not a full nav-peer section
- Opens into a PDF flipbook with page-flip interaction
- Implementation: StPageFlip (npm: page-flip) rendering pages via PDF.js; fallback option is an embedded hosted flipbook (Heyzine/FlippingBook)

## ML/CS section

- Case studies written like engineering blog posts: problem, architecture decisions, metrics, tradeoffs, retro
- Every project links to its GitHub repo with a clean README
- Anchor project: two-tower DNN retrieval system (Recall@K / Hit@K analysis)

## UX section

- 2 case studies, standard case-study format, visually consistent with the palette

## Code conventions

- Clean code, no inline comments
- Concise, direct output
- Single-page-app feel for transitions between discipline pages (no hard page reloads breaking the node morph)
- Respect prefers-reduced-motion: skip node morphs and color sweeps, cut to final state
- Keep the node system in one module: layouts (three point sets + edge sets), palette mapping, and a transition function taking (fromState, toState, direction)

## Design guardrails

- One hero concept only (the morphing nodes); no competing gimmicks (no spinning wheel, word search, or physics on top of it)
- First-load intro must resolve within ~2 seconds and be skippable
- Recruiters skim in seconds: name, "engineer.", and the three disciplines must be legible immediately even mid-animation
