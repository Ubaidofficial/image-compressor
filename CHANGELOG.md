# Changelog

## [0.2.1] - 2026-05-31

### Improved
- Improved header logo accessibility with clear aria-label and focusable SVG.
- Cleaned decorative icon text from screen readers (benefit icons, step numbers).
- Reduced repeated template copy across published tool pages with custom WebP-why sections.
- Split related tools into clearer Popular Tools and More Tools groups.
- Reworded SEO-related claims for accuracy — removed "improves rankings" language.
- Softened "guaranteed under" language to be more precise about download behavior.

### Technical
- Preserved staged SEO rollout with exactly 5 sitemap URLs.
- Preserved `noindex, follow` for non-day-1 pages.
- Preserved WebP-only downloads and the 100KB maximum output rule.

## [0.2.0] - 2026-05-31

### Added
- Compression modes: Best Quality, Balanced, and Smallest File.
- Optional advanced resize controls with max-width presets (1920px, 1600px, 1200px, 800px, custom).
- Better failure recovery guidance with actionable tips.
- Bulk filename format controls (SEO friendly, keep original name, append -100kb).
- compression-report.csv included inside bulk ZIP downloads.
- Bulk ZIP named `100kbconverter-webp-images.zip`.

### Improved
- Bulk export workflow with filename deduplication and CSV reporting.
- Single-image compression controls while keeping Balanced as the default.
- Homepage design with logo, hero layout, benefit cards, trust chips, and footer nav.

### Technical
- Preserved staged SEO rollout with exactly 5 sitemap URLs.
- Preserved noindex, follow for non-day-1 pages.
- Preserved the 100KB maximum output rule.
- Preserved client-side-only image processing and WebP-only downloads.
