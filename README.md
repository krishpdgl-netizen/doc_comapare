# DiffIQ — Document Change Intelligence

A browser-first document version comparison PWA. DiffIQ compares two document versions locally in the browser, highlights changes side-by-side, classifies important changes, and exports a change report.

## Supported formats

- TXT / MD / JSON
- CSV
- HTML
- DOCX (structured paragraphs, headings, lists and table cells)
- XLSX / XLS (cell-level values + formula changes)
- PPTX (slide text extraction)
- PDF (text extraction + rendered pages)

## Important privacy behavior

Files are processed in the browser. They are not uploaded to a server by this build.

## Run locally

Do **not** double-click `index.html` if you want PWA installation. Service workers require HTTPS or localhost.

```bash
cd DiffIQ_Production
python -m http.server 8080
```

Open `http://localhost:8080`.

After the first load, refresh once if the browser has not yet offered installation. Use the **Install** button in the DiffIQ top bar.

## Deploy to Vercel

This folder is ready for static deployment.

```bash
npx vercel --prod
```

Or create a Vercel project and upload/push this folder. `vercel.json` supplies the correct service-worker and manifest cache/content headers.

## PWA install checklist

The production URL must:

1. Use HTTPS (localhost is also allowed for development).
2. Serve `manifest.json` successfully.
3. Serve `sw.js` successfully from the same application scope.
4. Serve the required 192px and 512px icons.
5. Allow the service worker to activate.

This package includes:

- `icon-192.png`
- `icon-192-maskable.png`
- `icon-512.png`
- `icon-512-maskable.png`
- `manifest.json`
- `sw.js`

On Chromium browsers, the in-app **Install** button uses the native install prompt when it is available. On iPhone/iPad, Safari requires **Share → Add to Home Screen**.

## Comparison behavior

DOCX/HTML/CSV content is normalized into structured blocks rather than flattened into one large text stream. This reduces false matches and allows a change to retain a stable old/new block location.

The comparison engine:

1. Anchors exact unchanged blocks.
2. Detects exact blocks that moved/reordered.
3. Pairs likely modified blocks with structure-aware similarity.
4. Marks unmatched blocks as added or deleted.
5. Runs a word/token-level LCS inside modified blocks.
6. Classifies numeric, date, financial, legal, security and formula-related changes.

XLSX comparisons are cell-level and formulas are read as text; formulas are never executed.

## Change navigation

Selecting a change:

- highlights the corresponding old and new locations,
- jumps each document pane directly to its matching block/cell,
- temporarily suspends proportional scroll synchronization so the two scrolling animations cannot fight the jump,
- uses the nearest aligned counterpart for one-sided additions/deletions.

## Production notes

- Current browser-processing size limit: 25 MB per file.
- AI interpretation is not included in this offline build; the deterministic diff works without any API key.
- For very large enterprise documents, OCR, layout-aware PDF coordinates, user accounts, team history and server-side background jobs, add a FastAPI backend/object storage layer rather than increasing browser memory limits indefinitely.
