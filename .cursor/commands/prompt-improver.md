# prompt-improver

Transform vague prompts into rich, structured prompts with automatic fallback.

## When user invokes /prompt-improver

**Args:** `$PROMPT` (required). Optional: `$FEEDBACK`, `$TARGET_MODEL`, `$SYSTEM`

**Flags:** `-p` show improved prompt only; `-v` show prompt then execute; (none) execute immediately.

1. **Parse** — Extract flag, original prompt, feedback.
2. **Improvement method** — Prefer `.scripts/improve-prompt.cjs`; else Anthropic API; else current LLM.
3. **Improve** — Sharpen clarity, add structure, examples if helpful.
4. **Execute** — Run improved prompt unless `-p`. Show result; optionally show improved prompt if `-v`.

**Full workflow:** `.claude/skills/prompt-improver/SKILL.md`
