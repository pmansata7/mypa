#!/usr/bin/env node
/**
 * Makes the DYL Good Time Journal PDF editable by adding fillable form fields.
 * Uses pdf-lib to add AcroForm text fields and checkboxes.
 *
 * Run: node make-editable-pdf.js [input.pdf] [output.pdf]
 * Default: DYL-Good-Time-Journal-Activity-Log-v21.pdf
 */

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function makeEditable(inputPath, outputPath) {
  const pdfBytes = readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  const form = pdfDoc.getForm();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const pageWidth = 612;
  const pageHeight = 792;

  // PDF coordinates: origin bottom-left, y increases upward
  const margin = 50;
  const lineHeight = 26;
  const fieldHeight = 20;
  const lineWidth = pageWidth - 2 * margin;

  // Invisible fields - no borders or background, preserves original design
  const fieldOpts = (x, y, w, h) => ({
    x,
    y,
    width: w,
    height: h,
    borderWidth: 0,
    font,
  });

  pages.forEach((page, pageIndex) => {
    const pageNum = pageIndex + 1;
    const topY = pageHeight - margin;
    const bottomY = margin;
    const numLines = Math.floor((topY - bottomY) / lineHeight);

    for (let i = 0; i < numLines; i++) {
      const y = topY - (i + 1) * lineHeight;
      form.createTextField(`page${pageNum}_line${i + 1}`).addToPage(
        page,
        fieldOpts(margin, y, lineWidth, fieldHeight)
      );
    }
  });

  const modifiedPdfBytes = await pdfDoc.save();
  writeFileSync(outputPath, modifiedPdfBytes);
  console.log(`Created editable PDF: ${outputPath}`);
}

const inputPath = process.argv[2] || join(__dirname, '..', '..', '..', 'DYL-Good-Time-Journal-Activity-Log-v21.pdf');
const outputPath = process.argv[3] || join(__dirname, 'DYL-Good-Time-Journal-Activity-Log-v21-editable.pdf');

makeEditable(inputPath, outputPath).catch((err) => {
  console.error(err);
  process.exit(1);
});
