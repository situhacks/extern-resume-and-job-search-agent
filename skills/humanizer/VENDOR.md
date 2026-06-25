## Humanizer Skill — Vendor Record

- Upstream: `https://github.com/blader/humanizer`
- Version: `2.7.0` · contentSha `a2ace14` · vendored `2026-06-01` · MIT
- Files (upstream, unmodified): `SKILL.md`, `README.md`, `AGENTS.md`, `LICENSE`

**Vendored whole, never edited.** The only AgentFrame change to `SKILL.md` is the vendor header above its frontmatter. The skill is wired into the kit by *reference*, not by editing it: `skills/cover-letter/SKILL.md` invokes it via the Skill tool in its self-critique pass, and `AGENTS.md` lists it as a voice-flow helper.

**Voice-calibration hook:** SKILL.md "Voice Calibration (Optional)" accepts a writing sample inline or by file path. The voice system points it at `library/context/voice/pairs/` to calibrate rewrites to the user's voice.

### Re-vendor

1. `git clone --depth 1 https://github.com/blader/humanizer.git` (temp).
2. Copy `SKILL.md`, `README.md`, `AGENTS.md`, `LICENSE` in (overwrite).
3. Re-prepend the vendor header to `SKILL.md`; update version/sha/date here.
4. Smoke-test a prose pass.
