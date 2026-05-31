# Changelog

## [0.2.3] - 2026-05-31

### Improved
- Increased page layout widths to max-w-7xl for hero and card grids, max-w-4xl for reading content.
- Made compressor and bulk converter cards more prominent with card backgrounds, larger dropzones, and stronger borders.
- Improved homepage hero with larger H1, bigger CTAs, arrow icons, and tighter trust chips.
- Redesigned bulk settings into a labelled settings panel with clearer target/mode/filename sections.
- Improved card design with larger padding, bigger icons, rounded-xl/2xl, and consistent hover states.
- Improved typography: increased body text, larger H2s, better line-height, stronger dark mode contrast.
- Improved dark theme with zinc-950 body background, zinc-900 card surfaces, and softer border colors.
- Added subtle dropzone highlight states (blue glow border when file is selected).
- Moved "More Image Tools" to a secondary section with a divider separator.
- Improved FAQ accordions with larger text, better padding, and zinc-900 card background in dark mode.
- Made comparison table more polished with rounded borders and hover rows.
- Added lock icon to privacy note below upload dropzones.

### Technical
- Preserved staged SEO rollout with exactly 5 sitemap URLs.
- Preserved noindex, follow for non-day-one pages.
- Preserved WebP-only downloads and the 100KB maximum output rule.
- Added sticky header with backdrop blur for better navigation experience.

## [0.2.2] - 2026-05-31

### Improved
- Expanded day-one pages with more helpful structured content and clearer explanations.
- Added page-specific use-case grids, process steps, and feature breakdowns.
- Improved semantic keyword coverage without keyword stuffing or filler content.
- Added 5 new illustration SVG components for page-specific visual storytelling.
- Improved existing hero, bulk, and privacy illustrations with more polished design.
- Improved homepage content hierarchy with Why 100KB Converter, Use Cases, and tool comparison table.
- Added OnThisPage jump navigation for longer tool pages to improve scannability.
- Added ContentCardGrid, UseCaseGrid, KeywordInfoBlock, and OnThisPage reusable components.
- Added subtle fade-in animations and hover transitions with reduced-motion respect.
- Improved internal linking between all day-one tool pages with descriptive anchor text.

### Technical
- Preserved staged SEO rollout with exactly 5 sitemap URLs.
- Preserved `noindex, follow` for non-day-one pages.
- Preserved WebP-only downloads and the 100KB maximum output rule.
- Added CSS animation keyframes with prefers-reduced-motion safeguard.
- Added `id` prop support to FeatureGrid and ProcessSteps components for anchor linking.

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
