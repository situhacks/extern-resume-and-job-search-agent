# Convert a casebook PDF → the case bank

The procedure for turning a casebook PDF into per-case markdown files + tracker rows that `run-case` can use.
Goal: **capture each case faithfully** (full text, exhibits, model answer) and **tag it** so the picker and the
progress system work. Don't restructure the case text — `run-case` decides aloud-vs-withhold from the casebook's
own headings; your job is faithful capture + accurate metadata.

## 0. Setup
- Source PDF is in `library/cases/originals/`. Pick a **book-slug** (e.g. `columbia-2006`, lowercase-kebab).
- If `library/cases/case-tracker.md` doesn't exist, create it by copying `case-tracker.EXAMPLE.md` and clearing
  the fictional rows (keep the header, the status key, and the `## Progress` block).

## 1. Text or scan?
- If the PDF has selectable text → extract directly.
- If it's a **scanned image** (no selectable text) → **OCR first**. If you can't OCR now, still create the rows
  but mark each `stub-scanned` so the user knows they need OCR before running. Don't fabricate case text.

## 2. Split into discrete cases
Find case boundaries from the book's own structure — a table of contents, "Case N", a title page per case, or a
repeating "Case Question" heading. Each case becomes ONE file. If a book interleaves cases and commentary, the
case is the unit that has a prompt + (usually) a model answer.

## 3. Per case — capture faithfully
Write `library/cases/markdown/{book-slug}/{id}-{title-slug}.md` containing the **full case text as written**:
- The **Case Question / prompt** (what's read aloud).
- The **Interviewer Briefing / Key Facts / Exhibits** (withheld until earned) — keep the casebook's own headings
  so `run-case` can tell them apart.
- **Exhibits/charts:** keep as text, a markdown table, or a faithful text description — never drop them. A case
  with an exhibit gets `Graph: yes`.
- The **Model Answer / Example Dialogue / Solution** if the book has one (this is what `case-reviewer` grades
  against). If there's none, that's fine — note it; `case-reviewer` falls back to the quality bar.

## 4. Tag the tracker row
Add one row to `case-tracker.md` with every column filled (see `case-tracker.EXAMPLE.md` for the shape):

| Column | How to fill it |
|---|---|
| ID | next integer, unique across the whole tracker |
| Book | the book-slug |
| Title | the case's real title |
| Types | one+ of: Profitability · Market Entry · M&A · Operations · Market Sizing · Pricing · Growth · Other |
| Firm | the firm the case emulates if the book says (McKinsey/Bain/BCG/…), else `—` |
| Diff | `Easy` / `Moderate` / `Hard` — use the book's label if given; else infer (see below) |
| Format | `Interviewer Led` / `Interviewee Led` / `Stop and Go` — from the book's style note, else `—` |
| Graph | `yes` if it has an exhibit/chart, else `no` |
| File | `markdown/{book-slug}/{id}-{title-slug}.md` |
| Status | `unrun`, or a `stub-*` if incomplete (below) |

**Inferring Diff** when the book doesn't say: `Easy` = single thread, light math, one framework (e.g. a basic
profitability or sizing). `Moderate` = 2–3 branches, a real calculation, some judgment. `Hard` = multiple
interacting drivers, exhibit interpretation, M&A/market-entry with sizing + breakeven, or ambiguous prompt.

## 5. Stub honestly when something's missing
Use these `Status` values instead of guessing:
- `stub-scanned` — PDF was an image; case text not yet OCR'd.
- `stub-no-pdf` — referenced case with no source file.
- `stub-no-page` — case exists but the page/location couldn't be pinned.
A stub row is a TODO, not a runnable case — `run-case` skips stubs when picking.

## 6. Report
Tell the user: how many cases added, the book-slug, and any stubs that need follow-up (e.g. "12 added, 3 are
`stub-scanned` — they need OCR before you can run them"). Don't claim a case is ready if it's a stub.

> Copyright note: converted cases + originals are **gitignored** (see `library/cases/README.md`). They live
> locally / ship in the workshop zip; they never get pushed.
