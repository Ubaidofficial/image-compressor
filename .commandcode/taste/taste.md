# Workflow
- Run `npm run lint` before `npm run build` to catch issues early. Confidence: 0.70
- Add defensive safeguards (loading states, failure states, validation, privacy notices) before testing. Confidence: 0.70
- Release housekeeping: (1) bump version in package.json, (2) update CHANGELOG.md with Added/Improved/Technical sections, (3) update src/lib/version.ts to match, (4) show version in footer, (5) lint then build, (6) report old/new version, files changed, and build result. Confidence: 0.75
- Inspect files and read current values before editing — never guess versions, routes, or existing content. Confidence: 0.75
- CHANGELOG.md entries use structured sections: ### Added, ### Improved, ### Technical. Confidence: 0.70

# Architecture
- Centralize shared constants in `src/lib/constants.ts`. Confidence: 0.70

# Accessibility
- Breadcrumb navigation must have `aria-label="Breadcrumb"`. Confidence: 0.75
- Status messages and live regions should use `aria-live` for screen reader announcements. Confidence: 0.70
- Upload dropzones must be keyboard accessible with proper file input labels. Confidence: 0.70
- Inline SVG elements should use `focusable="false"` to prevent unwanted focus behavior in legacy browsers. Confidence: 0.70

# Animation
- Use Tailwind `motion-safe:` prefix for animations and `motion-reduce:` to respect user reduced-motion preferences. Keep animations subtle (hover states, transitions, slight scale on cards). Confidence: 0.70

# Components
- SVG illustration components should be responsive, use `currentColor` or Tailwind-friendly classes, avoid random IDs that change between server/client, include accessible `<title>` or `aria-hidden="true"`, and keep the markup lightweight. Confidence: 0.70
- Do not use external images for graphics and icons. Use inline SVG components or existing SVG assets instead. Confidence: 0.70

# UX
- Keep the compression/upload tool visible above the fold on all tool pages. Place deeper content (FAQs, use cases, explanations) below the tool. Confidence: 0.75

# SEO
See [seo/taste.md](seo/taste.md)
# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

