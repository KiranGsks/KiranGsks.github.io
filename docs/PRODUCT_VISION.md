# Product Vision — UniPDI

## One-Liner

**The trusted companion app for buying a used car or bike in India.**

---

## Problem Statement

Buying a used vehicle in India is stressful, opaque, and risky:

1. **Information asymmetry** — Sellers know the car's history; buyers are guessing
2. **Scam prevalence** — Too-good-to-be-true pricing, fake urgency, cash-only deals
3. **No structured process** — Most buyers don't know what to check beyond "does it start?"
4. **Vehicle-specific quirks** — Every model has known issues that only experienced owners know about
5. **Time pressure** — Buyers often have limited time with the vehicle and miss critical checks

---

## Solution

UniPDI provides:

### 🔍 Structured Inspection Checklists
- Dynamically generated based on exact make/model/year/variant
- Multiple depth tracks (Quick / Standard / Deep) based on available time
- Vehicle-specific items (known issues, model quirks, common failure points)

### 🚩 Red Flag Detection
- Price anomaly warnings (too cheap = suspicious)
- Seller behavior pattern recognition
- Odometer/age mismatch alerts
- Deal analysis with market context

### 🚗 Vehicle Intelligence
- **Location-aware** vehicle catalog (cars + bikes) — adapts to user's country/market
- Registration number → auto-fetch vehicle details (country-specific lookup)
- Variant-aware feature expectations
- Known issues database per model/year
- India prioritized first; architecture supports any market (Brazil, France, USA, etc.)

### 💬 General Q&A
- Ask anything about a vehicle
- Maintenance schedules, common problems, buying tips
- Powered by AI but constrained to automotive domain

---

## User Personas

### Persona 1: First-Time Buyer (Rahul, 24)
- Buying his first car (budget ₹3-5L)
- Knows nothing about car inspection
- Needs hand-holding through the process
- Wants to know "is this a good deal?"

### Persona 2: Experienced Buyer (Priya, 35)
- Buying her third car, upgrading
- Knows basics but wants a structured checklist
- Wants vehicle-specific known issues
- Uses the Deep Dive track

### Persona 3: Bike Enthusiast (Arjun, 22)
- Looking at used Royal Enfield / KTM
- Wants to check specific mechanical items
- Budget-conscious, needs pricing validation
- Uses phone at the seller's location

---

## Core User Flows

### Flow 1: Vehicle Selection

```
Start → Choose Type [Car / Bike]
  → Enter Registration Number (auto-fetch)
  OR
  → Manual Selection:
     → Year → Make → Model → Variant
     → Always: "Enter manually" fallback for rare vehicles
```

### Flow 2: Inspection Track Selection

```
Vehicle Confirmed → Choose Track:
  → Quick Scan (5-10 items, ~10 min)
  → Standard Check (20-30 items, ~30 min)  
  → Deep Dive (40-60 items, ~60 min)
```

### Flow 3: Inspection Execution

```
Track Selected → Checklist Generated
  → Category-by-category walkthrough
  → Each item: Pass / Fail / Skip
  → Fail items get flagged with notes
  → Progress saved automatically
  → Summary report at end
```

### Flow 4: Deal Analysis

```
Vehicle + Price entered → AI Analysis:
  → Market price range
  → Price verdict (too cheap / fair / overpriced)
  → Red flags if any
  → Recommendation
```

### Flow 5: General Q&A

```
Vehicle context (optional) → Ask a question
  → AI responds with automotive knowledge
  → Follow-up questions supported
  → Constrained to vehicle domain
```

---

## Feature Priority Matrix

| Feature | Priority | Phase | Notes |
|---------|----------|-------|-------|
| Vehicle selection (manual) | P0 | 1 | Year/Make/Model/Variant flow |
| Inspection checklist generation | P0 | 1 | Via Bedrock, multi-track |
| Responsive UI (phone + tablet + desktop) | P0 | 1 | Core requirement |
| Indian market vehicle catalog | P0 | 1 | Static data initially |
| Inspection execution (pass/fail/skip) | P0 | 1 | Interactive checklist |
| Registration number lookup | P1 | 2 | Country-specific (RTO/Vahan for India, DVLA for UK, etc.) |
| Deal pricing analysis | P1 | 2 | Market price comparison |
| Red flag detection | P1 | 2 | Scam pattern matching |
| Known issues per vehicle | P1 | 2 | Part of checklist generation |
| Save/resume inspections | P2 | 3 | Persistence layer |
| General vehicle Q&A | P2 | 3 | Chat interface |
| Bike-specific flows | P2 | 3 | Separate checklist templates |
| Offline checklist access | P3 | 4 | Cache generated lists |
| Custom domain model | P3 | 5 | Replace Bedrock |
| Inspection history/reports | P3 | 4 | Export/share results |

---

## What Makes This Different

1. **Vehicle-specific, not generic** — Not a one-size-fits-all checklist; tailored to the exact car
2. **Depth tracks** — Respects the user's time constraints
3. **Scam awareness** — Actively protects buyers from fraud
4. **Location-aware** — Adapts catalog, pricing, and known issues to the user's market (India first, globally extensible)
5. **Novice-friendly** — No jargon, clear explanations, guided process
6. **AI-powered but not AI-dependent** — Works even if AI is slow; core UX is deterministic

---

## Success Metrics (Future)

- User completes at least one full inspection checklist
- Red flag warnings prevent at least one bad purchase decision
- App is usable without any tutorial or onboarding
- Inspection can be completed in the time promised by the track level
- Users return for subsequent vehicle evaluations
