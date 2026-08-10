# Changelog

## [0.4.0] - 2026-08-10

### Added
- Two-axis pSEO content engine: `pseoContent.ts` supplies size-tier copy (13 tiers) and subject-variant copy (11 variants); `pseoAngles.ts` supplies a bespoke section per slug. Previously all body copy derived from size alone, so any two pages sharing a size target rendered near-identical text.
- 16 expansion pages covering three untargeted keyword families — `image-compressor-to-{20,50,100,200,500}kb`, `resize-image-to-{20,50,100,200,500}kb`, and `reduce-image-size-{in-kb,to-100kb,to-50kb}` — plus `compress-jpg-online` and `photo-compressor-to-{20,200}kb`.
- `npm run check:seo` fails the build if any two indexable pages exceed 0.65 six-gram Jaccard similarity.
- `seo/disavow.txt` covering 452 spam referring domains.
- PNG Open Graph image at `public/og-image.png`.

### Changed
- `/png-to-webp` promoted from noindex to a full indexed page targeting "png to webp" (223k global searches, KD 25) — it had been suppressed since launch.
- `/image-to-webp` promoted to an indexed converters hub; `/contact` promoted to indexed.
- `og:image` switched from SVG to PNG — Facebook, X, LinkedIn, and Slack all refuse to render SVG.
- Section headings now vary by subject variant instead of being identical across every page at a given size.
- Homepage "More Image Tools" links are filtered to indexable pages and the page revalidates daily, so staggered publishing actually advances.
- Phase 3 rollout staggers 4 pages on 2026-08-10 then 3 every other day, ordered by search volume descending.

### Fixed
- `/png-to-webp-100kb` canonicalised to a noindex page; its target is now indexed.
- Internal links and same-size link blocks no longer point at noindex pages.
- Removed five empty leftover route directories.

### Technical
- 10 pure-synonym slugs consolidated via `CONSOLIDATION` — noindex plus canonical to their head page. Each carried under ~800 global searches while duplicating a page targeting tens of thousands. The URLs stay live.
- New helpers `isPseoPageIndexable()`, `pseoCanonicalPath()`, `getIndexablePseoPages()`; sitemap and `[slug]` metadata now use them.
- Median indexable page length 550 → 1025 words; worst duplicate pair 0.971 → under 0.65.
- Sitemap 56 → 53 entries.

## [0.2.4] - 2026-05-31

### Improved
- Removed duplicate bottom template sections on tool pages with custom children content.
- Made single-image compressor cards wider on desktop (max-w-3xl, tool cards max-w-5xl).
- Increased header nav text size and spacing for better readability.

### Technical
- Template sections now rendered conditionally — only shown when no page-specific children are passed.
- Preserved staged SEO rollout with exactly 5 sitemap URLs.
- Preserved noindex, follow for non-day-one pages.
- Preserved WebP-only downloads and the 100KB maximum output rule.

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
