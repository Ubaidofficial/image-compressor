# Changelog

## [Unreleased]

### Changed
- Sitemap `<lastmod>` now reflects the size-page rewrites: the 11 indexable size pages, the homepage and `/image-compressor` are dated 2026-11-27, the day #6's content went live (#5 changed the layout and content on 2026-11-26; #6 re-measured `sizeEvidence.json` and rewrote mode descriptions). New `INDEXABLE_SIZE_PAGES_UPDATED` in `src/data/pseoPages.ts`; consolidated (noindex) pages are not affected. No URL added or removed.
- Smallest File no longer stops at a quarter of the original width. After its usual steps it keeps shrinking in 0.85x steps down to the same 240px long side as Balanced (`MIN_LONG_SIDE_PX`), so it never gives up before Balanced does; it still reduces dimensions earlier and may use lower quality than Balanced. Its miss message no longer points to Balanced. `sizeEvidence.json` re-measured: the only changed result is the A4 scan at 20KB in Smallest File (22.8KB at 620×877, missed → 19.9KB at 527×745, fits); the 20KB page's scan FAQ is updated to match.

## [0.6.1] - 2026-11-26

### Changed
- Balanced mode (the default) no longer stops at half the original width. After its usual steps it keeps shrinking in 0.85x steps, ending at a 240px long side, so 10KB and 20KB targets fit on phone photos and A4 scans. Images that fit at full size are unchanged: dimensions first, highest quality under the target.
- Each size is probed once at the mode's lowest quality before the quality search; sizes that cannot fit are skipped after one encode. Results are unchanged; failing cases are faster.
- When a target is missed, the result is the smallest attempt (not a full-size encode), and the message names the mode's limit: Best Quality's 30% quality / 80% size floor, Smallest File's quarter-width floor, or Balanced's 240px floor.
- `src/data/sizeEvidence.json` re-measured: Balanced now fits all five test images at 10, 20 and 50KB in JPG and WebP (previously 1/5 at 10KB JPG, 3/5 at 20KB, 4/5 at 50KB JPG). Size-page observations and FAQs updated to match.
- SSC/UPSC presets (`resizeToSpec`) are untouched.

## [0.6.0] - 2026-11-26

### Added
- `npm run check:seo` now also fails when more than 25% of an indexable page's sentences (6+ words, numbers masked) appear on 3 or more other indexable pages. Shared UI marked `data-boilerplate="shared"` (the compressor widgets, the How it works box, the evidence method note) and the site header/footer are excluded. `--verbose` lists the shared sentences.
- `scripts/measure-size-evidence.mjs`: runs the site's own compressor in Chromium on five generated test images at every size target (JPG and WebP), plus a compression-mode comparison, and writes `src/data/sizeEvidence.json`.
- Indexable size pages (`compress-image-to-{10,50,100,200,500}kb`, `compress-image-to-1mb`, `image-compressor-to-{20,100,200}kb`, `reduce-image-size-in-kb`, `bulk-image-compressor`) get their own intro, a measured results table with written observations, official use cases from `uploadSpecs.ts` where one applies, and their own FAQ (`src/data/sizePageContent.ts`).
- Shared `HowItWorks` box (under 60 words) linking to the homepage's `#how-it-works`.

### Changed
- Size pages default the compressor to JPG output.
- The generic how-to steps, format notes, privacy line and "WebP is deliberate" paragraph are no longer repeated on indexable size pages. Consolidated (noindex) variants keep the old template.
- URLs, canonicals, the consolidation map and the sitemap are unchanged.

## [0.5.0] - 2026-11-26

### Added
- Exam and form preset pages with one-click resizers that output a JPG meeting the official spec, a spec table with "Source: ..., verified <date>", portal-specific rejection reasons and FAQ (issue #3):
  - `/ssc-photo-signature-resize`: SSC signature, JPG 10-20 KB, 6.0 x 2.0 cm at 300 DPI (709 x 236 px, DPI written to the file). No SSC photo preset: the 2026 SSC notices capture the photo live, with no file spec.
  - `/upsc-photo-signature-resize`: UPSC photo (JPG, 20-200 KB, saved as photo.jpg) and three-signature image (JPG, 20-100 KB, 350-500 px both axes, saved as signature.jpg).
  - `/signature-resize`: generic 10-20 KB and 20-50 KB signature presets, labelled as not tied to any exam.
- `src/data/uploadSpecs.ts`: single home for official specs, with quotes, source URLs and verification dates.
- `src/lib/resizeToSpec.ts`: JPEG output at exact dimensions, white background, KB range valid under both 1000- and 1024-byte readings, optional ink trimming for signatures, and comment-block padding when a plain image falls below a minimum size.

- JPG output option on the general compressor (`ImageCompressor`): an "Output format: JPG / WebP" choice. The homepage starts on JPG; other pages start on WebP as before; the converters (`/png-to-webp`, `/jpg-to-webp`, `/image-to-webp`) and `/webp-compressor` stay WebP-only with no choice. Transparent areas are filled with white for JPG, and the download is named `.jpg`.

### Changed
- Consolidated format/verb variants into one indexable page per size target (10/20/50/100/200/500 KB, 1 MB). Pages already indexed in Google are kept. Sitemap 65 -> 22 URLs; consolidated URLs stay live as noindex + canonical.
- Sitemap `<lastmod>` now uses each page's real content-change date instead of a hard-coded constant.
- Homepage retargeted to "reduce image size in KB / photo resize in KB" for exam and form uploads, linking the new preset pages; it states that the general tool outputs WebP and points form uploads to the JPG presets.
- `/contact` removed from the sitemap (still indexable and linked from every page).

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
