# daily-review

End-of-day review with learning capture and daily plan completion tracking.

## When user invokes /daily-review

1. **Check demo mode** — If `demo_mode: true`, use `System/Demo/` paths.
2. **Find files modified today** — Use date-based filtering (today only, not rolling 24h).
3. **Verify with user** — Ask: "These files were modified today. What did you actually work on?" (Don't infer from timestamps alone.)
4. **Check completed tasks** — Look for `✅ YYYY-MM-DD` in `03-Tasks/Tasks.md` matching today.
5. **Review weekly priorities** — Progress against this week's focus.
6. **Capture learnings** — Auto-extract from session: mistakes, preferences, documentation gaps. Write to `System/Session_Learnings/YYYY-MM-DD.md`.
7. **Surface tomorrow's focus** — Open loops, commitments, suggested prep.
8. **Journal check** — If `journaling.evening: true`, offer journal entry.

**Full workflow:** `.claude/skills/daily-review/SKILL.md`
