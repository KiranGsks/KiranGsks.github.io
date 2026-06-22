# UniPDI — Used Vehicle Buying Assistant

AI-powered inspection and buying assistant for used cars and bikes. Helps buyers perform structured pre-purchase inspections, detect red flags, and make informed decisions.

**Universal app** — works on desktop, iPad/tablet, and smartphones. **Location-aware** — adapts vehicle catalog, pricing, and registration lookup to the user's market. India first, globally extensible.

---

## Quick Start (Local Development)

### 1. Open the project

```bash
code "h:\Projects\PDI Demo\unipdi-app"
```

Or: **File → Open Folder** → select `unipdi-app`.

### 2. Install and run

```bash
npm install
npm run dev
```

Vite prints a local URL, usually: **http://localhost:5173**

For tablet testing on the same Wi-Fi network, use your PC's LAN IP (e.g., `http://192.168.1.10:5173`).

### 3. Stop the server

**Ctrl+C** in the terminal.

---

## What This App Does

| Feature | Description |
|---------|-------------|
| **Vehicle Selection** | Identify a vehicle by registration number or manual year/make/model/variant selection |
| **Inspection Checklists** | AI-generated, vehicle-specific checklists with multiple depth tracks |
| **Red Flag Detection** | Warns about suspicious pricing, scam patterns, and too-good-to-be-true deals |
| **Deal Analysis** | Market price comparison and pricing verdict |
| **Vehicle Q&A** | Ask general questions about any car or bike |

### Inspection Tracks

| Track | Time | Coverage |
|-------|------|----------|
| Quick Scan | ~10 min | Critical red flags only |
| Standard Check | ~30 min | Important mechanical + cosmetic checks |
| Deep Dive | ~60 min | Exhaustive, vehicle-specific inspection |

---

## Target Platforms

| Platform | Status | Notes |
|----------|--------|-------|
| Desktop (Chrome/Edge) | ✅ Primary dev/test | Full dashboard layout |
| iPad / Tablet | 🎯 Target | Ideal inspection companion |
| Smartphone | ✅ Supported | Compact single-column layout |

---

## AI Backend

Currently uses **AWS Bedrock** (Claude) for AI inference. Configure credentials via the Settings gear icon in the app.

Long-term plan: custom domain-specific model (see [BACKEND_TODO.md](src/docs/BACKEND_TODO.md)).

---

## Project Structure

| Path | Purpose |
|------|---------|
| `src/pages/` | Screen components (Home, vehicle flows, inspection) |
| `src/components/` | Reusable UI primitives (buttons, cards, grids) |
| `src/api/` | AWS Bedrock client and prompt templates |
| `src/data/` | Vehicle catalog and registration lookup (mock) |
| `src/types/` | TypeScript type definitions |
| `src/hooks/` | Custom React hooks |
| `src/utils/` | Session management, settings, navigation helpers |
| `src/routes/` | React Router configuration |
| `docs/` | Product vision, UI/UX plan, deployment guide |

---

## Documentation

| Document | Description |
|----------|-------------|
| [ASPIRATIONS.md](ASPIRATIONS.md) | Project vision, goals, and roadmap |
| [docs/PRODUCT_VISION.md](docs/PRODUCT_VISION.md) | Detailed product vision, user personas, feature matrix |
| [docs/UI_UX_DESIGN_PLAN.md](docs/UI_UX_DESIGN_PLAN.md) | Responsive layout strategy, screen inventory, component design |
| [src/docs/BACKEND_TODO.md](src/docs/BACKEND_TODO.md) | Backend architecture, API endpoints, custom model roadmap |
| [docs/deployment.md](docs/deployment.md) | Deployment instructions for various hosts |

---

## NPM Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve production build locally |

---

## Tech Stack

- **React 19** + TypeScript
- **Vite 8** (build tool)
- **React Router v7** (navigation)
- **AWS Bedrock** (AI inference, interim)
- **CSS Custom Properties** (theming, responsive design)

---

## Requirements

- **Node.js** 20.19+ or 22.12+
- npm (comes with Node)
- AWS Bedrock credentials (for AI features — optional for UI development)
