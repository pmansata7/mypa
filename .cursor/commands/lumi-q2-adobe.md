# Q2 FY26 Jira Tickets Status

Fetch status and summary for all Q2 FY26 Jira tickets and provide an executive status report formatted for Slack.

## Tickets to Check

1. CME-14844
2. CMEINTAKE-9509
3. CMEINTAKE-8675
4. CMEINTAKE-8417
5. CME-15316
6. CMEINTAKE-5366
7. CMEINTAKE-8440
8. CMEINTAKE-9112
9. CMEINTAKE-9468
10. CMEINTAKE-9580
11. CMEINTAKE-5476
12. CMEINTAKE-9496
13. CMEINTAKE-7262
14. CMEINTAKE-9139
15. CMEINTAKE-6746
16. CMEINTAKE-9456
17. CMEINTAKE-5980
18. CMEINTAKE-6455
19. CMEINTAKE-8471
20. CMEINTAKE-8468
21. CMEINTAKE-8769
22. CMEINTAKE-8958
23. CMEINTAKE-8485

## Slack Output Format

Format the entire output as a single code block that can be copy-pasted directly into Slack. Use Slack-compatible formatting:

```
:clipboard: *Q2 FY26 Tickets Status* - [DATE]

*Quick Stats*
• Total: X tickets
• Active: X | Blocked: X | Not Started: X
• Health: :large_green_circle: / :large_yellow_circle: / :red_circle:

---

:rotating_light: *ACTION REQUIRED* (X items)

*CMEINTAKE-XXXX* - Title
:x: _Why blocked:_ [reason]
:point_right: _Action:_ [who] needs to [do what]
:moneybag: _At risk:_ $XM ARR

---

:bar_chart: *Status Breakdown*
Ready for Review: X (XX%)
In Review: X (XX%)
On Hold: X (XX%)
Other: X (XX%)

---

:memo: *All Tickets*

:white_check_mark: *ACTIVE* (X)
• `CME-XXXX` Title - _Assignee_ - Status
  Brief 1-line summary

:pause_button: *BLOCKED* (X)  
• `CMEINTAKE-XXXX` Title - _Assignee_ - Status
  Brief 1-line summary

:hourglass: *NOT STARTED* (X)
• `CMEINTAKE-XXXX` Title - _Assignee_ - Status

---

:warning: *Unassigned* (X): CME-XXXX, CMEINTAKE-XXXX
```

## Slack Formatting Rules

1. Use Slack emoji codes: :clipboard: :rotating_light: :white_check_mark: :x: :warning: :moneybag: :bar_chart: :memo: :pause_button: :hourglass: :point_right: :large_green_circle: :large_yellow_circle: :red_circle:
2. Bold with *asterisks*
3. Italic with _underscores_  
4. Inline code with `backticks`
5. Use • for bullet points
6. Use --- for section dividers
7. NO markdown tables (Slack doesn't support them)
8. Keep lines short - Slack wraps poorly
9. Group related items together
10. Put the most important info (blockers) at top

## Instructions for AI

1. Fetch all tickets using jira_get_issue for each
2. Extract a 1-line summary from each ticket's description
3. Identify blocked tickets and determine specific action needed
4. Calculate status percentages  
5. Flag Critical/Major priority items with :rotating_light:
6. Note ARR impact where available
7. Output ONLY the Slack-formatted message (inside a code block so user can copy it)
8. Keep summaries to ONE short sentence max
