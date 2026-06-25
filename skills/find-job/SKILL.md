---
name: find-job
description: Find a live job posting (or list a firm's openings), pull the JD into an application folder, and open a tracker row — feeding the tailoring pipeline.
---

# find-job

Find a real posting for a firm + role + region, save its JD verbatim, and start the application. Output feeds
straight into `cv` / `cover-letter` (they read `application.md`) and `application-tracker` (the row).

## Two modes
- **Single** (default): the user names one firm + role + region → find that one posting, save the JD, start the
  application. Use the tiered approach below.
- **Batch / sweep**: the user wants to stock the funnel from their target list ("find roles for my search",
  "sweep my targets", or they just ask to find jobs without naming a firm) → run the **Batch mode** below.

## Batch mode — stock the funnel from the `## Search` whitelist
This is the producer for `target` rows. It turns "here's my search this round" into a populated funnel.

1. **Read the `## Search` block** at the top of `workspace/applications/tracker.md` (the campaign: track,
   regions, and the whitelist of `Firm — new-grad title — portal — pull method`). If there's no block yet, ask
   the user for their targets and have `application-tracker` write one first (it ships a filled consulting
   whitelist in `tracker.EXAMPLE.md` to copy).
2. **For each firm, use the pull method in its whitelist row** — honest about what's actually fetchable:
   - **`auto` (Workday feed)** — e.g. Accenture, PwC: hit the public Workday endpoint (Tier 1 below) with the
     firm's **new-grad title** as `searchText` and filter to the campaign's regions. Take the matching postings.
   - **`web-search → paste`** — e.g. Deloitte, EY, KPMG: WebSearch the firm careers page for the new-grad title
     + region (Tier 2), WebFetch the posting if found.
   - **`paste` (gated)** — the **MBB** (McKinsey/Bain/BCG run proprietary portals): don't try to scrape them.
     Create a `target` row with next action **"paste JD"** so the user knows to drop it in.
   - **Search the per-firm new-grad title, NOT "Consultant"** — that's the MBA-entry title at most firms; a
     new-grad sweep that searches "Consultant" returns the wrong tier.
3. **Seed a `target` row per result** (via `application-tracker`): Firm, the new-grad Role, Stage `target`,
   Deadline if the posting shows one, Next action (`paste JD` for gated, else `run company-research` / `tailor`),
   Updated today. **No folder yet** — folders are born when work starts. For postings actually fetched, you may
   also save the JD into the folder now (as in single mode); for gated firms, leave it as a `target` to paste.
4. **Report what you seeded**: "Added N target rows — M auto-pulled (Accenture, PwC), the rest need a paste
   (MBB) or a quick search. Want to start with the one closing soonest?" Flag anything in the campaign's `Watch`
   window (closing <14 days) as the next thing to do.

**Honest limits (same as single mode):** auto-sweep only works for firms on a public ATS feed; gated/proprietary
portals (all MBB, often Deloitte/EY/KPMG) end at "paste the JD" — never log in or bypass anti-bot. Don't
fabricate a posting to fill a row; if a firm returns nothing, say so and leave it as a paste `target`.

## The tiered approach — cheapest, cleanest, most legal first
Work down this list and stop at the first tier that returns the posting. Most of this needs **no key and no
setup** — the agent just fetches public data.

### Tier 1 — Public ATS endpoints (free, no key, no legal risk) — TRY FIRST
Most employers run a career portal on an ATS that exposes a public JSON feed built to populate its own site.
Fetching that JSON is first-party, free, and clean — no scraping, no proxies, no ToS breach.

1. **Find which ATS the firm uses.** WebSearch the firm's careers page and look at the URL host:
   - `job-boards.greenhouse.io/{token}` or `boards.greenhouse.io/{token}` → **Greenhouse**
   - `jobs.lever.co/{site}` → **Lever**
   - `jobs.ashbyhq.com/{board}` → **Ashby**
   - `{tenant}.wd{N}.myworkdayjobs.com/{site}` → **Workday** (common at the Big 4 and large firms)
2. **Hit the public endpoint** (WebFetch for the GETs; Bash `curl` for the Workday POST):
   - Greenhouse: `GET https://boards-api.greenhouse.io/v1/boards/{token}/jobs?content=true`
   - Lever: `GET https://api.lever.co/v0/postings/{site}?mode=json`
   - Ashby: `GET https://api.ashbyhq.com/posting-api/job-board/{board}?includeCompensation=true`
   - Workday: `POST https://{tenant}.wd{N}.myworkdayjobs.com/wday/cxs/{tenant}/{site}/jobs`
     with JSON body `{"limit":20,"offset":0,"searchText":"{role}","appliedFacets":{}}`
3. Pick the matching role, take its full description text and URL.

### Tier 2 — Native WebSearch + fetch (free, no key)
If the firm isn't on a public-feed ATS (or you can't find the token), use your own **WebSearch** to locate the
posting page, then **WebFetch** it and extract the JD text. Good for one-off postings and company pages.

### Tier 3 — Aggregator API (optional, only if a key is set)
For broad multi-board discovery ("find McKinsey BA roles across Toronto"), use an aggregator **only if the user
has added a key** (see `library/context/connectors.md` → job-search APIs). Default is **JSearch** (free tier ~200
req/mo; Google-for-Jobs coverage incl. LinkedIn/Indeed/Glassdoor); **Apify** actors are an optional alternative.
If no key is set, skip this tier — don't ask the user to buy anything; offer it: "broad cross-board search needs
a free JSearch key — see connectors.md — but I can keep pulling from career pages without it."

### Tier 4 — Paste fallback (always works)
For postings behind heavy auth — **and this includes the MBB targets** (McKinsey's proprietary system, Bain's
Avature, BCG's Eightfold) plus LinkedIn-only and university-portal (Handshake) roles — the honest path is: ask
the user to paste the JD. The kit's tailoring flow already starts from a pasted JD.

## Save the result (wire into the pipeline)
1. Write the JD to `workspace/applications/{company}-{role}/application.md` (flat folder named company+role) —
   **fixed facts only** (company, role, location, posting_url, saved_date) plus the **JD text verbatim**. State
   does NOT go here.
2. Open/advance the tracker row in `workspace/applications/tracker.md` (`application-tracker` skill): `target`
   if they're just bookmarking it, `researching`/`tailoring` if starting now. Set the deadline if the posting
   shows one.
3. Offer the next step: `company-research` (know the firm) or `cv` (tailor now).

## Rules / honest limits
- **Never log into a gated site or bypass anti-bot** (LinkedIn/Indeed ToS forbid it; logged-in scraping is a
  breach-of-contract risk). Tier 1 public feeds and Tier 2 logged-off pages are the safe lanes.
- **This skill only pulls JDs the user asked for. It never scrapes or scores *candidate* data** (that's the FCRA
  risk the research flagged) — out of scope.
- Save the JD verbatim; don't paraphrase it. The JD is the canonical input for tailoring.
- If a tier returns nothing, say which one and fall through — don't fabricate a posting.
