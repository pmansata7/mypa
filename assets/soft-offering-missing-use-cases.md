# Missing Use Cases — Soft Offering E2E (Product Team)

**Source:** Explore Soft Offering E2E Experience.pptx  
**Purpose:** Gaps to clarify or design for before locking discount approach and post-purchase behavior.

---

## Already Covered in Deck

- **Cancel:** APCC only (within/outside grace), both plans (within/outside grace)
- **Switch:** APCC → Ps
- **Renew:** Soft offer renewal price
- **Checkout:** One line, choose one or both, cart updates
- **Post-purchase:** Separate plan cards, each managed on its own
- **Discount options:** Account vs soft-offer vs product-level (3A pro-rated, 3B add-on)

---

## 1. Upgrade / Downgrade Within Soft Offer

| Use case | Open question |
|----------|----------------|
| Upgrade one plan (e.g. APCC tier or ACAI+ → higher tier) | Does soft offer stay intact? Is discount reapplied at new price? |
| Downgrade one plan (e.g. drop ACAI+, keep APCC) | Treated as “cancel ACAI+” or “downgrade”? Same ETF/refund rules as full cancel? |
| Downgrade both (e.g. soft offer to two lower tiers) | One transaction or two? How is discount handled on renewal? |

**Recommendation:** Define whether “downgrade one plan” is a distinct journey from “cancel one plan” for contract/ETF/refund.

---

## 2. Billing & Payment Failures

| Use case | Open question |
|----------|----------------|
| Card decline / failure on one plan only (e.g. APCC) | Does ACAI+ stay active? Retry logic for one vs both? Dunning per plan or combined? |
| Partial payment (e.g. only one plan charged) | Is soft offer considered “broken” immediately? Grace before revoking discount? |
| Refund request for one plan when both purchased | Refund at effective price or standard price? Who decides (policy vs system)? |

**Recommendation:** Document “soft offer broken” triggers (payment failure on one plan = broken? after how many retries?).

---

## 3. Add-Ons and Third Products

| Use case | Open question |
|----------|----------------|
| User has soft offer (APCC + ACAI+) and adds Ps (or another product) | Discount applies only to soft offer total; Ps at list price? Confirmed in deck but not in scenario matrix. |
| User has Ps only, then adds soft offer (APCC + ACAI+) | Cart and checkout flow; order of application of discount vs other promos. |
| Future: multiple soft offers on same account | Which combinations are allowed; how discounts stack or conflict. |

**Recommendation:** Add one scenario to the matrix: “Has soft offer; adds another product” (billing, invoice, renewal).

---

## 4. Trial and Re-Entry

| Use case | Open question |
|----------|----------------|
| Trial for one or both plans, then convert with soft offer discount | Eligibility (e.g. trial + add second at discount); first charge and proration. |
| User cancels soft offer, later re-subscribes to both | Same discount (win-back)? Or standard price only? |
| User had soft offer, churned; returns with one plan only | No soft offer; no open question, but good to state explicitly for support/ops. |

**Recommendation:** Clarify trial → soft offer conversion and win-back rules in “Acquisition” and “Renewal” sections.

---

## 5. Pause, Hold, and Plan Changes

| Use case | Open question |
|----------|----------------|
| Pause / hold one plan (if supported) | Does soft offer stay active? Discount retained? |
| Plan-level “switch” that isn’t APCC → Ps (e.g. ACAI+ → different add-on) | Same treatment as “Switch APCC to Ps” for contract and refund? |
| Consolidating two standalone plans into a soft offer post-purchase | Supported or not? If yes, discount applied retroactively or from next cycle? |

**Recommendation:** If pause/hold exists for any plan, add one row to post-purchase scenario table.

---

## 6. Invoicing and Tax

| Use case | Open question |
|----------|----------------|
| Invoice presentation | One line (“Soft offer – $25”) vs two lines (APCC $20, ACAI+ $10, discount -$5)? Per region/compliance. |
| Tax calculation | Discount applied before or after tax; by jurisdiction. |
| Credit memo / adjustment when one plan refunded | How discount is allocated (e.g. 3A vs 3B) and how it appears on memo. |

**Recommendation:** Align with Finance/Legal on invoice format and tax treatment for each discount option.

---

## 7. Regional, FX, and Eligibility

| Use case | Open question |
|----------|----------------|
| FX or regional price change during term | Effective price and discount in local currency; renewal at new FX. |
| User moves region mid-contract | Eligibility for soft offer / discount in new region; migration path. |
| Intro / regional pricing (e.g. first year discount) | Stacking with soft offer discount; order of application. |

**Recommendation:** Call out in “Scalability” (slide 5): FX, regional, and intro-pricing rules for soft offer.

---

## 8. Edge Flows in Checkout

| Use case | Open question |
|----------|----------------|
| User adds soft offer, removes one plan, then re-adds before submit | Discount appears/disappears correctly; no double discount or stuck state. |
| User has one plan in cart, adds second (soft offer) later in session | Cart and discount apply; confirmation email reflects soft offer. |
| Session timeout or abandon after adding soft offer | No purchase; no open question, but good for analytics (tag/track). |

**Recommendation:** Add 1–2 “cart state” test cases to acquisition checklist (add/remove/re-add; one then two).

---

## 9. Abuse and Compliance

| Use case | Open question |
|----------|----------------|
| User stacks multiple promos (e.g. soft offer + referral + seasonal) | Allowed combinations; cap or precedence rules. |
| Self-serve vs support-assisted cancel/refund | Same rules (effective price, ETF) in both channels; support tooling. |
| Legal copy and consent | Where “discount contingent on keeping both plans” is shown (checkout, T&C, post-purchase). |

**Recommendation:** Document “promo stack” rules and where contingent language appears (deck already flags compliance).

---

## 10. Renewal (Explicitly Called Out as Open)

| Use case | Open question |
|----------|----------------|
| Y1 soft offer discount: renewal in Y2 | Continue discount, step-down, or list price? Per option (2, 3A, 3B). |
| Auto-renew vs manual renew | Same price and discount behavior; consent and communication. |
| Renew one plan only (e.g. APCC) after soft offer broken in Y1 | Renew at standard APCC price; no residual discount. |

**Recommendation:** Resolve “Renew Soft offer” row and “Y1 only or permanent” in slide 6/7 and slide 12; document per option.

---

## Summary for Product

- **High impact, deck-adjacent:** Billing failure (one plan), refund (one plan at effective vs standard price), renewal (Y2 discount), upgrade/downgrade within soft offer.
- **Clarify in scenario matrix:** Add third product; trial → soft offer; “downgrade one plan” vs “cancel one plan.”
- **Cross-functional:** Invoice format and tax (Finance/Legal); promo stacking (Growth/Pricing); support-assisted flows (Ops).
- **Future-proof:** Multiple soft offers per account; regional/FX/intro pricing; pause/hold if product supports it.

Use this list to assign owners, add to backlog, and align with the chosen discount option (2, 3A, or 3B) before locking post-purchase behavior.
