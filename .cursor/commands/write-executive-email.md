# write-executive-email

Draft or refine an executive-level email using Wes Kao-style frameworks.

## When user invokes /write-executive-email

1. **Use any context provided** — e.g. pasted thread, bullet points, or "I need to tell [X] that [Y]".
2. **If context is missing:** Ask briefly for purpose, audience, and main points or draft.
3. **Apply these principles:**
   - **Sales, then logistics:** Lead with why it matters (to them / to the business); 30–60 sec context before details.
   - **Conciseness = density:** One clear outcome; 2–3 supporting points; no filler.
   - **Signposting:** Use "First…", "The ask:", "As a next step…" so the reader can scan.
   - **MOO:** Address the most obvious objection in one line if relevant.
   - **Managing up:** State recommendation + brief evidence; don’t only ask "what should I do?"
   - **Strategy, not self-expression:** Keep only what drives the decision or action.
4. **Deliver:** A ready-to-send draft (subject + body), with optional 1–2 line note on which principles were applied. Tone: executive, crisp, direct.

## Output format

- Short paragraphs or bullets; subject line that states the ask or main point.
- Match user’s communication style (see `System/user-profile.yaml` → communication) when known; default professional casual, balanced.
