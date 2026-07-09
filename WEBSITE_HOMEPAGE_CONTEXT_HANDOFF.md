# UniPDI Context Handoff for Website Homepage Update

## Purpose of this file

Use this document as a ready-to-share context brief for another agent/repo that will update the Roku Games website homepage to include UniPDI information.

---

## Project snapshot

- **Project name:** UniPDI Web App
- **Current deployment (testing):** https://roko.co.in/pdi-testing/
- **Core value proposition:** AI-powered used-vehicle buying assistant for cars and bikes, focused on reducing fraud risk and helping buyers make safer decisions.
- **Primary market:** India first, but architecture is designed to be locale-aware and globally extensible.

---

## One-line description (homepage-ready)

**UniPDI is a guided AI inspection and decision assistant that helps used car and bike buyers spot red flags, run structured checks, and evaluate if a deal is fair.**

---

## Core product elements (what to communicate on homepage)

1. **Guided inspection flow**
   - Vehicle selection by registration or manual year/make/model/variant
   - Time-based tracks: Quick Scan, Standard Check, Deep Dive
   - Checklist execution with pass/fail/skip and progress tracking

2. **Risk & red-flag awareness**
   - Suspicious pricing warnings
   - Scam-pattern awareness
   - Odometer/age mismatch style checks

3. **Deal intelligence**
   - Market-range context
   - Fair/overpriced/too-cheap style verdict

4. **Vehicle knowledge support**
   - Vehicle-specific context for common issues and inspection priorities
   - General automotive Q&A (roadmapped/partial)

5. **Cross-device usability**
   - Responsive app designed for desktop, tablet, and mobile
   - Intended for on-site use during physical vehicle inspection

---

## Frontend implementation status (current repo)

### Implemented

- React + TypeScript app with route-based flows
- Main routes for:
  - Home, auth/account/pricing
  - Garage add/view vehicle
  - Inspection journey (vehicle info → track select → checklist)
  - Compare page
  - Settings page
- AI settings support in UI (credentials/config path)
- Placeholder route for general Q&A (not fully launched)

### Partially implemented / in progress

- Full polish of AI-driven used-car buying prompts
- Advanced pricing analysis UX depth
- Full red-flag analytics depth
- Q&A production experience

### User-facing maturity summary

- **Strong prototype / validation build** suitable for demonstrating core inspection flow and product direction.
- Some AI and backend-heavy capabilities are still in staged rollout.

---

## Backend status and roadmap

### Current backend mode (interim)

- AWS Bedrock + Claude used for AI inference in current prototype.
- Purpose: validate user experience and outputs before final backend architecture hardening.

### Planned backend API surface

- `/vehicles/catalog` (locale-aware vehicle catalog)
- `/vehicles/lookup` (registration lookup)
- `/locale/detect` (market detection)
- `/inspection/generate` (track-based checklist generation)
- `/analysis/pricing` (deal price analysis)
- `/analysis/red-flags` (fraud/risk signals)
- `/qa/ask` (vehicle Q&A)
- Session save/resume endpoints

### Long-term backend direction

- Move toward domain-specific/custom automotive model stack
- Keep fallback path to foundation model(s)
- Improve reliability and safety with constrained automotive scope

---

## Suggested homepage messaging blocks

### Hero

- **Headline:** “Buy used cars and bikes with confidence.”
- **Subheadline:** “UniPDI guides your inspection, flags risky deals, and helps you decide faster with AI-assisted insights.”
- **CTA:** “Try UniPDI Demo” (link to testing URL)

### Feature highlights

- Guided Inspection Tracks (10 / 30 / 60 min)
- Red Flag Alerts
- Fair Price Insight
- India-first, Global-ready vehicle intelligence

### Trust / positioning copy

- “Built for real-world, on-location inspections.”
- “Designed for both first-time buyers and experienced enthusiasts.”

---

## Short copy variants for cards/snippets

- “Structured checks, not guesswork.”
- “Spot fraud signals before you pay.”
- “Know if the asking price is fair.”
- “Use at the seller’s location on phone or tablet.”

---

## Technical context for external agent

- Frontend stack: React 19 + TypeScript + Vite + React Router
- Data/auth direction includes Supabase usage patterns
- AI integration currently uses AWS Bedrock as interim inference backend
- Existing deployment helper script builds and pushes test site updates

---

## Deployment and repo coordination notes

- Current test site is served under `/pdi-testing/` path.
- Existing script in this repo (`deploy-to-website.bat`) builds UniPDI and copies output into the website repo’s `pdi-testing` folder before git push.
- If homepage update is in a separate website repo, keep UniPDI section modular (component/section) so it can be updated without breaking other homepage blocks.

---

## Copy-paste brief for another agent

"Update the Roku Games homepage to include a new UniPDI section. Position UniPDI as an AI-powered used vehicle buying assistant (cars + bikes) that provides guided inspections, red-flag detection, and fair-price insights. Add hero-level mention + feature tiles + CTA to `https://roko.co.in/pdi-testing/`. Keep tone practical and trust-focused. India-first but globally extensible messaging preferred."

---

## Source references inside this repo

- Product overview: `README.md`
- Vision and personas: `docs/PRODUCT_VISION.md`
- Backend roadmap: `src/docs/BACKEND_TODO.md`
- Route map and current feature exposure: `src/routes/AppRoutes.tsx`
- Deployment script to website repo: `deploy-to-website.bat`

