# triage

Route orphaned files and extract scattered tasks using strategic context.

## When user invokes /triage

**Args:** Optional — `files` | `tasks` | `all` (default: all)

1. **Load strategic context** — Week Priorities, Quarterly Goals. Build indexes: projects, people, areas.
2. **Files mode** — Scan `00-Inbox/` for standalone files. Score routing to projects, person pages, or resources based on keywords and current priorities.
3. **Tasks mode** — Find unchecked `- [ ]` tasks across notes. Route to `03-Tasks/Tasks.md` or project files with task IDs.
4. **Present for confirmation** — Show suggested routes; user approves before moving.
5. **Execute** — Move files, create task entries, update references.

**Demo mode:** If `demo_mode: true`, use `System/Demo/` paths.

**Full workflow:** `.claude/skills/triage/SKILL.md`
