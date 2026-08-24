# DiffIQ — Document Change Intelligence PWA

A fully offline-capable Progressive Web App for comparing document versions.

## Quick start

### Option 1 — Local server (recommended for PWA features)

PWAs require HTTPS or localhost. Run any local server in this folder:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .

# Node (http-server)
npx http-server . -p 8080
```

Then open: http://localhost:8080

### Option 2 — Deploy to Vercel (free, HTTPS, installable)

```bash
npx vercel --prod
```

### Option 3 — Deploy to Netlify

Drag and drop this folder onto https://app.netlify.com/drop

### Option 4 — Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "DiffIQ PWA"
gh repo create docdiff --public --push --source=.
# Enable Pages in repo Settings → Pages → Deploy from branch: main
```

## PWA features

- Install to home screen (desktop and mobile)
- Works fully offline after first load
- All icons included (72px → 512px)
- Standalone display mode (no browser chrome)
- Update toast when a new version is cached
- Keyboard shortcuts: ↑/↓ arrows to navigate changes

## Supported file formats

| Format | Support |
|--------|---------|
| TXT | Full |
| MD | Full |
| CSV | Full |
| HTML | Full |
| JSON | Full |
| PDF | Text extraction (browser) |
| DOCX | Text extraction (browser) |
| XLSX | Text extraction (browser) |
| PPTX | Text extraction (browser) |

> For PDF/DOCX/XLSX/PPTX full fidelity, a Python backend with PyMuPDF + python-docx is needed.

## File structure

```
docdiff-pwa/
├── index.html       — Main app (all JS/CSS inline, no build step)
├── manifest.json    — PWA manifest
├── sw.js            — Service worker (cache-first, offline support)
├── icons/           — PWA icons (72–512px)
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
└── README.md
```

## How it works

1. Upload old + new document versions
2. Text is extracted client-side (no server, no uploads)
3. Sentences are aligned using Jaccard similarity
4. LCS (Longest Common Subsequence) diff finds exact word changes
5. Changes are classified: added / deleted / modified / moved
6. Severity scored: low / medium / high / critical
7. Categories tagged: numeric, date, financial, legal

All processing is 100% local — your documents never leave the browser.
