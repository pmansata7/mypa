# xlsx

Work with spreadsheets (.xlsx): create, edit, formulas, data analysis, visualization.

## When user invokes /xlsx

1. **Read the skill** — `.claude/skills/anthropic-xlsx/SKILL.md` for full workflows.
2. **Route by task:**
   - **Create** — New workbook with sheets, formulas, formatting
   - **Edit** — Add/update cells, rows, columns; preserve existing formulas
   - **Read/analyze** — Extract data, recalc formulas, summarize
   - **Visualization** — Charts, conditional formatting
3. **Preserve formulas** — Don't overwrite formula cells with values when editing.
4. **Dependencies** — `openpyxl`, `xlrd` for reading; recalc.py for formula evaluation.

**Full workflow:** `.claude/skills/anthropic-xlsx/SKILL.md`
