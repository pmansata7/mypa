# daily-plan

Generate context-aware daily plan with calendar, tasks, and priorities.

## When user invokes /daily-plan

1. **Check demo mode** — If `demo_mode: true` in `System/user-profile.yaml`, use `System/Demo/` paths.
2. **Gather context:**
   - Calendar: today's meetings, free blocks
   - Tasks: P0, P1, started-but-not-completed, overdue from `03-Tasks/Tasks.md`
   - Week Priorities: Top 3 from `02-Week_Priorities/Week_Priorities.md` or `00-Inbox/Weekly_Plans.md`
   - People: context for meeting attendees from `05-Areas/People/`
3. **Surface midweek progress** — Day of week, status of weekly priorities (complete / in progress / not started).
4. **Meeting prep context** — For each meeting: related project, outstanding tasks with attendees, suggested prep.
5. **Create plan** — Write to `07-Archives/Plans/YYYY-MM-DD.md` with: TL;DR, week progress, today's shape, commitments due, focus items, meeting context, task scheduling, heads up.
6. **Monday gate** — If Monday and week not planned, offer `/week-plan` first.

**Full workflow:** `.claude/skills/daily-plan/SKILL.md`
