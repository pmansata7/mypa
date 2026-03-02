# pptx

Use the PPTX skill for presentation work. Reference: [skills.sh/anthropics/skills/pptx](https://skills.sh/anthropics/skills/pptx)

## When user invokes /pptx

1. **Read the skill** — Use `.claude/skills/anthropic-pptx/SKILL.md` for full workflows.
2. **Route by task:**
   - **Read/analyze** → `python -m markitdown presentation.pptx`
   - **Edit or create from template** → Follow editing workflow in the skill (unpack → edit → pack).
   - **Create from scratch** → Use html2pptx or pptxgenjs workflow per the skill.
3. **Apply design rules from the skill:**
   - Content-informed color palette; one dominant color, clear accent.
   - Every slide has a visual element (image, chart, icon, or shape).
   - Strong typography pairing and size contrast (e.g. 36–44pt titles, 14–16pt body).
   - 0.5" margins; consistent spacing; no accent lines under titles.
4. **QA before done:** Extract text with `python -m markitdown output.pptx`, check for placeholders and overlap. If generating slides, do at least one fix-and-verify pass.

## Dependencies (remind if missing)

- `pip install "markitdown[pptx]"` — text extraction
- `pip install Pillow` — thumbnails
- LibreOffice / Poppler — for PDF/image conversion when doing visual QA

## Output

Deliver the requested .pptx or edits, plus a one-line note on approach (e.g. "Used template X, adjusted palette for topic Y") when relevant.
