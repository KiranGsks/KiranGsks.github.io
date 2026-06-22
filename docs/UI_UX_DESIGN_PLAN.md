# UI/UX Design Plan — UniPDI

## Design Principles

1. **Fresh, not corporate** — Modern, clean aesthetic; not an enterprise form wizard
2. **Progressive disclosure** — Show only what's needed now; reveal depth on demand
3. **Touch-first, mouse-friendly** — Large tap targets, but works great with a mouse too
4. **Adaptive layout** — Same app, different experiences based on screen size
5. **Confidence-building** — Every screen should make the user feel more informed

---

## Responsive Layout Strategy

### Breakpoints

| Breakpoint | Target | Layout Strategy |
|------------|--------|-----------------|
| `< 480px` | Small phones | Single column, stacked cards, bottom navigation |
| `480px – 768px` | Large phones / small tablets | Single column with wider cards, optional side hints |
| `768px – 1024px` | iPad / tablets | Two-column where useful, side panel for context |
| `> 1024px` | Desktop / large tablets | Full dashboard, persistent sidebar, rich detail panels |

### Phone Layout (< 768px)
```
┌─────────────────────┐
│  Header / Back      │
├─────────────────────┤
│                     │
│  Main Content       │
│  (full width)       │
│                     │
│  Cards stack        │
│  vertically         │
│                     │
├─────────────────────┤
│  Bottom Action Bar  │
└─────────────────────┘
```

### Tablet Layout (768px – 1024px)
```
┌─────────────────────────────────┐
│  Header / Navigation            │
├────────────────┬────────────────┤
│                │                │
│  Main Content  │  Context Panel │
│  (60-65%)      │  (35-40%)      │
│                │                │
│  Selection     │  Vehicle info  │
│  or Checklist  │  Tips / Notes  │
│                │                │
├────────────────┴────────────────┤
│  Action Bar                     │
└─────────────────────────────────┘
```

### Desktop Layout (> 1024px)
```
┌──────────────────────────────────────────────┐
│  Top Bar: Logo | Vehicle Context | Settings  │
├─────────┬────────────────────┬───────────────┤
│         │                    │               │
│  Side   │  Main Content      │  Detail /     │
│  Nav    │  (Checklist /      │  AI Panel     │
│         │   Selection)       │               │
│  Steps  │                    │  Tips         │
│  or     │                    │  Known Issues │
│  Menu   │                    │  Pricing      │
│         │                    │               │
├─────────┴────────────────────┴───────────────┤
│  Status Bar: Progress | Save | Export        │
└──────────────────────────────────────────────┘
```

---

## Screen Inventory

### 1. Home / Landing
- App branding and tagline
- Two primary actions: "Inspect a Car" / "Inspect a Bike"
- Optional: "Ask a Question" quick entry
- Settings gear icon (for AI configuration)
- Clean, inviting, minimal

### 2. Vehicle Type Selection
- Car vs Bike (large visual cards)
- On tablet/desktop: shown as hero cards side by side
- On phone: stacked vertically

### 3. Vehicle Identification
- **Option A**: Enter registration number (primary, fastest)
  - Large text input with Indian plate format hint
  - "Look up" button → auto-fetches vehicle details
- **Option B**: Manual selection (fallback)
  - Step flow: Year → Make → Model → Variant
  - Each step shows options as a grid of tappable cards
  - "Can't find your vehicle? Enter manually" always visible

### 4. Vehicle Confirmation
- Summary card showing identified vehicle
- Key specs displayed (fuel type, transmission, engine)
- "This is correct" / "Not my vehicle" actions
- On tablet: shows vehicle image placeholder alongside details

### 5. Track Selection
- Three cards representing inspection depth:
  - Quick Scan — icon: stopwatch, "~10 minutes"
  - Standard Check — icon: clipboard, "~30 minutes"  
  - Deep Dive — icon: magnifying glass, "~60 minutes"
- Brief description of what each covers
- Recommendation based on context (if first time, suggest Standard)

### 6. Inspection Checklist (Main Working Screen)
- Category tabs or accordion sections
- Each item shows:
  - Check label (clear, jargon-free)
  - Brief description of what to look for
  - Pass / Fail / Skip buttons
  - Optional: photo attachment, notes
- Progress indicator (X of Y completed)
- On tablet/desktop: category list on left, items on right
- On phone: single scrollable list with category headers

### 7. Inspection Summary / Report
- Overall score or health indicator
- Failed items highlighted with severity
- Known issues that were confirmed
- Pricing context (if deal info was provided)
- Red flags summary
- "Share" or "Save" actions

### 8. Deal Analysis (Optional Screen)
- Input: asking price, odometer, owner count
- Output: market range, verdict, red flags
- Visual gauge or scale showing where the price falls

### 9. Settings
- AWS Bedrock credentials (existing)
- Preferred language (future)
- Saved vehicles (future)

---

## Component Design Language

### Cards
- Rounded corners (12-16px radius)
- Subtle shadow or border
- White/light background on colored page background
- Generous padding (16-24px)
- Clear hierarchy: title → description → action

### Buttons
- Primary: solid fill, high contrast, rounded
- Secondary: outlined or ghost style
- Large touch targets (minimum 44x44px, prefer 48x48px)
- Clear active/pressed states

### Colors (Direction)
- Primary: A trustworthy blue or teal (not corporate navy)
- Accent: Warm orange or amber for CTAs and highlights
- Success: Green for pass states
- Warning: Amber/orange for caution
- Danger: Red for failures and critical red flags
- Background: Light warm gray or off-white (not stark white)
- Dark mode: Consider for v2

### Typography
- Clean sans-serif (Inter, Plus Jakarta Sans, or similar)
- Clear size hierarchy:
  - Page title: 24-28px
  - Section header: 18-20px
  - Body/labels: 14-16px
  - Captions: 12-13px
- Good line height for readability (1.4-1.6)

### Icons
- Consistent icon set (Lucide, Phosphor, or similar)
- Used for vehicle types, inspection categories, status indicators
- Not overused — text labels always accompany icons

### Motion
- Subtle transitions between steps (slide or fade)
- Loading states with skeleton screens (not spinners)
- Micro-interactions on button press and card selection
- No gratuitous animation

---

## Dynamic UI Generation

The app dynamically generates UI elements based on vehicle context:

### Example: Ford Figo (India) Selected
```
Year: 2016
Make: Ford
Model: Figo
→ Variants shown: Ambiente, Trend, Titanium, Titanium+
→ Fuel options: Petrol 1.2L Ti-VCT, Diesel 1.5L TDCi
→ Transmission: Manual (all), Automatic (Titanium+ only)
```

### Example: Inspection items adapt
- Titanium+ variant → includes checks for: touchscreen infotainment, rear parking sensors, push-button start, climate control
- Ambiente variant → skips those, focuses on: manual AC, basic audio, power windows (front only)

### Always Available
- "Enter model manually" text input for vehicles not in catalog
- "Add custom check item" during inspection
- "I'm not sure" option on any inspection item

---

## Navigation Pattern

### Phone
- Bottom tab bar (if needed) or simple back/forward flow
- Swipe gestures for moving between inspection items (optional)
- Floating action button for primary action on checklist screen

### Tablet / Desktop
- Top navigation bar with breadcrumb-style progress
- Side panel for supplementary information
- Keyboard shortcuts for power users (desktop)

---

## Accessibility Considerations

- Minimum contrast ratio 4.5:1 for text
- All interactive elements keyboard-accessible
- Screen reader labels on icons and status indicators
- Touch targets minimum 44x44px
- No information conveyed by color alone (use icons + text)
- Reduced motion option respects `prefers-reduced-motion`

---

## Offline Behavior

Once a checklist is generated:
- Cache it locally (IndexedDB)
- User can complete the inspection without internet
- Sync results when back online
- Show clear "offline" indicator but don't block usage

---

## Implementation Notes

### CSS Strategy
- CSS custom properties for theming
- Container queries where supported (progressive enhancement)
- Flexbox + Grid for layouts
- No heavy CSS framework — keep it light and custom
- Consider Tailwind CSS for rapid development (discuss with team)

### Component Architecture
- Atomic design: atoms → molecules → organisms → pages
- Shared components in `src/components/ui/`
- Layout components in `src/components/layout/`
- Feature-specific components co-located with their pages
- All components responsive by default
