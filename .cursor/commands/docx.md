# docx

Work with Word documents (.docx): create, edit, tracked changes, comments, formatting preservation.

## When user invokes /docx

1. **Read the skill** — `.claude/skills/anthropic-docx/SKILL.md` for full workflows.
2. **Route by task:**
   - **Create** — Use templates or python-docx for new documents
   - **Edit** — Unpack, edit XML/JSON, repack; preserve tracked changes and comments
   - **Read/analyze** — Extract text, structure, comments via markitdown or docx parsing
3. **Preserve** — Tracked changes, comments, formatting when editing.
4. **Dependencies** — `pip install python-docx`; markitdown for text extraction.

**Full workflow:** `.claude/skills/anthropic-docx/SKILL.md`
