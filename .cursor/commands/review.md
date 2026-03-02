# review

End-of-day review with learning capture. Integrates with evening journaling if enabled.

## When user invokes /review

1. **Find files modified today** — Date-based filtering (today only). Ask user: "What did you actually work on?" Don't infer from timestamps alone.
2. **Gather context** — Completed tasks (`✅ YYYY-MM-DD` in `03-Tasks/Tasks.md`), weekly priorities, recent meetings.
3. **Progress assessment** — Accomplishments, progress on priorities, what got stuck, unexpected discoveries.
4. **Auto-extract session learnings** — Mistakes, preferences, documentation gaps. Write to `System/Session_Learnings/YYYY-MM-DD.md`.
5. **Tomorrow setup** — Open loops, commitments due, suggested focus.
6. **Journal** — If evening journaling enabled, offer to start entry.

**Full workflow:** `.claude/skills/review/SKILL.md`
