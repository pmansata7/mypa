# markitdown

Convert any file to Markdown using Microsoft's MarkItDown. Supports PDF, PPTX, DOCX, XLSX, images, audio, HTML, CSV, JSON, XML, ZIP, YouTube URLs, and more.

## When user invokes /markitdown

1. **Ask for the file** — if not already provided, ask the user for the file path or URL.
2. **Run the conversion:**

```bash
source "/Users/pmansata/Downloads/AI Projects/Lumi/.venv-markitdown/bin/activate" && python -m markitdown "<FILE_PATH>" -o "<OUTPUT_PATH>"
```

   - Default output: same directory as the source file, with `.md` extension.
   - If user provides a URL (YouTube, etc.), pass it directly as the argument.

3. **Route by task:**
   - **Convert to Markdown** — Run the command above, deliver the `.md` file.
   - **Extract and summarize** — Convert first, then read the Markdown and provide a summary.
   - **Batch convert** — Loop over multiple files: `for f in *.pdf; do python -m markitdown "$f" -o "${f%.pdf}.md"; done`
   - **Pipe content** — `cat file.pdf | python -m markitdown > output.md`

4. **After conversion:**
   - Read the output `.md` file and confirm it looks correct.
   - If the user wants edits, work with the Markdown directly.
   - Offer to move/rename the output if needed.

## Supported Formats

| Format | Extensions / Input |
|---|---|
| PDF | `.pdf` |
| PowerPoint | `.pptx` |
| Word | `.docx` |
| Excel | `.xlsx`, `.xls` |
| Images | `.jpg`, `.png`, `.gif` (EXIF + OCR) |
| Audio | `.wav`, `.mp3` (EXIF + transcription) |
| HTML | `.html`, `.htm` |
| Text-based | `.csv`, `.json`, `.xml` |
| Archives | `.zip` (iterates contents) |
| YouTube | YouTube URLs (transcript) |
| EPub | `.epub` |

## Environment

- **Python venv:** `.venv-markitdown/` (Python 3.12)
- **Activate:** `source "/Users/pmansata/Downloads/AI Projects/Lumi/.venv-markitdown/bin/activate"`
- **Package:** `markitdown[all]` v0.1.4

## Examples

```bash
# Single file
source .venv-markitdown/bin/activate && python -m markitdown report.pdf -o report.md

# YouTube transcript
python -m markitdown "https://www.youtube.com/watch?v=VIDEO_ID" -o transcript.md

# Batch convert all PDFs in a folder
for f in *.pdf; do python -m markitdown "$f" -o "${f%.pdf}.md"; done

# Image with OCR
python -m markitdown screenshot.png -o extracted-text.md
```
