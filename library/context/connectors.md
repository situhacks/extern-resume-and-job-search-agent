# Connectors — Composio

**Composio is an optional tool hub** — one connection exposes 100+ external tools (Google Docs, Gmail,
Calendar, Drive, +more), so the agent can reach your real accounts when a task benefits from it instead of you
copy-pasting between apps.

**Optional and manual.** Everything in this system works without it (the agent falls back to local drafts and
`.docx` export). Composio adds reach to the outside world, but it takes a one-time per-machine setup — it is
**not** wired in automatically when you clone the repo (it can't be; see the note below).

> **Check your agent's native connectors first.** If you're on Claude Code (or another agent with built-in
> Gmail / Google Docs / Calendar / Drive connectors), you may already have those tools with **no setup at all** —
> the agent will use them directly. Composio is for when you want tools your agent doesn't natively have, or
> you're on an agent without built-in connectors. Don't do the manual setup below if a native tool already covers
> what you need.

## What it unlocks (consulting prep)
- **Google Docs** — push your markdown CV/cover letter into an editable Google Doc (tool:
  `GOOGLEDOCS_CREATE_DOCUMENT_MARKDOWN`, params `title` + `markdown_text`). The `doc-export` skill uses this.
- **Gmail** — draft a networking / cold-outreach email to a recruiter or alum, in your voice, ready to send.
- **Google Calendar** — check availability before proposing coffee-chat / interview times.
- **Google Drive** — pull a JD from Drive.

## Why there's no `.mcp.json` in this repo

Composio's MCP URL is **generated per user** (its "Tool Router" model) — you run a small script that mints a
URL unique to *your* authenticated session. There is no static endpoint to hardcode, so a committed
`.mcp.json` can't connect everyone. Each user wires it up once on their own machine (below). This is the honest
state of it — earlier versions of this doc implied it was pre-wired; it isn't.

## Setup (once per machine, ~5 min)

**1. Install the SDK + get a key.**
```bash
pip install composio python-dotenv
```
Get an `ak_…` API key from the [Composio dashboard](https://app.composio.dev). Put it in `.env`:
```
COMPOSIO_API_KEY=ak_…
USER_ID=your-name-or-email      # any stable id for "you"
```
(`.env` is gitignored.)

**2. Connect the app you want (OAuth) + mint your MCP URL.** Run this once per toolkit:
```python
import os
from composio import Composio
from dotenv import load_dotenv

load_dotenv()
client = Composio(api_key=os.getenv("COMPOSIO_API_KEY"))
user_id = os.getenv("USER_ID")

# Create a tool-router session for the toolkits you want, and print the MCP URL + the add command:
session = client.create(user_id=user_id, toolkits=["gmail", "googledocs", "googlecalendar"])
url = session.mcp.url
print(url)
print(f'claude mcp add --transport http composio "{url}" --headers "X-API-Key:{os.getenv("COMPOSIO_API_KEY")}"')
```

**3. Register it with your agent (Claude Code shown).** Run the `claude mcp add …` line the script printed:
```bash
claude mcp add --transport http composio "YOUR_MCP_URL" --headers "X-API-Key:ak_…"
```
Then restart the agent (`exit`, then `claude`). Confirm with `claude mcp list` — you should see `composio`.

- **Other agents (Codex / Cursor):** same idea — add an HTTP MCP server pointing at your generated URL with the
  `X-API-Key` header, via that agent's MCP config. The URL + header are what matter; the registration UI differs.

**4. First use triggers OAuth.** The first time the agent calls a Gmail/Docs tool, Composio gives you an auth
link — complete it in your browser once, and the connection is active.

## How the agent should use it
- **It only exists if the user set it up.** Composio tools appear in the session **only after** the steps above.
  If you (the agent) see `composio` tools (or native Gmail/Docs/Calendar tools) loaded, use the smallest one for
  the task. If you don't, the user hasn't connected anything — **do the task locally** (write the email as a
  draft file, export a local `.docx`) and *offer* the connector: "I drafted this locally — if you want me to send
  it through your real Gmail, you can connect Composio (see `library/context/connectors.md`)."
- **Don't claim a live 'check what's connected' call exists.** There isn't a reliable one — judge by whether the
  tools are present in your session.
- **Draft-first / read-first.** Prepare drafts and check info; never send or change anything without the user's ok.

---

# Job-search APIs (optional) — for `find-job`

The `find-job` skill needs **no key to work**: it pulls postings from free, public ATS feeds
(Greenhouse / Lever / Ashby / Workday) and from the agent's own WebSearch. A job-search API only adds **broad
cross-board discovery** (searching many boards at once). It's a one-time, bring-your-own-key add-on — set it up
only if you want that.

## Option A — JSearch (recommended)
Best free tier for a single user (~200 requests/month, no cost), simple setup, and it surfaces Google-for-Jobs
results (so it reaches LinkedIn / Indeed / Glassdoor listings indirectly).
1. Subscribe to **JSearch** on RapidAPI (free Basic tier): https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
2. Copy your RapidAPI key into `.env` as `JSEARCH_RAPIDAPI_KEY=…`.
3. That's it — `find-job` will use it for broad search when present, and skip it when not.

## Option B — Apify (alternative)
Generous free plan (~$5 monthly credits) and pre-built job actors (Google Jobs, multi-ATS, LinkedIn/Indeed
scrapers). Heads-up from the research: Apify is the costlier, more fragile option at volume (proxy/compute
billing, occasional silent empty results), so prefer JSearch or the free public feeds unless you specifically
want an actor. Get a token at https://apify.com → `.env` as `APIFY_API_TOKEN=…`.

## How the agent should use these
- **Public ATS feeds first** — free, clean, legal; no key involved. Reach for an aggregator key only for broad
  multi-board search.
- **If no key is set, don't push the user to buy one.** Pull from career pages / WebSearch and *offer* the
  option once: "broad cross-board search needs a free JSearch key — see this file."
- **Stay in the safe lane.** Only public, logged-off data and licensed API results — never log in to a gated
  site, bypass anti-bot, or fetch/score candidate data.
