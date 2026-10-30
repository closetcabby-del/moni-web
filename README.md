# Moni — Studio Calendar

Portable copy of Monica’s customer-facing Pilates studio calendar website.

## Run locally

Requires Python 3 for a local web server and Node.js 20+ for checks. No package dependencies or build step.

```sh
python -m http.server 8080 --directory dist
```

Open http://localhost:8080. Run `npm run check` to validate schedule logic.

## Deploy or restore

Upload the contents of `dist/` to any static HTTPS hosting service. Set its publish directory to `dist`; no build command is required. Hash-based navigation needs no rewrite rules. `.openai/hosting.json` records the original ChatGPT Sites identity, but is not required by other hosts. No ChatGPT runtime or API key is required to serve the website. Google Fonts is an external styling dependency with local fallbacks.

## Content and schedule

- `dist/schedule.json`: shared class and studio data.
- `dist/schedule-info.json`: recurrence metadata and exception dates.
- `SCHEDULE_NOTES.md`: source, assumptions and known limitations.
- `dist/assets/`: Moni’s portrait and the Eri-Core studio photo from its official website.

Current dated schedule covers November 2, 2026 through May 2, 2027. Extend and verify it before that horizon ends. The website is not synchronized with studio availability. Booking is completed on the studio website. There is no private schedule editor or shared backend yet.

## Related projects

Native iPhone app: https://github.com/closetcabby-del/moni-ios
Current Sites publication: https://moni-studio-web.jeffelectric-7256.chatgpt.site

This repository is an independent source backup as of October 30, 2026. Future Sites edits do not automatically synchronize here; copy and verify each change until a single publishing workflow is established. Repository privacy does not protect a separately published website.

## Recovery checklist

1. Clone or download this repository.
2. Run the checks and local server.
3. Publish `dist/` to a replacement host.
4. Connect the domain using that host’s DNS instructions.

Keep an additional offline repository backup and retain access to the domain registrar account. Code and schedule are stored together currently; any future database needs a separate backup.
