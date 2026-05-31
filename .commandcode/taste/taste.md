# Workflow
- Run `npm run lint` before `npm run build` to catch issues early. Confidence: 0.70
- Add defensive safeguards (loading states, failure states, validation, privacy notices) before testing. Confidence: 0.70

# Architecture
- Centralize shared constants in `src/lib/constants.ts`. Confidence: 0.70

# Accessibility
- Breadcrumb navigation must have `aria-label="Breadcrumb"`. Confidence: 0.75
- Status messages and live regions should use `aria-live` for screen reader announcements. Confidence: 0.70
- Upload dropzones must be keyboard accessible with proper file input labels. Confidence: 0.70

# Components
- SVG illustration components should be responsive, use `currentColor` or Tailwind-friendly classes, avoid random IDs that change between server/client, include accessible `<title>` or `aria-hidden="true"`, and keep the markup lightweight. Confidence: 0.70

# SEO
See [seo/taste.md](seo/taste.md)
# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

