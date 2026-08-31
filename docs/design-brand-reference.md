# Ada Brand / Interface Reference

This document is a design reference for the T-Level chatbot front end. It is intended to guide the UI decisions so the app feels visually aligned with Ada’s public brand without copying any proprietary assets directly.

## Sources reviewed
- https://www.ada.ac.uk/
- Ada public homepage content and CSS inspection
- Related public digital-skills/college branding cues reviewed during design research

Note: the National College for Digital Skills domain was not resolving successfully in this environment at the time of review, so the main design inspiration here is grounded in the Ada public website branding and the broader digital-skills education look and feel.

## Brand impression
Ada’s public web presence communicates:
- modern digital education
- practical skills and career readiness
- inclusion and accessibility
- a serious, educational tone rather than a playful consumer-tech tone
- strong contrast and clean readability

## Core colour palette
These are the most prominent colours observed in Ada’s public styles:

- Deep green / almost black: #091408
  - primary background, dark text, strong contrast base
- White: #FFFFFF
  - primary background, negative space, content blocks
- Light grey: #EAEBEA / #D3D4D3
  - supporting backgrounds, subtle surfaces, dividers
- Yellow accent: #F5E134
  - highlights, focus states, emphasis, link hover/focus treatments
- Red accent: #B10E1E
  - warnings, alert blocks, error emphasis
- Orange / coral accent: #F68352 / #EC6271
  - energetic highlight tones, secondary CTA or emphasis colours
- Dark green variant: #083B28 or similar dark educational tone when used in headings / strong contrast elements

Recommended app palette for the project:
- Primary dark: #091408
- Primary background: #FFFFFF
- Secondary surface: #EAEBEA
- Accent highlight: #F5E134
- Strong CTA / contrast colour: #091408 on white
- Secondary accent: #F68352 or #EC6271 as subtle highlight if needed

## Typography cues
Observations from Ada’s CSS:
- The site uses a bold, geometric, educational font stack
- There is a custom font loaded from Adobe Typekit: "biro-fssinclair"
- The general look is strong, structured, and high-contrast
- Headlines feel confident and direct, not overly decorative

Recommended frontend font direction:
- Use a bold or semi-bold sans-serif for headings
- Use a simpler neutral sans-serif for body text where necessary
- On a lightweight local app, use fallback stack such as:
  - "Biro FSSinclair", "Segoe UI", "Arial", sans-serif
  - or a bold geometric sans if a custom font is not available

## Interface / layout patterns
From the public site, the interface is generally:
- highly readable
- substantial whitespace
- strong headline hierarchy
- clear information grouping
- blocks and cards with generous padding
- strong contrast between dark text and light backgrounds

Likely UI traits to emulate:
- large, confident headings
- moderate spacing between sections
- card-like grouping for content blocks
- strong focus on accessibility and clarity over decorative complexity
- functional UI, not overly playful or futuristic

## Shape and form language
Ada’s web styling suggests:
- straight or lightly rounded shapes rather than soft bubble-like forms
- emphasis on clean structure and clarity
- links and buttons often have sharp focus states and strong outlines
- blocks feel purposeful and deliberate, not overly glossy

Guidance for the chat app:
- Use rounded corners modestly, around 12–18px for chat bubbles/cards
- Avoid very rounded, playful shapes unless the interaction calls for it
- Keep the interface crisp, structured, and modern
- Use visible separation between panels rather than heavy gradients or noisy backgrounds

## Button and interaction styling
The Ada site makes strong use of:
- deep dark backgrounds with white text
- yellow focus and highlight states
- links with underline and clear hover/focus feedback

Use the same pattern in the app:
- dark primary buttons: background #091408, text white
- yellow as a focus/selection accent when the user is interacting
- subtle hover changes rather than radical colour shifts
- clear focus rings for keyboard accessibility

## Recommended adaptation for this project
The app should feel like a modern education platform rather than a generic AI chatbot.

Recommended design direction:
- Background: off-white or very light grey
- Panels: white with subtle grey borders
- Sidebars or information blocks: pale grey or near-white with strong dark text
- Main call-to-action buttons: dark green/black
- Accent highlight: yellow for buttons, chips, focus states, or selected prompts
- Text: dark green/charcoal (#091408) for legibility

## Suggested style summary
If we were to distil the site’s visual language into one sentence:

Ada feels like a modern, credible, practical digital-education brand: dark green depth, crisp readable typography, strong contrast, subtle academic warmth, and purposeful, high-clarity UI.

## Practical app rules to use during development
- Keep the app clean, readable, and confident
- Do not make it too playful, neon, or overly consumer-tech oriented
- Use dark green and white as the primary pair
- Use yellow sparingly as an accent for important emphasis or focus
- Keep content blocks structured and obvious
- Maintain strong legibility for students, parents, and advisors
- Prefer utility over decoration

## Design intent for the chatbot
The chatbot should still feel like a trusted educational adviser, not a casual chat app.

Suggested characteristics:
- clear, intelligent tone
- calm visual hierarchy
- evidence-based and helpful feel
- trustworthy, professional design language
- crisp text and well-spaced interface

This should help the app sit naturally alongside Ada’s brand language while remaining appropriate for a student-facing advice tool.
