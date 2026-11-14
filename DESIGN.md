---
name: World of beers
description: A community beer catalog where every beer is printed as its own craft label.
colors:
  paper: "#f2efe9"
  stock: "#ffffff"
  ink: "#111111"
  ink-soft: "#3d3a35"
  ink-muted: "#5c5850"
  cobalt: "#1f4fd8"
  cobalt-ink: "#ffffff"
  danger: "#b3261e"
  danger-wash: "#fde8e6"
  success: "#1f6b3a"
  select: "#ffd23f"
  style-ipa: "#ff5a1f"
  style-apa: "#ffb020"
  style-lager: "#ffd23f"
  style-pilsner: "#b5d94a"
  style-stout: "#3a2418"
  style-porter: "#8a2b1e"
  style-wheat: "#f3df9a"
  style-sour: "#ff4f8b"
  style-other: "#1f4fd8"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.4vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 13.5cqi, 4.25rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  title:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 1.6vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  body:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    letterSpacing: "0.12em"
  fact-label:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.08em"
  fact-value:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.3
rounded:
  default: "6px"
  pill: "999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "24px"
  space-6: "32px"
  space-7: "48px"
  space-8: "64px"
  space-9: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.cobalt-ink}"
  button-ghost:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
  button-danger:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.danger}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
    height: "36px"
  button-danger-hover:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.stock}"
  input:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.default}"
    padding: "12px 14px"
    height: "48px"
  input-invalid:
    backgroundColor: "{colors.danger-wash}"
  legend-chip:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    typography: "{typography.fact-label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px 4px 6px"
  label-card:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.default}"
  pager-item:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.default}"
    height: "44px"
    width: "44px"
  pager-item-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
  pager-item-hover:
    backgroundColor: "{colors.select}"
  panel:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.default}"
    padding: "32px"
---

# Design System: World of beers

## Overview

**Creative North Star: "The Craft Label"**

Every beer is printed as its own craft label: a flat field of its style colour, with the beer's name set huge like a brand name on a bottle, and a back-label strip of facts below. The catalog reads as a shelf of printed labels, not a grid of photo cards with grey metadata. This world replaced the previous dark neon glassmorphism look outright; nothing of the glass, glow or dark ground survives.

The material is offset print. A warm paper ground carries white label stock, and everything is drawn in near-black ink as heavy 3px rules and 2px borders. Colour is functional, not decorative: each beer style owns one fixed ink that is the same on the label, in the legend, in the wordmark and in the spinner, and each style field carries its own flat print pattern (stripes, dots, grain) along a band at the bottom. Interface accents stay out of the style palette's way: cobalt for focus and links, black pills for actions.

Density is moderate and editorial. One typeface family, Bricolage Grotesque, does everything: display 800 set tight, body 400. Motion is one signature, the label's colour field printing in once on load with a left-to-right clip-path wipe, plus small, quick hover lifts. Reduced motion turns all of it off.

**Key Characteristics:**
- Warm paper ground, white stock, ink rules (3px structural, 2px for controls)
- One fixed colour per beer style, used identically everywhere, with a matching legend
- Flat print patterns on the style fields; no gradients as atmosphere
- One family, Bricolage Grotesque, with 800-weight names set at poster scale
- Black pill buttons; cobalt focus rings and links
- Colour fields "print" in once on load; everything respects reduced motion

## Colors

A warm print palette: paper, stock and ink as the neutral body, nine style inks as the content key, and cobalt as the single interface accent.

### Primary
- **Ink Black** (`ink`): Text, every rule and border, primary button fill, active pager cell, star fill. The system's structure is drawn in it.
- **Print Cobalt** (`cobalt`): The single interface accent. Focus outlines, input focus rings, link text, caret, and the primary button's hover fill. It doubles as the field colour for unknown beer styles (`style-other`).

### Secondary: the style inks
Each beer style has one fixed colour, mapped by `beerStyleKey()` in `src/lib/beerStyle.ts` and applied through a `data-style` attribute that sets `--field`, `--on-field` and `--print`.
- **IPA Orange** (`style-ipa`): ink text, -45° diagonal stripes.
- **APA Amber** (`style-apa`): ink text, 45° diagonal stripes.
- **Lager Yellow** (`style-lager`): ink text, 9px dot screen.
- **Pilsner Hop Green** (`style-pilsner`): ink text, horizontal lines.
- **Stout Roast Brown** (`style-stout`): white text, white 8px dot screen.
- **Porter Oxblood** (`style-porter`): white text, white -45° stripes.
- **Wheat Straw** (`style-wheat`): ink text, fine vertical grain.
- **Sour Raspberry** (`style-sour`): ink text, offset double dot grid.
- **Unknown Cobalt** (`style-other`): white text, white vertical bars. The default for any type not in the map.

### Tertiary: state colours
- **Signal Red** (`danger`): danger button outline and text, invalid field border, inline error text, error toasts.
- **Blush Wash** (`danger-wash`): background of a field the user has made invalid.
- **Bottle Green** (`success`): success toasts.
- **Highlighter Yellow** (`select`): text selection and the pager cell hover. Same value as Lager Yellow by design.

### Neutral
- **Offset Paper** (`paper`): page background, scrollbar track, disabled button fill, spinner scrim (at 86% alpha), `theme-color`.
- **Label Stock** (`stock`): header, label cards, panels, forms, inputs, legend chips, ghost buttons.
- **Soft Ink** (`ink-soft`): secondary prose such as page intros and state messages.
- **Muted Ink** (`ink-muted`): fact labels (dt), hints, dates, pager gaps, disabled button text.
- **Hairline** (`rgba(17, 17, 17, 0.16)`, `--hairline`): the only light divider, used above label actions and the OAuth block.

### Named Rules
**The Fixed Ink Rule.** A beer style's colour never changes with context. Apply it only through `data-style` and the `--field` / `--on-field` / `--print` fields; never hard-code a style colour onto a one-off element, and never use a style ink as a generic accent.

**The Ink-or-White Rule.** Text on a style field is ink on light fields and white only on dark fields (Stout, Porter, Unknown). That pairing is set per style in `--on-field` and is what keeps every field at WCAG AA.

**The Cobalt Means Interactive Rule.** Cobalt marks focus, links and hover on primary actions. Outside its role as the unknown-style field, it does not appear as decoration.

## Typography

**Display Font:** Bricolage Grotesque (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Bricolage Grotesque (same stack)

**Character:** One variable grotesque does every job. At 800 with negative tracking it reads like a brand name stamped on a bottle; at 400 it is a calm, slightly warm reading face. Loaded from Google Fonts with optical size 12–96 and weights 400–800, which covers Polish and Latin-extended text.

### Hierarchy
- **Display** (800, `clamp(2.5rem, 1.6rem + 3.4vw, 4.5rem)`, 1.05, -0.035em): page titles and auth headings.
- **Headline** (800, `clamp(2rem, 13.5cqi, 4.25rem)`, 0.9, -0.04em): the beer name on a label. On the detail page it grows to `clamp(2.75rem, 1.6rem + 4vw, 5.5rem)` at 0.92. Names wrap (`overflow-wrap: break-word`) rather than truncate.
- **Title** (800, `clamp(1.75rem, 1.2rem + 1.6vw, 2.5rem)`, 1.05): form titles and state panel headings. A smaller section heading on the detail back label uses 1.5rem at -0.02em.
- **Body** (400, 1rem, 1.5; paragraphs 1.6 and max 68ch): all running text. Intros and descriptions step up to 1.125rem.
- **Label** (700, 0.875rem, 0.12em, uppercase): the beer style name at the top of each colour field, the label's own type line. 1rem on the detail page.
- **Fact label** (700, 0.75rem, 0.08em, uppercase, muted ink): the dt in the back-label strip; the legend chips use the same size at 0.06em.
- **Fact value** (800, 1.125rem, 1.3; 1.5rem on detail): ABV, rating, author. Numbers use tabular figures.

All h1–h3 use `text-wrap: balance`. Navigation and secondary actions sit at 600; buttons at 700.

### Named Rules
**The One Family Rule.** Bricolage Grotesque only. Hierarchy comes from weight (400 / 600 / 700 / 800), size and tracking, never from a second face.

**The Brand Name Rule.** The beer's name is the loudest thing on its label: always 800, line-height under 1, tighter than -0.03em, and never truncated.

## Layout

A centred page column, `min(1240px, 100% - 32px)`, so the side gutter never drops below 16px. Pages pad 32px on top and 96px at the bottom. Spacing runs on a 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96); 24px is the common gap between labels and between blocks.

The catalog is an auto-fill grid of labels, `repeat(auto-fill, minmax(min(100%, 330px), 1fr))`, which gives three columns at full width and collapses to one on phones without breakpoints. Each label is a column: colour field (min 240px, 220px under 420px) with the type at top-left, the bottle image anchored bottom-right (150px tall) and the name spanning the full width below; then a three-cell back strip (Alcohol / Rating / Added by), which becomes two cells over one under 420px.

The detail page sets the front label beside its back label in a 1.15fr / 1fr split inside one bordered sheet; under 900px it stacks, under 480px the facts table goes to one column.

The header is sticky on desktop and static under 720px, where the nav wraps to its own full-width row. Forms and auth pages centre in 520px (auth) or 720px (create form, wide auth) columns; form rows auto-fit at a 220px minimum. Every flex row wraps, so longer translated strings push layout rather than overflow.

## Elevation & Depth

Flat by default. Depth is drawn, not lit: surfaces separate by ink rules, white stock on paper, and the colour field against the back strip. There is one shadow, and it only appears as a response to state or for floating chrome.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 18px 32px -18px rgba(17, 17, 17, 0.45)`): a label card on hover or focus-within, paired with a 4px rise; also toasts.
- **Bottle drop** (`filter: drop-shadow(0 10px 12px rgba(17, 17, 17, 0.3))`; detail `0 16px 18px rgba(17, 17, 17, 0.32)`): under the beer image only, so the bottle stands on its field.

### Named Rules
**The Drawn-Not-Lit Rule.** Separation comes from 3px ink rules and stock-on-paper, not shadows. A resting surface never carries a shadow; Lift is a hover and focus response.

## Shapes

Gently rounded print stock (6px) for every card, panel, input and pager cell, and full pills (999px) for buttons, legend chips and the "Yours" stamp. The colour field's top corners are 3px so it sits inside the card's border. Borders are the shape language: 3px solid ink for structure (header bottom rule, cards, panels, the back strip's cell dividers, the detail sheet), 2px solid ink for controls (buttons, inputs, legend chips, pager cells, toasts, the field's print band). Legend swatches and the spinner are circles with ink outlines. The wordmark is three small 2px-bordered bars in IPA, Lager and Stout.

## Components

### Buttons
Confident black pills that turn cobalt under the pointer.
- **Shape:** full pill (999px), 2px ink border, min height 44px.
- **Primary:** ink fill, stock text, 700 weight, 10px 22px padding.
- **Hover / Focus:** fill and border go cobalt with white text (160ms, ease-out); press nudges down 1px; focus shows the global 3px cobalt outline at 3px offset.
- **Ghost:** stock fill, ink text; hover inverts to ink fill. Used for OAuth sign-in and secondary actions.
- **Danger:** stock fill, danger border and text; hover fills danger. Paired with the small size (36px min height, 6px 16px, 0.875rem) on label actions.
- **Disabled:** paper fill, 30% ink border, muted text, not-allowed cursor.

### Chips (style legend)
- **Style:** stock pill with a 2px ink border, 0.75rem 700 uppercase text at 0.06em, and a 14px circular swatch of the style's `--field` outlined in 2px ink.
- **State:** static; the legend is a key, not a filter.

### Cards / Containers (the label)
- **Corner Style:** 6px.
- **Background:** stock card; the top is the style's colour field with its print band (22px, 2px top rule in the field's text colour) along the bottom.
- **Shadow Strategy:** none at rest; Lift plus a 4px rise on hover and focus-within. The bottle tilts -4° and rises 4px on hover.
- **Border:** 3px ink; 3px ink dividers between back-strip cells; a hairline above owner actions.
- **Internal Padding:** 24px in the field (plus 22px for the band), 12px 16px in the back-strip cells.
- **Owner stamp:** a small stock pill reading "Yours", 800 uppercase, rotated 4° at the top-right corner.
- **No image:** a list label without its own image shows no picture at all, only the colour field and the name across its full width. The generic glass appears only on the detail page.

Panels (empty, error and out-of-range states; forms) share the material: stock, 3px ink border, 6px corners, 32px padding (24px 16px on phones).

### Inputs / Fields
- **Style:** stock fill, 2px ink border, 6px corners, 48px min height, 12px 14px padding; textarea 120px min, vertical resize. Selects draw their chevron in ink with two gradients.
- **Focus:** native outline removed, replaced by a double ring: 3px stock gap then 3px cobalt (`0 0 0 3px stock, 0 0 0 6px cobalt`).
- **Error:** after user interaction (`:user-invalid`), danger border on a danger-wash fill.
- **Labels:** 0.875rem 700 above the field; hints 0.875rem in muted ink.
- **Validation messages:** checked on submit. A failing field gets `aria-invalid`, a danger border on a danger-wash fill, and its reason under it (`.field__error`, 0.875rem 600 danger, linked by `aria-describedby`). Focus moves to the first failing field, and a hint is hidden while its field shows an error.
- **Form status:** one `role="status"` line under the submit button stays in the DOM (empty, zero height). Server errors fill it as a 2px danger panel on danger wash. Success is announced only after the server confirms.

### Navigation
- **Header:** sticky white stock bar with a 3px ink bottom rule, min height 72px. Wordmark (three style bars plus "World of beers", 1.5rem 800) at left, nav links, then actions pushed right with a black pill (Register when signed out, Create beer when signed in).
- **Links:** 600 ink text; hover and active draw a 3px ink underline as an inset shadow (160ms).
- **Mobile:** under 720px the header stops sticking and the nav wraps to a full row.
- **Pager:** 44px square stock cells, 2px ink border, 6px corners, 700 tabular numbers. Hover fills Highlighter Yellow; the current page is solid ink with stock text.

- **Skip link:** "Skip to content" is the header's first element, hidden above the bar until focused, then an ink pill with stock text at the top-left.
- **Language switch:** the last item in the header actions: a segmented EN | PL control in a 2px ink outline, each option 44px square. The active language is filled ink with stock text (`aria-pressed`); each button reads its full language name to screen readers. The choice is saved and also sets `<html lang>` and the page title. Polish runs longer: labels, chips and nav must survive about 30% more text.
- **Pager:** sticky to the bottom of the viewport on paper while the label grid scrolls, with a 2px ink rule across the viewport only while it floats over labels. At the end of the grid it settles in place, and the footer follows. The page itself is the only scroll container: never an inner scrolling grid.

### Footer
A stock band under a 3px ink rule: the small wordmark with one line about the project at left, and "Frontend source" / "Backend source" GitHub links (44px targets, ink underline on hover) at right. Below a hairline, a muted copyright line. It stacks to one column under 720px.

### Spinner
A 64px ring in four style inks (IPA, Lager, Sour, Pilsner) as a conic gradient inside a 3px ink outline, spinning at 1.1s over a paper scrim. After 4s a note explains the backend's cold start.

### Signature: the print-in
On load each label's colour field wipes in from left to right, `clip-path: inset(0 100% 0 0)` to `inset(0)`, over 720ms with `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 70ms per card by index. The detail field prints the same way. It runs once; `prefers-reduced-motion: reduce` disables all animation and transitions.

## Do's and Don'ts

### Do:
- **Do** colour a beer only through its `data-style` key, so `--field`, `--on-field` and `--print` stay in sync with the legend.
- **Do** draw structure with 3px ink rules and controls with 2px ink borders.
- **Do** set beer names at 800 with line-height under 1 and let them wrap; the name is the label's brand.
- **Do** use black pills for actions and cobalt for focus, links and hover.
- **Do** keep text on style fields ink on light fields and white only on Stout, Porter and Unknown.
- **Do** let every row wrap and every column flex, so translated strings grow the layout instead of being clipped.
- **Do** keep motion to the print-in and short hover lifts (160ms / 280ms, ease-out), and honour reduced motion.

### Don't:
- **Don't** bring back the old dark neon glassmorphism: no dark ground, glow, blur or translucent glass panels.
- **Don't** build a grid of photo cards with grey metadata; a beer is a label with a colour field, not a photo tile.
- **Don't** reuse a style ink as a decorative accent, or give one style two colours in different places.
- **Don't** add a second typeface.
- **Don't** put shadows on resting surfaces; Lift is a hover and focus response only.
- **Don't** use atmospheric gradients; the only patterns are the flat print bands on style fields.
