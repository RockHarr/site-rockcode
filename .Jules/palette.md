## 2024-05-22 - Skip to Content Link
**Learning:** Even well-structured sites often miss the "Skip to content" link, which is critical for keyboard users to bypass repetitive navigation. It's a high-impact, low-effort accessibility win.
**Action:** Always check for `skip-link` or similar mechanisms as the first step in accessibility audits. Ensure it targets the main content area specifically.

## 2026-01-01 - External Link Indicators
**Learning:** Users (especially on screen readers) need explicit warning when a link opens a new tab/window (`target="_blank"`).
**Action:** Use a global script (progressive enhancement) to automatically append a visual icon and visually-hidden text like "(opens in new tab)" to all such links. This ensures consistency and covers future content without manual HTML edits.

## 2026-05-21 - 404 Page Theme Consistency
**Learning:** Static 404 pages relying on shared CSS and `data-bs-theme` attributes can face inheritance issues (e.g., white background on dark theme) when loaded independently or by verification tools.
**Action:** Hardcode critical theme variables (background, text color) in the page's internal `<style>` block using `!important` to ensure visual consistency regardless of external factors.

## 2026-02-01 - Preventing Duplicate Indicators
**Learning:** Progressive enhancement scripts that inject UI elements (like external link icons) must explicitly check for manually added versions to avoid duplication and clutter.
**Action:** In enhancement scripts, check for both the script-generated class AND common manual implementations (e.g., Bootstrap icons) before injecting new elements.
