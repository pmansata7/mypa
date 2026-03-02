# meeting-prep

Prepare for meetings by gathering attendee context and related topics.

## When user invokes /meeting-prep

**Args:** Optional — meeting topic, attendees (comma-separated). If missing, prompt for both.

1. **Look up attendees** — Search `05-Areas/People/Internal/` and `05-Areas/People/External/` for each name. Extract: role, last interaction, open action items, key notes.
2. **Related projects** — Search `04-Projects/` for projects mentioning attendees or meeting topic. Extract status, milestones, blockers.
3. **Recent history** — Search `00-Inbox/Meetings/` for past meetings with these attendees: what was discussed, decided, and committed.
4. **Compile prep brief** with: People Context (per attendee), Related Projects table, Recent History table, Suggested Talking Points, Questions to Consider.
5. **Post-meeting reminder** — Add notes to Meetings/, update person pages, create tasks for action items.

**Full workflow:** `.claude/skills/meeting-prep/SKILL.md`
