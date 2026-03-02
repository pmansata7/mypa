# project-health

Scan active projects for status, blockers, and next steps.

## When user invokes /project-health

1. **Scan** — List all projects in `04-Projects/`.
2. **For each project:**
   - **Activity:** Last modified; >7 days = 🟡, >14 days = 🟠
   - **Week Priorities:** Any tasks in current week? No activity 2+ weeks = 🟡
   - **Blockers:** Keywords "blocked", "waiting on", "stuck" → 🟠
   - **Next step:** Clear next action? Unclear = 🟡
3. **Output dashboard** — Table: Project | Status | Issue | Days Since Activity.
4. **Summary** — Count of 🟢 / 🟡 / 🟠 projects.
5. **Follow-ups** — For 🟡: add task to week, clarify next step. For 🟠: identify blocker.

**Status:** 🟢 Active, clear next steps | 🟡 Stale 7–14 days or no tasks or unclear next step | 🟠 Blocked or 14+ days

**Full workflow:** `.claude/skills/project-health/SKILL.md`
