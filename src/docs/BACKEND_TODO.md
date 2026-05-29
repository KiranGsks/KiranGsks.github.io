# Backend integration checklist

## API endpoints (planned)

| Endpoint | Purpose | Replaces |
|----------|---------|----------|
| `GET /vehicles/catalog?year=&make=&model=` | Cascading year/make/model/trim | `src/data/catalog.ts` |
| `GET /vehicles/lookup?registration=` | Registration → vehicle match | `src/data/registrationLookup.ts` |
| `POST /sessions/vehicle` | Persist confirmed vehicle after user confirms | React Router `location.state` / `sessionStorage` |

## Vehicle confirm payload

After the user confirms a vehicle, send something like:

```json
{
  "vehicleId": "string",
  "year": 2024,
  "make": "Toyota",
  "model": "Camry",
  "trim": "XLE",
  "registration": "ABC123",
  "flowMode": "new | existing"
}
```

Store the returned `sessionId` and use it for the air-setup phase instead of passing full vehicle objects only in the client.

## Authentication (later)

- Not required for v1 prototype.
- Air setup / technician workflows will likely need auth before production.
- Gate `/air-setup` and beyond behind login when backend is ready.

## Error handling

- Replace mock delays with real loading states; keep `LoadingPlaceholder` for slow lookups.
- Show retry UI on network failure for registration lookup.
- Add an error boundary around route outlets for unexpected API errors.
- Validate API responses against `Vehicle` type (or OpenAPI-generated types).

## Client changes when wiring APIs

1. Create `src/api/vehicleApi.ts` with fetch wrappers.
2. Swap `catalog.ts` getters for API calls (consider caching per step).
3. Swap `lookupByRegistration` for real lookup.
4. On confirm, `POST /sessions/vehicle` then navigate with `sessionId`.
5. Remove or narrow `sessionStorage` usage once server session exists.
