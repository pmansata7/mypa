---
name: meeting-actions-custom
description: Fetch the latest Granola meeting, scan notes and transcript, and extract a prioritized set of action items with owners and deadlines.
---

# Meeting Action Items

Scan your most recent meeting and produce a clean set of action items — who owns what, by when, and how it connects to your priorities.

## Process

### Step 1: Fetch the Latest Meeting from Granola

Run the existing fetch script to pull the most recent meeting into the vault:

```bash
cd "$VAULT_PATH" && python3 .scripts/fetch-latest-granola-meeting.py
```

The script prints the path to the written file on stdout. Capture that path.

**If the script fails** (exit code != 0):
> "Couldn't pull your latest meeting from Granola. Make sure the Granola app is installed and you've had at least one meeting recently."
>
> Stop here.

### Step 2: Read the Meeting File

Read the markdown file at the path returned by the script.

Extract:
- **Title** — from the `# heading`
- **Date** — from `**Date:**`
- **Attendees** — from `## Attendees` section
- **Notes** — from `## Notes` section
- **Existing action items** — any `- [ ]` checkboxes already in the notes
- **Transcript** — from `## Transcript` section (may be empty)

### Step 3: Read User Context

1. Read `System/user-profile.yaml` to get the user's **name** (used to identify "my" items vs. others').
2. Read `System/pillars.yaml` to get current **strategic pillars** (used to tag items).

### Step 4: Extract Action Items

Analyze the notes and transcript together. Look for:

1. **Explicit action items** — already marked as `- [ ]` in the notes
2. **Verbal commitments** — phrases like "I'll...", "Let me...", "I can take that", "I'll follow up", "We should...", "Can you..."
3. **Decisions requiring follow-through** — decisions made that need someone to execute
4. **Deadlines mentioned** — any dates or timeframes ("by Friday", "next week", "end of sprint")
5. **Requests from others** — things asked of the user by other participants

For each action item, determine:
- **Description** — clear, actionable phrasing (start with a verb)
- **Owner** — who's responsible (use "Me" for the user, first name for others)
- **Deadline** — specific date if mentioned, otherwise leave blank
- **Priority** — P1 (urgent/blocking), P2 (normal), P3 (nice-to-have)
- **Pillar** — which strategic pillar this aligns with, if any

### Step 5: Present Action Items

Display the results to the user:

```
## Action Items from: {Meeting Title}

**Date:** {date}
**Attendees:** {attendee list}

---

### My Action Items

| # | Action | Deadline | Priority | Pillar |
|---|--------|----------|----------|--------|
| 1 | {description} | {date or —} | P2 | {pillar or —} |
| 2 | ... | | | |

### Delegated / Others' Items

| # | Action | Owner | Deadline |
|---|--------|-------|----------|
| 1 | {description} | {name} | {date or —} |

### Decisions Made

- {decision 1}
- {decision 2}

---

**{N} action items total** — {X} for you, {Y} for others
```

### Step 6: Ask What to Do Next

Prompt the user:

```
What would you like to do?

1. **Save to Tasks** — Add "My Action Items" to 03-Tasks/Tasks.md with task IDs
2. **Save meeting file** — Write the full meeting note + action items to 00-Inbox/Meetings/
3. **Both** — Save tasks and meeting file
4. **Done** — Just wanted the summary, no file changes
```

### Step 7: Save (if requested)

**If saving to Tasks (option 1 or 3):**

For each "My Action Items" entry, append to `03-Tasks/Tasks.md` under the matching priority section:

```markdown
- [ ] {description} ^task-{YYYYMMDD}-{XXX}
  - Source: Meeting — {title} ({date})
  - Deadline: {date or none}
```

Where `{XXX}` is an incrementing 3-digit number for the day. Check existing task IDs in Tasks.md to avoid collisions.

**If saving meeting file (option 2 or 3):**

Ensure the meeting markdown file (already written by the fetch script in Step 1) contains the action items section. If the original file only had raw `- [ ]` items, replace or append with the enriched version:

```markdown
## Action Items

### For Me

- [ ] {description} ^task-{YYYYMMDD}-{XXX}
  - Priority: {P1/P2/P3}
  - Deadline: {date}

### For Others

- [ ] {description} — **{Owner}**
  - Deadline: {date}

### Decisions

- {decision}
```

### Step 8: Confirm

```
Done! Here's what I saved:

- {X} tasks added to 03-Tasks/Tasks.md
- Meeting note saved to {path}

Run /daily-plan to see these in today's priorities.
```

## Edge Cases

- **No transcript available:** Work from notes only. Mention: "No transcript found — action items are based on meeting notes only. Some verbal commitments may be missing."
- **No action items found:** Say: "No clear action items in this meeting. It may have been informational. Want me to save the meeting note anyway?"
- **Multiple meetings same day:** The script fetches the single most recent meeting. If the user wants a different one, suggest: "Run `/process-meetings today` to see all of today's meetings."

## Notes

- This is a custom skill, protected from Lumi updates
- Edit `.claude/skills/meeting-actions-custom/SKILL.md` to modify
- Works with Granola meetings only (uses the local Granola cache)
