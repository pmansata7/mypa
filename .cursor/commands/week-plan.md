# week-plan

Set weekly priorities and plan the week ahead.

## When user invokes /week-plan

1. **Check demo mode** — If `demo_mode: true`, use `System/Demo/` paths.
2. **Gather context:**
   - Quarter goals from `01-Quarter_Goals/Quarter_Goals.md`
   - Last week's priorities and what was/wasn't done
   - Calendar shape for the week (meeting density)
   - Tasks from `03-Tasks/Tasks.md` (P0/P1, effort estimates)
3. **Suggest top 3 priorities** — Based on goals, calendar capacity, and task effort.
4. **Create week plan** — Write to `02-Week_Priorities/Week_Priorities.md` or `00-Inbox/Weekly_Plans.md`.
5. **Task scheduling** — Match high-effort tasks to open blocks; flag overload.

**Full workflow:** `.claude/skills/week-plan/SKILL.md`
