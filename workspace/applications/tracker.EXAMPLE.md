<!-- EXAMPLE tracker (fictional funnel rows). Shows the shape of the real `tracker.md` the agent maintains.
The real one is created on first use and updated by the application skills as you move through them.
One row per application; `target` rows are firms you mean to apply to but haven't started (no folder yet).
Keep the funnel table to the columns below — no extra notes or prose. This file is for the agent to read
at a glance. The `## Search` block above the table is the campaign that drives `find-job` (see below). -->

# Application Tracker

The funnel over `workspace/applications/`. The folders hold the work; this holds the **state, deadlines, and
target list**. The agent updates it as you research, tailor, and submit — and can reconcile statuses from your
inbox on request (see the `application-tracker` skill).

**Stage:** `target` → `researching` → `tailoring` → `ready` → `submitted` → `responded` → `interview` → `offer` / `reject`
**Shipped:** which version was actually sent — `—` until submitted, then `v1`, `v2`… (maps to `cv-v1.pdf` / `cover-letter-v1.pdf` in the folder).

## Search — this round

The campaign that aims `find-job`: who you're hunting, where, and the *exact title to search per firm*. The agent
seeds `target` rows from this list (`find-job` batch/sweep). Edit it when your search changes — this is your
whitelist, not your identity (identity lives in `positioning.md`).

- **Track:** new-grad / undergrad entry level. **Search the per-firm title below — NOT "Consultant"**, which is
  the MBA-entry title at most firms (skip those).
- **Regions:** Vancouver · Canada · US
- **Watch:** flag any posting closing in <14 days as the next action.

**Whitelist** — `Firm — new-grad title — portal — pull method — ATS/screen` (ATS column tells `cv` which traits
to evidence; see `skills/cv/resources/ats.md`):

| Firm | New-grad title | Career portal | Pull method | ATS / screen |
| ---- | -------------- | ------------- | ----------- | ------------ |
| McKinsey | Business Analyst | mckinsey.com/careers/search-jobs | paste — gated | **Manual human review** (no ATS filter); CV only, no cover letter |
| Bain | Associate Consultant | careers.bain.com/jobs | paste — gated | **Avature** + human; screens ambitious/curious/entrepreneurial |
| BCG | Associate | careers.bcg.com/global/en/search-results | paste — gated | **Eightfold AI**; screens integrity/curiosity/creativity/collaboration/drive |
| Accenture | Consulting/Strategy Analyst | accenture.wd103.myworkdayjobs.com/AccentureCareers | **auto** — Workday feed | Workday (prefers DOCX) |
| Deloitte | Analyst (Business Analyst by practice) | careers.deloitte.ca | web-search → paste | proprietary (apply.deloitte) |
| PwC | Associate | pwc.wd3.myworkdayjobs.com/Global_Campus_Careers | **auto** — Workday feed | Workday (prefers DOCX) |
| EY | Staff / Analyst | ey.com/en_ca/careers/job-search | web-search → paste | SelectMinds |
| KPMG | Analyst | careers.kpmg.ca/professionals/jobs | web-search → paste | proprietary |

<!-- "auto" = find-job can sweep the public Workday JSON feed for the role+region and seed target rows itself.
"paste/web-search" = the portal is gated or proprietary; find-job lists it as a target with next action
"paste JD" (MBB) or finds the posting via WebSearch first. This split is honest about what's actually pullable. -->

## Funnel

| Firm | Role | Stage | Deadline | Next action | Shipped | Updated |
| ---- | ---- | ----- | -------- | ----------- | ------- | ------- |
| Meridian & Co. | Business Analyst, S&O | tailoring | 2026-06-19 | finish cover letter | — | 2026-06-12 |
| Northpoint Group | Associate Consultant | submitted | — | follow up wk of Jun 23 | v1 | 2026-06-10 |
| Atlas Strategy | Analyst | researching | 2026-06-24 | run company-research | — | 2026-06-13 |
| Vance & Hale | Consulting Analyst | target | 2026-07-01 | not started | — | — |
