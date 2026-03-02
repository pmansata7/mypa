# journal

Toggle journaling or start a journal entry (morning/evening/weekly).

## When user invokes /journal

1. **Check config** — `System/user-profile.yaml` → `journaling` (morning, evening, weekly).
2. **Route:**
   - **Toggle** — Enable/disable journaling if user asks
   - **Morning** — Start morning journal; prompts for intention, focus
   - **Evening** — Start evening journal; prompts for reflection
   - **Weekly** — Start weekly journal; prompts for synthesis
3. **Save** — To configured journal path (e.g. `00-Inbox/Journal/` or `05-Areas/Journal/`).
4. **Integrate** — Evening journal can integrate with `/review`.

**Full workflow:** `.claude/skills/journal/SKILL.md`
