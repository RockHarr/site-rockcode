## 2024-05-22 - Skip to Content Link
**Learning:** Even well-structured sites often miss the "Skip to content" link, which is critical for keyboard users to bypass repetitive navigation. It's a high-impact, low-effort accessibility win.
**Action:** Always check for `skip-link` or similar mechanisms as the first step in accessibility audits. Ensure it targets the main content area specifically.

## 2026-01-01 - External Link Indicators
**Learning:** Users (especially on screen readers) need explicit warning when a link opens a new tab/window (`target="_blank"`).
**Action:** Use a global script (progressive enhancement) to automatically append a visual icon and visually-hidden text like "(opens in new tab)" to all such links. This ensures consistency and covers future content without manual HTML edits.
