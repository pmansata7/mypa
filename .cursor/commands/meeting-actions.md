# meeting-actions

Fetch the latest Granola meeting, scan notes and transcript, and extract prioritized action items with owners and deadlines.

## When user invokes /meeting-actions

1. **Fetch** the latest meeting from Granola using `.scripts/fetch-latest-granola-meeting.py`
2. **Scan** meeting notes and transcript for explicit and implied action items
3. **Present** a structured table: my items, others' items, decisions made
4. **Offer** to save action items to `03-Tasks/Tasks.md` and/or the meeting file

**Full workflow:** `.claude/skills/meeting-actions-custom/SKILL.md`
