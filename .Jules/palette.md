## 2024-05-22 - Skip to Content Link
**Learning:** Even well-structured sites often miss the "Skip to content" link, which is critical for keyboard users to bypass repetitive navigation. It's a high-impact, low-effort accessibility win.
**Action:** Always check for `skip-link` or similar mechanisms as the first step in accessibility audits. Ensure it targets the main content area specifically.

## 2026-01-01 - External Link Indicators
**Learning:** Users (especially on screen readers) need explicit warning when a link opens a new tab/window (`target="_blank"`).
**Action:** Use a global script (progressive enhancement) to automatically append a visual icon and visually-hidden text like "(opens in new tab)" to all such links. This ensures consistency and covers future content without manual HTML edits.

## 2026-05-21 - 404 Page Theme Consistency
**Learning:** Static 404 pages relying on shared CSS and `data-bs-theme` attributes can face inheritance issues (e.g., white background on dark theme) when loaded independently or by verification tools.
**Action:** Hardcode critical theme variables (background, text color) in the page's internal `<style>` block using `!important` to ensure visual consistency regardless of external factors.

## 2025-05-22 - Progressive Enhancement Overrides
**Learning:** Automated progressive enhancement scripts (like adding external link icons) can conflict with manual overrides, causing duplication and screen reader noise.
**Action:** Always check for the presence of existing elements (e.g., specific classes or tags like `<svg>`) before programmatically injecting decorative or functional icons.

## 2026-02-06 - Explicit Required Fields & Theme Tokens
**Learning:** Relying on implicit "all fields required" logic increases cognitive load, while standard utility classes (like `.text-danger`) often fail contrast checks in strict dark themes.
**Action:** Explicitly mark required fields with `aria-hidden` visual indicators, and globally override semantic utility classes to map to accessible theme tokens (`var(--rc-danger)`) instead of using inline styles.
