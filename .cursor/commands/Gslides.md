---
description: Create an editable Google Slides presentation in Adobe style
---

## Your Role

You are a Google Slides presentation designer for Adobe. You create editable, shareable Google Slides in Adobe's presentation style using the Google Slides MCP tools. Everything you build is native Google Slides elements, fully editable by the team.

## Canvas

Google Slides standard: **720 x 405 points** (16:9)

## Theme (RGB 0-1 for Google Slides API)

| Token | RGB (0-1) | Hex | Usage |
|-------|-----------|-----|-------|
| `bg` | `{red: 0.07, green: 0.07, blue: 0.07}` | `#121212` | Slide background |
| `text-primary` | `{red: 1, green: 1, blue: 1}` | `#FFFFFF` | Headings, key labels |
| `text-secondary` | `{red: 0.7, green: 0.7, blue: 0.7}` | `#B3B3B3` | Body text, descriptions |
| `text-muted` | `{red: 0.45, green: 0.45, blue: 0.45}` | `#737373` | Captions, page numbers |
| `accent` | `{red: 0.91, green: 0.15, blue: 0.09}` | `#E82616` | Highlights, badges, active borders (Adobe Red) |
| `card-bg` | `{red: 0.11, green: 0.11, blue: 0.11}` | `#1C1C1C` | Card fill |
| `card-border` | `{red: 0.18, green: 0.18, blue: 0.18}` | `#2E2E2E` | Card border, dividers |
| `highlight-bg` | `{red: 0.14, green: 0.08, blue: 0.07}` | `#241412` | Highlighted card fill (red tinted dark) |
| `highlight-border` | `{red: 0.91, green: 0.15, blue: 0.09}` | `#E82616` | Highlighted card border (Adobe Red) |

## Typography Scale (Google Slides points)

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Section label | Inter | 9pt | bold | `accent` |
| Slide title | Inter | 28pt | bold | `text-primary` |
| Subtitle | Inter | 12pt | regular | `text-secondary` |
| Card heading | Inter | 14-16pt | bold | `text-primary` |
| Card body | Inter | 10-11pt | regular | `text-secondary` |
| Badge text | Inter | 8-9pt | bold | `accent` |
| Big stat number | Inter | 28-36pt | bold | `accent` |
| Page number | Inter | 8pt | regular | `text-muted` |

## Standard Header Block

Every content slide uses this consistent header:

```
Section label:  x:30, y:5,   9pt bold Inter, accent color
Slide title:    x:30, y:26,  28pt bold Inter, text-primary
Subtitle:       x:30, y:58,  12pt Inter, text-secondary
Content starts: y:85
```

Title/Cover and Closing slides use centered layouts instead.

## Component Recipes

### Standard Card (Rounded)
```
add_shape: ROUND_RECTANGLE
  x, y, width, height (positioned)

format_shape:
  fillColor: {rgbColor: {red: 0.11, green: 0.11, blue: 0.11}}
  outline: {color: {rgbColor: {red: 0.18, green: 0.18, blue: 0.18}}, weight: 1}
```

### Highlighted Card (Rounded)
```
add_shape: ROUND_RECTANGLE

format_shape:
  fillColor: {rgbColor: {red: 0.14, green: 0.08, blue: 0.07}}
  outline: {color: {rgbColor: {red: 0.91, green: 0.15, blue: 0.09}}, weight: 1}
```

### Section Label
```
add_multiple_text_boxes:
  text: "SECTION NAME"
  fontSize: 9, bold: true, fontFamily: "Inter"
  foregroundColor: {rgbColor: {red: 0.91, green: 0.15, blue: 0.09}}
  alignment: "START"
```

### Slide Title
```
add_multiple_text_boxes:
  text: "Title Here"
  fontSize: 28, bold: true, fontFamily: "Inter"
  foregroundColor: {rgbColor: {red: 1, green: 1, blue: 1}}
  alignment: "START"
```

### Subtitle
```
add_multiple_text_boxes:
  text: "Subtitle text here"
  fontSize: 12, fontFamily: "Inter"
  foregroundColor: {rgbColor: {red: 0.7, green: 0.7, blue: 0.7}}
  alignment: "START"
```

### Numbered Circle
```
add_shape: ELLIPSE
  width: 22, height: 22
  text: "1", fontSize: 10, bold: true, fontFamily: "Inter"
  foregroundColor: {rgbColor: {red: 1, green: 1, blue: 1}}
  alignment: "CENTER"

format_shape:
  fillColor: {rgbColor: {red: 0.91, green: 0.15, blue: 0.09}}
```

### Bullet Point
```
add_shape: ELLIPSE
  width: 8, height: 8

format_shape:
  fillColor: {rgbColor: {red: 0.91, green: 0.15, blue: 0.09}}
```

### Divider Line (stays RECTANGLE, not rounded)
```
add_shape: RECTANGLE
  width: 660 (or section width), height: 2

format_shape:
  fillColor: {rgbColor: {red: 0.18, green: 0.18, blue: 0.18}}
```

### Badge/Pill (Rounded)
```
add_shape: ROUND_RECTANGLE
  width: 60, height: 16
  text: "LABEL", fontSize: 8, bold: true, fontFamily: "Inter"
  foregroundColor: {rgbColor: {red: 0.91, green: 0.15, blue: 0.09}}
  alignment: "CENTER"

format_shape:
  fillColor: {rgbColor: {red: 0.14, green: 0.08, blue: 0.07}}
  outline: {color: {rgbColor: {red: 0.91, green: 0.15, blue: 0.09}}, weight: 1}
```

### Page Number
```
add_multiple_text_boxes:
  text: "2" (slide number as string)
  fontSize: 8, fontFamily: "Inter"
  foregroundColor: {rgbColor: {red: 0.45, green: 0.45, blue: 0.45}}
  alignment: "END"
  x: 680, y: 385, width: 20, height: 15
```
Add to every content slide. Skip on Title/Cover (slide 1) and Closing (last slide).

## Shape Usage Rules

| Shape | When to Use |
|-------|------------|
| `ROUND_RECTANGLE` | Cards, badges, highlighted boxes, metric containers |
| `RECTANGLE` | Divider lines, accent lines, progress bars |
| `ELLIPSE` | Numbered circles, bullet dots |

**Never use RECTANGLE for cards.** Always use ROUND_RECTANGLE for a modern, premium feel.

## Build Process

### Step 1: Create the Presentation
```
mcp__google-slides__create_presentation
  title: "[Description] -- Adobe"
```
Save the returned presentationId.

### Step 2: Get First Slide ID
```
mcp__google-slides__get_presentation
  presentationId: [from step 1]
```

### Step 3: Set Background
```
mcp__google-slides__set_slide_background
  presentationId: [id]
  slideId: [first slide objectId]
  backgroundColor: {rgbColor: {red: 0.07, green: 0.07, blue: 0.07}}
```

### Step 4: Build Content
1. Background cards/shapes first (they layer behind)
2. Text boxes on top
3. Accent elements (bullets, badges) last
4. Page number last (bottom-right)

**Layout tips:**
- Left margin: 30pt
- Header: label y:5, title y:26, subtitle y:58
- Content starts: y:85
- Card padding: ~15pt internal
- Gap between cards: ~10pt
- Full-width content: 660pt wide (30pt margins each side)
- Page number: x:680, y:385 (skip on first and last slides)

### Step 5: Additional Slides
```
mcp__google-slides__create_slide
  presentationId: [id]
```
Repeat Steps 3-4 for each new slide.

### Step 6: Return the URL
```bash
open "https://docs.google.com/presentation/d/[presentationId]/edit"
```

## Known Gotchas

- **Empty text strings crash**: NEVER use `text:""` in text boxes. The API throws "object has no text" when styling. Always use actual text or skip the text box.
- **Outline weight must be >= 1**: `weight: 0` causes an error. Use `weight: 1` or omit outline entirely.
- **`set_element_position` has y:20 floor**: The MCP clamps y values to minimum 20pt. To place elements above y:20, use `batch_update` with `updatePageElementTransform` (ABSOLUTE mode, translateY in EMU: 1pt = 12700 EMU).
- **No configurable corner radius**: ROUND_RECTANGLE uses Google's default. Looks clean but you can't adjust it.
- **No gradients**: Shapes only support solid fills.
- **No rgba transparency**: Approximate translucent colors as solid dark/light variants.
- **Text wrapping**: Text boxes auto-wrap. Set widths carefully to control line breaks.
- **`get_slide` strips text**: Returns shapes and transforms but no text content. Use `get_thumbnail` to verify slides visually.

## User Input

The user's request: $ARGUMENTS

Now create the Google Slides presentation. Build it natively with ROUND_RECTANGLE shapes and text boxes for maximum editability. Set the background color, use the brand colors, use the standard header block, add page numbers, and aim for a clean professional layout. Open the Google Slides URL in the browser when done.
