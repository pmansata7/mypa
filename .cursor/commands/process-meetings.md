# process-meetings

Process synced Granola meetings to update person pages, extract tasks, and organize meeting notes.

## When user invokes /process-meetings

1. **Get meetings** — Use Granola MCP (or equivalent) to fetch recent meeting transcripts.
2. **For each meeting:**
   - Extract key takeaways, decisions, action items (with owner and follow-up date if any)
   - Identify people mentioned → create/update pages in `05-Areas/People/`
   - Link to relevant projects in `04-Projects/`
   - Save notes to `00-Inbox/Meetings/YYYY-MM-DD - [Topic].md`
3. **Tasks** — Extract action items to `03-Tasks/Tasks.md` with task IDs.
4. **Meeting action items** — Create `Meeting-Action-Items/` file if that structure exists.

**Full workflow:** `.claude/skills/process-meetings/SKILL.md`
