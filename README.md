# Vehicle identification app

React + TypeScript + Vite front end for a tablet-friendly vehicle identification flow. Uses mocked data only; see `src/docs/BACKEND_TODO.md` for planned API integration.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Sample registration plates

`ABC123`, `XYZ789`, `HONDA1`

## Routes

- `/` — New vs existing vehicle
- `/new/year` … `/new/confirm` — New vehicle cascade
- `/existing` — Search mode choice
- `/existing/model` | `/existing/registration` — Search paths
- `/existing/confirm` — Confirm detected vehicle
- `/air-setup` — Placeholder next phase
