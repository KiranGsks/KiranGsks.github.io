# Project Aspirations — UniPDI

## What This Project Is

UniPDI is a **universal vehicle inspection and buying assistant app** for consumers navigating the used car and bike market in India. It helps buyers perform structured pre-purchase inspections, flags red flags (suspicious pricing, too-good-to-be-true deals), and provides AI-powered guidance tailored to specific vehicle makes, models, and known quirks.

The app is designed to be **approachable for novice users** — someone buying their first used car should be able to open this app and immediately understand what to check, what to look for, and what to avoid.

Currently the app is a **front-end prototype** using AWS Bedrock as the AI backend. The long-term vision is a custom domain-specific model trained via additive reinforcement learning.

---

## Vision & Goals

### 1. The "Everything App" for Used Vehicle Buying

- **Scope**: Cars and bikes (motorcycles/scooters). Not tractors, trucks, or commercial vehicles — those may come later.
- **Location-aware**: The app adapts to the user's market — vehicle catalog, pricing, registration lookup, and known issues all change based on location. India is the first market; the architecture supports expansion to Brazil, France, USA, or any country.
- Help buyers sort through options, understand fair market pricing, and identify red flags.
- Provide vehicle-specific inspection checklists dynamically generated based on the exact make/model/year/variant.
- Flag deals that seem too good to be true (e.g., a 10-year-old VW Vento listed at ₹1.2L when market pays significantly more — likely a scam to create urgency).

### 2. Fresh, Intuitive UX — Not an "Option Train"

- The app must feel **fresh and modern**, not like a boring form wizard.
- Designed for **novice users** who have never inspected a car before.
- No cramming AI where it is not needed — AI powers the backend intelligence, but the UI stays clean and human-friendly.
- Dynamically generated buttons and options based on the vehicle context (e.g., selecting "Ford Figo" shows realistic Indian variants like LXi, ZXi, Titanium — not US trims).
- Always provide a manual entry fallback for niche/rare vehicles.

### 3. Multi-Track Inspection Depth

Users have different amounts of time with a vehicle. The app offers **multiple inspection tracks**:

| Track | Use Case | Coverage |
|-------|----------|----------|
| **Quick Scan** | User is in a hurry, doing a first look | Critical red flags only (5-10 items) |
| **Standard Check** | Typical inspection visit | Important mechanical + cosmetic checks (20-30 items) |
| **Deep Dive** | User has extended time with the vehicle | Exhaustive check including niche items like boot lamp, volume dial, specific known issues for that model |

The most critical items appear in the Quick Scan; deeper tracks add progressively more specific and vehicle-particular checks.

### 4. Vehicle-Specific Intelligence

Different cars have different quirks. The AI generates checklists that account for:
- Known issues for that specific model/year (e.g., VW Vento DSG gearbox issues, Hyundai i20 diesel injector problems)
- Features that should be present for that variant
- Common fraud patterns for that vehicle segment
- Market-appropriate pricing context

### 5. Red Flag Detection & Deal Analysis

- Warn users about pricing anomalies (too cheap = likely scam or hidden problems)
- Identify urgency tactics sellers use (cash-only deals, pressure to decide immediately)
- Provide market price context so buyers know what's fair

### 6. Universal Platform — Responsive Design

| Platform | Priority | Notes |
|----------|----------|-------|
| **Desktop browser** | Primary (for testing and daily use) | Full real estate, side panels, detailed views |
| **iPad / Tablet** | High priority | Ideal inspection companion — take it to the car |
| **Smartphone** | Supported | Compact layout, still fully functional |

The UI must **adapt gracefully**:
- On phones: single-column, touch-friendly, large tap targets
- On tablets/iPads: utilize extra space for side-by-side panels, richer detail views
- On desktop: full dashboard experience with all information visible

---

## Scope Boundaries

### In Scope
- Cars (hatchbacks, sedans, SUVs, MPVs)
- Bikes (motorcycles, scooters)
- **Location-adaptive**: catalog, pricing, registration lookup, and market context change per user's country/region
- **India first**: Initial development prioritizes Indian market (₹ pricing, Indian makes/models, RTO/Vahan registration lookup)
- **Globally extensible**: Architecture supports adding any market (Brazil, France, USA, etc.) via locale-specific data modules
- Used vehicle buying assistance
- Pre-purchase inspection checklists
- Red flag / scam detection
- General vehicle Q&A (maintenance, common issues, buying advice)

### Out of Scope (for now)
- Tractors, trucks, commercial vehicles, autorickshaws
- New vehicle PDI (original app concept — may revisit)
- Selling assistance (focus is on the buyer)
- Insurance or financing workflows
- Marketplace / listing aggregation

---

## Backend Architecture Vision

### Phase 1: AWS Bedrock (Current)
- Use existing Bedrock tokens/credentials for AI inference
- Claude model generates inspection checklists and vehicle intelligence
- Frontend sends vehicle context → receives structured JSON responses
- Good enough for internal testing and validating the UX

### Phase 2: Custom Domain Model (Long-term)
- Build a proprietary model trained exclusively on automotive/vehicle domain data
- **Truncated scope**: model only knows about cars, bikes, inspections, pricing, mechanical systems
- **Additive reinforcement loop**: 
  1. New request comes in
  2. Observe how the frontier model (Bedrock/Claude) handles it
  3. Use that response as training signal to add knowledge to the custom model
  4. Over time, the custom model becomes self-sufficient for common queries
- Eventually replace Bedrock calls with the custom model for cost efficiency and latency

---

## Roadmap (Aspirational)

| Phase | Description | Status |
|-------|-------------|--------|
| **Phase 1** | Rewrite UI for consumer used-car buying flow | 🔲 Next |
| **Phase 2** | Vehicle selection with Indian market catalog (cars + bikes) | 🔲 Planned |
| **Phase 3** | Multi-track inspection checklist generation via Bedrock | 🔲 Planned |
| **Phase 4** | Red flag detection and deal analysis features | 🔲 Planned |
| **Phase 5** | Registration number auto-fetch (RTO/Vahan integration) | 🔲 Planned |
| **Phase 6** | General vehicle Q&A assistant | 🔲 Future |
| **Phase 7** | Custom domain model with additive reinforcement learning | 🔲 Future |
| **Phase 8** | Bike-specific flows and inspection checklists | 🔲 Future |

---

## Technical Aspirations

- **React 19** with modern hooks and router patterns (React Router v7)
- **Vite 8** for fast development and optimized production builds
- **TypeScript** for end-to-end type safety
- **Responsive-first design** — CSS that adapts from phone → tablet → desktop
- **AWS Bedrock** as interim AI backend (already integrated)
- **Component library** approach — reusable UI primitives that feel fresh, not enterprise-boring
- **Offline-capable** inspection checklists (once generated, usable without internet)
- **Session management** — save inspection progress, resume later

---

## Design Philosophy

1. **Clarity over cleverness** — A first-time car buyer should understand every screen
2. **Progressive disclosure** — Show what matters now, reveal depth on demand
3. **Vehicle-aware UI** — Buttons, options, and content adapt to the specific car/bike
4. **No unnecessary AI** — AI powers the intelligence layer; the UI stays human and predictable
5. **Trust signals** — When flagging a red flag, explain WHY so the user learns

---

## Summary

UniPDI aspires to be the **go-to companion app for anyone buying a used car or bike in India**. It combines structured inspection workflows, vehicle-specific intelligence, scam detection, and general automotive Q&A — all wrapped in a clean, approachable interface that works on any device. The AI is invisible to the user but powers everything behind the scenes.
