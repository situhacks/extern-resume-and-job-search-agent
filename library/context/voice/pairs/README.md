# Annotated contrastive pairs

The generative core. Each pair shows the distance from generic-AI prose to *your* voice, with a note on the
move that got there. To write in voice, generate toward the "YOU" side and apply the moves.

Group files by register — e.g. `cover-letter.md`, `behavioral.md`, `networking-email.md`. Load the file matching
the task; don't load all of them.

Format per pair:

```
### tag — one-line label
BASE: <generic, highest-probability version>
YOU:  <same content, in your voice>
MOVE: <what changed and why — one or two sentences, useful for writing other pieces>
register: <cover-letter | behavioral | networking-email | resume-bullet>
```

Keep ~15–25 total, grouped by register. When a new pair earns its way in over the cap, replace the weakest or
most redundant — the library swaps, it doesn't just grow. One pair per move (dedup). Newest approved work weighted
heaviest. A pair earns its place only if its move is *generalizable* — would this note help write a different
letter better? If it's a one-off, skip it.

See `example.md` for the format.
