---
name: application-tracker
description: Maintain the cross-application funnel — stage, deadline, next action, shipped version — in one tracker; optionally reconcile statuses from the user's inbox.
---

# application-tracker

The single view over every application: where each one stands, what's due, what's next, and which version
you shipped. The application **folders hold the artifacts** (JD, research, cv.md, cover-letter.md); this
**tracker holds the state**. No state lives in both — `application.md` keeps the job's fixed facts only.

## The file
`workspace/applications/tracker.md` (the user's real one). If it doesn't exist yet, create it from the shape in
`tracker.EXAMPLE.md` — same columns, drop the fictional rows. One row per application.

| Column | Holds |
|---|---|
| Firm | the firm (also the folder name, slugified) |
| Role | role applied for (a firm can have several) |
| Stage | `target` → `researching` → `tailoring` → `ready` → `submitted` → `responded` → `interview` → `offer` / `reject` |
| Deadline | when it's due (drives "what to apply to next"), or `—` |
| Next action | the one next thing to do |
| Shipped | which version was sent — `—` until submitted, then `v1`/`v2`… |
| Updated | date of last change (so stale rows are obvious) |

**Keep it to these columns.** No notes column, no IDs, no per-row prose — this is an at-a-glance file the agent
reads. Firm + Role is just the link to the folder; all *state* lives only here.

## The `## Search` block — the campaign that drives `find-job`
Above the funnel table, the tracker carries a **`## Search` block**: this round's target list — the track
(new-grad vs. MBA), regions, and a **whitelist** of `Firm — new-grad title — portal — pull method`. This is the
*whitelist*, distinct from `positioning.md` (which is the user's identity, used to aim tailoring). `find-job`
reads this block to sweep for postings and seed `target` rows; `tracker.EXAMPLE.md` ships a filled consulting
whitelist (MBB + Big 4 + Accenture) as the starting point.

**You own this block — seed it from conversation.** When the tracker is missing or has no `## Search` block and
the user describes a search ("this round I want MBB + Big 4 across Canada/US, new-grad"), write the block from
what they said: copy the whitelist shape from `tracker.EXAMPLE.md`, keep/trim firms to their targets, and set
the track + regions. One conversation, no form. Keep the **per-firm title** right — the new-grad title differs by
firm (Business Analyst / Associate Consultant / Associate / Analyst), and "Consultant" is usually the MBA-entry
title (skip it for a new-grad search). Edit the block whenever the user's search changes; don't touch
`positioning.md` for it.

## How it's maintained — as a side effect, not a chore
The other skills bump the row as the user moves through them, so the tracker stays current without manual entry:
- **company-research** starts/sets a row to `researching`.
- **cv** / **cover-letter** set it to `tailoring`, then `ready` once both are done.
- **The user says they submitted** ("I applied to Bain", "sent it") → set `submitted`, make sure the sent
  version is rendered to PDF (below), set `Shipped` to that version + the date.
- A `target` row can exist with **no folder yet** — a firm the user means to apply to. The folder is born when
  work starts (`researching`/`tailoring`).

When you create or advance a row, always refresh **Updated** and set a concrete **Next action**.

## The shipped version (on `submitted`)
Drafts are already flat, versioned files (`cv-v1.md`, `cv-v2.md`, …) — those files ARE the history, so there's
no separate "freeze" step. On submit:
1. Make sure the version being sent is rendered to PDF (`doc-export` → `cv-v{n}.pdf` / `cover-letter-v{n}.pdf`).
2. Set the tracker's `Shipped` to that version (e.g. `v2`) — it maps directly to `cv-v2.pdf` in the folder.

## Routes this skill serves
- "Show me my applications / where am I / what's left / what's due this week" → read `tracker.md`, answer from it
  (sort by deadline; call out `target` rows as not-yet-started and anything overdue).
- "Add these firms to my target list" → add `target` rows (no folder needed yet).
- "I submitted X" → advance to `submitted` + freeze + record.

## Reconcile from the inbox (optional — only if an email tool is connected)
If a Gmail / email tool is loaded in your session (a native connector, or Composio — see
`library/context/connectors.md`), you can update statuses from real mail **on request** ("check my inbox for
application updates"):
- Search for application-related mail — the firm names in the tracker, plus keywords like *"thank you for
  applying"*, *"application received"*, *"unfortunately"*, *"next steps"*, *"schedule"*, *"interview"*.
- For matches, update the relevant row's Stage (`responded` / `interview` / `reject`), Next action, and Updated.
- Show the user what you changed and why (quote the signal); don't guess. If an email is ambiguous, ask.

**Honest limits — set them:** this is **read-only and on-demand**, not a background watcher — it only runs when
asked, and it can't log into firm portals (don't try; it only reads mail). If no email tool is connected, say so
and offer it: "I can reconcile statuses from your inbox if you connect an email tool — see
`library/context/connectors.md`." Never fabricate an update you didn't see in an email.
