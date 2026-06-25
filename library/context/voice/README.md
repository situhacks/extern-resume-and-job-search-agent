# Your voice — how the kit learns to write like you

This folder is how your cover letters, behavioral answers, and resume bullets come out sounding like *you*
instead of generic AI. It works by examples, not rules: it learns from writing you've actually done and writing
you admire, then generates toward that.

> **Not set up yet?** If these files still hold bracketed `[placeholders]`, your voice isn't built — don't let
> the agent draft against placeholders. Run the build below (it's a guided ~20-minute session with the agent).

## What loads when
- **Always load** when writing anything in your voice: `identity.md`, `anti-patterns.md`, `voice-profile.md`.
- **Load by register:** the matching file in `pairs/` for what you're writing (cover letter, behavioral answer,
  networking email). Don't load every pair file.
- For generic-AI-tell cleanup, the `humanizer` skill (`skills/humanizer/`) is the calibration pass.

How to write in voice: generate *from* the pairs and profile, then clean with `anti-patterns.md` + the humanizer.
Rules catch generic AI; the pairs and profile produce the voice. Don't reason your way to a voice from rules —
it pulls toward generic.

---

## Build your voice (the order matters)

Voice comes from examples of what you actually write and what you'd reject, not from describing yourself. Build
it in this order — the agent drives this as a session; just talk to it.

1. **Copy + orient.** The files here ship as `[placeholder]` templates. Fill them in (the steps below populate them).

2. **Gather samples** — drop any of these into `intake/corpus/` (it's all just writing for the agent to read):
   - **Writing you admire** — a cover letter, essay, or post you wish you'd written. This seeds the first pairs
     and gives a reference anchor early, before you have much of your own.
   - **Your own writing** — past cover letters, application essays, sent emails, dictated notes. Higher signal
     than describing your style. Note in each file whether it's *admired* or *yours* (one line).
   - **Composio pull** (optional) — if connected, point the agent at your sent emails or Google Docs to read your
     real writing directly.

3. **Mine the corpus into pairs + profile.** The agent reads `corpus/`, extracts contrastive pairs (generic
   version → your version → the move) into `pairs/` by register, and drafts your `voice-profile.md` from what the
   samples actually do — not from what you say about yourself. Most of the profile comes from here.

4. **Run the taste interview LAST** (`intake/taste-interview.md`) — only for the gaps the samples couldn't reveal
   (the *why* behind your taste, your hard nos, registers you haven't written yet). Dictate your answers; the
   agent pushes on vague ones. Saves to `intake/transcript-{date}.md`.

5. **Compile.** The agent writes `voice-profile.md` (in your words), fills `identity.md` and `anti-patterns.md`,
   and finalizes `pairs/` (keep it to ~15–25, deduped, newest weighted heaviest).

6. **Validate.** Draft one test cover letter using only the new voice files. Does it sound like you in 1–2 passes?
   If not, the pairs are the lever — sharpen or add one, then you're set.

Once built, this doesn't re-run. The `learn` skill harvests your future corrections into new pairs as you go.

> Want to see a filled example? Look at the `*.EXAMPLE.md` files here — a worked voice for the fictional
> candidate Priya (same one used across the other examples).
