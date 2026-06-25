---
name: doc-export
description: Turn a finished markdown CV/cover letter into a polished, ATS-safe, one-page PDF via an HTML template the user prints from their browser.
---

# doc-export

## Read this first — the philosophy
**The markdown is where the content gets right; the HTML template makes it look right.** The student iterates
`cv.md` / `cover-letter.md` until the copy is sharp and voice-checked — *that's* the work. This skill then pours
that finished markdown into a hand-designed, **ATS-safe, single-column, one-page** HTML template. The only manual
step left is a browser **print-to-PDF** — no Word round-trip, no formatting by hand. The PDF is submission-quality.

Why HTML→PDF and not .docx (this is deliberate — see the resume research): Word re-flows pagination per machine,
so a one-page CV silently spills to page two on the recruiter's computer — an instant reject at consulting firms.
A browser-printed PDF is fixed, and modern ATS (Workday/Greenhouse/Lever) parse a **text-based** PDF cleanly
(headless-Chrome print embeds real selectable text — NOT the image/"flattened" kind that parses at ~4%). So PDF
is the deliverable. **One real exception:** legacy **Oracle Taleo** parses PDF at only ~83% vs ~97% for DOCX — so
if you know the target ATS is Taleo (or an unknown legacy system), send the **`.docx`** instead (Path C). For
everything modern, and for holding the one-page layout, PDF wins. (`skills/cv/resources/ats.md` has the per-platform detail.)

## Path A — HTML → PDF (the default)
1. Pick the final markdown version (the user's done iterating `cv-v{n}.md` / `cover-letter-v{n}.md`).
2. Read the template: `resources/resume-template.html` (or `resources/cover-letter-template.html`).
3. **Fill the `<body>` from the markdown, keeping the `<style>` block byte-for-byte unchanged.** Follow the
   template's existing DOM pattern exactly — the single-column structure, the `.row` flex pairs for
   title/dates, and the company "umbrella" nesting for multiple roles at one firm. Do **not** add columns,
   tables, icons, images, or skill bars — they break ATS parsing. Keep it to **one page** of content (the
   `cv-v{n}.md` should already be one page; if the filled HTML would overflow, tell the user what to cut rather
   than shrinking the font).
4. Write the filled HTML next to the markdown, same version number, in the flat folder:
   `workspace/applications/{company}-{role}/cv-v{n}.html` (and `cover-letter-v{n}.html`).
5. **Auto-render the PDF into the same folder** using a browser the user already has (the kit ships none of its own):
   - **Preferred**: Run the automated helper script from the workspace root:
     ```bash
     node scripts/export_pdf.mjs workspace/applications/{company}-{role}/cv-v{n}.html
     node scripts/export_pdf.mjs workspace/applications/{company}-{role}/cover-letter-v{n}.html
     ```
     This script handles platform detection, browser discovery (Chrome or Edge), directory creation, and CLI argument quoting automatically.
   - **Alternative (manual CLI execution)**: Find an installed browser and run the headless print command:
     - Windows: `C:\Program Files\Google\Chrome\Application\chrome.exe` · `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`
     - macOS: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
     - Linux: `google-chrome` · `chromium`
     - Command:
       `"<browser>" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="<folder>/cv-v{n}.pdf" "file:///<abs-path>/cv-v{n}.html"`
       (On Windows, use a `file:///C:/…` URL with forward slashes and spaces as `%20`; add `--no-sandbox` if it errors.)
   - **Fallback (manual print)**: If no browser is found, open `cv-v{n}.html` in any browser → **Ctrl/Cmd + P** → **Save as PDF** → Margins **Default** → **uncheck "Headers and footers"** → save it into this application folder.
6. When the user submits, set the tracker's `Shipped` to this version (`application-tracker`) — it maps to `cv-v{n}.pdf`.

## Path B — Google Doc (only if Composio/native Docs is connected)
If a Google Docs tool is actually loaded in your session, you can instead push the markdown to an editable Google
Doc with **`GOOGLEDOCS_CREATE_DOCUMENT_MARKDOWN`** (`title`, `markdown_text`; SDK: pass
`dangerously_skip_version_check=True`). Use this only when the user wants a Doc to edit/share; the HTML→PDF path
is the better-looking, ATS-safe default. If it isn't connected, don't set it up just for this — do Path A.

## Path C — Word .docx (fallback / editing / legacy ATS)
Use when: a firm explicitly requires a `.docx` upload, **the target ATS is Oracle Taleo or an unknown legacy
system** (DOCX parses ~97% there vs PDF ~83% — see `skills/cv/resources/ats.md`), or the user wants an editable
copy to tweak by hand. Use the vendored `docx` skill (`skills/docx/SKILL.md`,
docx-js) — no setup needed; `example-docx-generator.js` in this folder is a runnable reference for the layout.
**Warn the user** it's a rough draft: Word may re-paginate and the layout won't match
the PDF. Prefer Path A whenever the choice is yours.

## The honest default to tell the user
> "Your CV and cover letter are finished as markdown — that's the part we polished. I've poured them into a
> one-page, ATS-safe HTML template; just open it and print to PDF (Ctrl/Cmd+P → Save as PDF, uncheck headers and
> footers). That PDF is ready to submit. If a specific firm demands a Word file, I can also export a rougher .docx."
