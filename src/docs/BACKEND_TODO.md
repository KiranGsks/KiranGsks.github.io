# Backend Integration Checklist

## Current State: AWS Bedrock (Interim)

The app currently uses AWS Bedrock with Claude models for AI inference. This is the testing/validation backend while the frontend UX is developed.

### Existing Integration
- [x] AWS Signature V4 signing in browser
- [x] Bedrock InvokeModel API calls
- [x] Settings page for AWS credentials
- [x] Prompt templates for inspection checklist generation
- [ ] Adapt prompts for used-car buying context (not PDI technician context)
- [ ] Add pricing analysis prompts
- [ ] Add red flag detection prompts
- [ ] Add vehicle-specific known-issues prompts

---

## API Endpoints (Planned)

| Endpoint | Purpose | Replaces |
|----------|---------|----------|
| `GET /vehicles/catalog?type=car&make=&year=&locale=` | Location-aware vehicle catalog (cars + bikes) | `src/data/catalog.ts` |
| `GET /vehicles/lookup?registration=&country=` | Country-specific registration lookup (RTO/Vahan for IN, DVLA for UK, etc.) | `src/data/registrationLookup.ts` |
| `GET /locale/detect` | Auto-detect user's market/country for catalog and pricing context | New |
| `POST /inspection/generate` | Generate inspection checklist for a vehicle + track level | Bedrock direct call |
| `POST /analysis/pricing` | Analyze if a deal price is fair vs market (locale-aware) | New |
| `POST /analysis/red-flags` | Evaluate a listing for scam indicators | New |
| `POST /qa/ask` | General vehicle Q&A | New |
| `POST /sessions/save` | Save inspection progress | `sessionStorage` |
| `GET /sessions/:id` | Resume a saved inspection | `sessionStorage` |

### Locale/Market Architecture

The app is **location-aware and globally extensible**. India is the first market, but the architecture supports any country:

- Vehicle catalog data is organized per locale (e.g., `catalog-IN.ts`, `catalog-BR.ts`, `catalog-FR.ts`)
- Registration lookup routes to country-specific APIs
- Pricing context uses local currency and market data
- Known issues may vary by market (climate, road conditions, fuel quality)
- User can manually select their market if auto-detection is wrong

---

## Vehicle Catalog — Market-Specific Data

### India (First Market)

The initial catalog covers Indian-market vehicles:

### Cars
- Maruti Suzuki (Alto, WagonR, Swift, Baleno, Dzire, Ciaz, Brezza, Ertiga, XL6, Grand Vitara)
- Hyundai (i10, i20, Venue, Creta, Verna, Alcazar, Tucson)
- Tata (Tiago, Altroz, Nexon, Harrier, Safari, Punch)
- Mahindra (Bolero, Scorpio, XUV300, XUV700, Thar)
- Kia (Sonet, Seltos, Carens)
- Toyota (Glanza, Urban Cruiser, Innova, Fortuner)
- Honda (City, Amaze, Elevate, WR-V)
- Volkswagen (Polo, Vento, Taigun, Virtus)
- Skoda (Rapid, Slavia, Kushaq)
- Ford (Figo, Aspire, EcoSport, Endeavour) — discontinued but still in used market
- Renault (Kwid, Triber, Kiger)
- Nissan (Magnite)
- MG (Hector, Astor, ZS EV)
- Jeep (Compass, Meridian)

### Bikes
- Hero (Splendor, HF Deluxe, Passion, Xtreme, XPulse)
- Honda (Activa, Shine, Unicorn, Hornet, CB series)
- Bajaj (Pulsar, Dominar, Avenger, CT series)
- TVS (Apache, Jupiter, Ntorq, Raider)
- Royal Enfield (Classic, Bullet, Meteor, Hunter, Himalayan)
- Yamaha (FZ, R15, MT-15, Ray ZR)
- KTM (Duke 125/200/390, RC series)
- Suzuki (Access, Gixxer, Burgman)

### Variant/Trim Data
Each model needs year-wise variant data:
- Example: Maruti Swift 2018 → LXi, VXi, ZXi, ZXi+
- Example: Hyundai Creta 2020 → E, EX, S, SX, SX(O)

### Future Markets (Architecture Ready)
- **Brazil**: Fiat, Chevrolet, VW, Hyundai, Toyota (local models like Fiat Strada, VW Gol)
- **France**: Renault, Peugeot, Citroën, Dacia, VW
- **USA**: Ford, Chevrolet, Toyota, Honda, RAM (different trims than India)
- **UK**: Vauxhall, Ford, VW, BMW, Audi (DVLA registration lookup)

Each market gets its own catalog module, pricing data source, and registration lookup integration.

---

## Inspection Checklist Generation

### Request Payload
```json
{
  "vehicle": {
    "type": "car",
    "year": 2018,
    "make": "Maruti Suzuki",
    "model": "Swift",
    "variant": "ZXi",
    "fuelType": "petrol",
    "transmission": "manual",
    "registration": "KA-01-AB-1234"
  },
  "inspectionTrack": "quick | standard | deep",
  "context": {
    "askingPrice": 450000,
    "odometerReading": 45000,
    "ownerCount": 2,
    "sellerNotes": "optional free text from user about the deal"
  }
}
```

### Response Structure
```json
{
  "vehicleSummary": "2018 Maruti Swift ZXi — expected features include...",
  "inspectionTrack": "standard",
  "categories": [...],
  "knownIssues": [
    "2018 Swift ZXi: Check for steering column noise at low speeds",
    "Common rust spots near rear wheel arches in coastal areas"
  ],
  "pricingInsight": {
    "estimatedMarketRange": { "low": 400000, "high": 520000 },
    "askingPriceVerdict": "fair",
    "notes": "Price is within expected range for this year/variant/km"
  },
  "redFlags": []
}
```

---

## Red Flag Detection

### Input Signals
- Asking price vs estimated market value
- Seller behavior patterns (cash-only, urgency pressure, no test drive)
- Odometer vs age mismatch
- Multiple owners in short time
- Insurance lapse history
- Accident/flood damage indicators

### Output
```json
{
  "riskLevel": "low | medium | high | critical",
  "flags": [
    {
      "type": "pricing_anomaly",
      "severity": "high",
      "message": "Asking price ₹90,000 is 70% below market value for this vehicle",
      "explanation": "A 2014 VW Vento in running condition typically sells for ₹2.5-3.5L. This price suggests possible fraud, stolen vehicle, or undisclosed major damage."
    }
  ],
  "recommendation": "Proceed with extreme caution. Verify RC transfer history and get a mechanic inspection before any payment."
}
```

---

## Long-Term: Custom Domain Model

### Architecture
```
User Request → API Gateway → Custom Model (primary)
                                ↓ (if uncertain)
                           Bedrock/Claude (fallback)
                                ↓
                           Response logged
                                ↓
                           Training pipeline (additive reinforcement)
                                ↓
                           Custom model updated
```

### Training Data Sources
- Vehicle specifications databases (Indian market)
- Common issues forums (Team-BHP, car forums)
- Service manual excerpts
- Pricing data from OLX, CarDekho, Cars24 historical
- Scam pattern databases
- Mechanic knowledge (curated)

### Model Constraints
- Domain-truncated: only knows about cars, bikes, inspections, pricing, mechanical systems
- Refuses to answer non-automotive queries
- Trained to be conservative with pricing estimates (better to say "uncertain" than give wrong number)

---

## Authentication (Later)

- Not required for v1 prototype
- May add optional accounts for saving inspection history
- No paywall for core features initially

---

## Error Handling

- Replace mock delays with real loading states; keep `LoadingPlaceholder` for slow lookups
- Show retry UI on network failure
- Graceful degradation: if AI is unavailable, show a generic checklist for that vehicle category
- Validate API responses against TypeScript types
- Cache vehicle catalog data aggressively (it changes infrequently)

---

## Client Changes When Wiring APIs

1. Create `src/api/vehicleApi.ts` with fetch wrappers for catalog and lookup
2. Create `src/api/inspectionApi.ts` for checklist generation with track selection
3. Create `src/api/analysisApi.ts` for pricing and red flag analysis
4. Swap `catalog.ts` with Indian market data (initially can be a larger static file, then API)
5. Swap `lookupByRegistration` for real RTO/Vahan lookup
6. Add offline caching for generated checklists (IndexedDB or localStorage)
7. Add session save/resume for in-progress inspections
