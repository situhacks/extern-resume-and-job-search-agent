---
name: builder
description: Load when changing the kit itself — editing or adding a skill, adding cases, building/tuning the voice system, or changing how the agent behaves. Carries the principles for shaping this system well.
---

# builder

This is the mindset for *changing* AgentFrame Consulting Prep, not using it. Load it when the user wants to edit
a skill, add cases, build their voice, add a new capability, or change how the agent behaves. The point of this
kit is that you take it apart and make it yours — this skill is how to do that without making a mess.

## Principles

- **Files are the system.** Markdown is the source of truth. There's no app, no database, no hidden state —
  every behavior comes from a file you can read and change. To change what the agent does, change the file.
- **Examples over rules.** Especially for voice: a couple of concrete before/after pairs teach the agent more
  than ten rules, and they don't drift toward generic. When you can show it, show it instead of describing it.
- **Skills are just prompts you own.** A skill is a `SKILL.md` plus maybe a `resources/` folder. Editing one
  changes the behavior immediately. Don't be precious about them.
- **Keep it light.** No scar tissue: don't leave "why this exists" history, dates, or rationale in a file the
  agent reads at runtime — that's for a human, and it costs context. Runtime files carry present-tense
  instructions only. Lean and enough beats complete.
- **Surgical changes.** Every line you change should trace to the thing you actually wanted. If you're rewriting
  a file to fix one behavior, change the one part — don't relitigate the rest.
- **Load only what's needed.** `AGENTS.md` is the only always-on file. Everything else loads on demand. When you
  add something, make sure a parent file actually loads it at the right moment, or it's dead weight.

## Before you write or edit an agent-facing file — quick gate
1. **Who loads this?** A file the agent never opens does nothing. Name the parent (a skill, AGENTS.md, the voice
   README) that loads it, and confirm it does so at the right moment. If nothing loads it, fix the load-path
   first.
2. **Is any line just "why"?** Cut history and rationale-for-future-readers. Runtime prose is instruction, not
   documentation.
3. **Does this rule already exist?** If you're adding a rule, find the existing one on that topic — usually you
   should sharpen *that*, not add a near-duplicate.
4. **Does every line help the agent act?** If a line doesn't help it decide, do, or check — cut it.

## How to do the common things

- **Edit a skill's behavior:** open its `skills/{name}/SKILL.md` and change the steps or rules. Test by running
  the skill.
- **Add a new skill:** copy an existing skill folder (e.g. `skills/cv/`) as a template, rewrite the `SKILL.md`
  for the new job, and add a routing row to `AGENTS.md` so the agent knows when to use it.
- **Add cases:** drop a casebook PDF in `library/cases/originals/`, then follow
  `resources/convert-casebook.md` — the step-by-step for splitting the PDF into discrete cases, OCRing scans,
  preserving exhibits, and writing one tagged row per case to `case-tracker.md` (the index `run-case` reads).
- **Build or tune the voice:** follow `library/context/voice/README.md` — gather samples, mine them into pairs,
  interview for gaps, compile. To nudge it later, add a pair, don't add a rule.

## Defaults
- Lead with a recommendation and the trade-off — don't just list options.
- Look for the weakness first. If something already works, say so; don't fix what isn't broken.
- Verify before claiming it's done — run the skill, read the file back, check the behavior changed.
