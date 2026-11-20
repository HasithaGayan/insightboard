# Day 39 — InsightBoard React V1 to Next.js V2

## Preservation
The existing Vite app at the repository root stays intact. Its 37 passing Vitest tests are the regression baseline. All new code is in `next-app/` and should be committed only on branch `day39-next-migration`.

## Routes
- `/`: original dashboard, chart, watchlist and simulated feedback form
- `/dashboard`: redirects to `/`
- `/users`: original user directory with search, filtering, loading/empty/error/retry states
- `/users/[id]`: original user details with loading/error/not-found/retry states
- `/settings`: original persisted preferences
- `/api/users`, `/api/users/[id]`: Next.js server-side proxy to DummyJSON with runtime normalization

## Data and rendering decisions
Next.js Server Component route wrappers provide route metadata and URL-based routing. Existing interactive UI remains in Client Components, preserving features and observable behavior.

- Initial dashboard and navigation markup can render on the server.
- Preferences and watchlist begin with deterministic defaults during server rendering and hydrate saved browser data after mount, avoiding server/client hydration mismatches.
- DummyJSON is fetched on the server by Route Handlers; the browser requests `/api/users`, and both server and client validate responses.
- User APIs use `Cache-Control: no-store` so temporary data is not accidentally shared as a cached personalized response. This demo has no real authentication or private production user accounts.
- Feedback submission is still simulated, not sent to a backend. Watchlist mutations persist only in the current browser.
- `cacheComponents: false` during migration to retain well-understood caching semantics; it can be enabled in a separate future refactor.

## Quality checks
From the repository root:

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

From `next-app`:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run start
```

Check the original application visually at desktop and mobile sizes; test Users, User Details, Settings, Watchlist, Feedback, and navigation keyboard focus. Verify a failure condition for DummyJSON (or your network) yields an error and retry action.

## Current limitations
- No user authentication or real persistent database.
- Upstream API depends on internet access and its own availability.
- Chart and dashboard metrics are illustrative.
- The feedback form is a simulated mutation; watchlist changes remain browser-local.
- The V2 application needs new dedicated tests beyond the preserved React V1 suite before production release.
- The V2 layout has not yet undergone a measured Lighthouse or independent WCAG audit.

## Day 40 handoff
After Day 39 feature and test validation, merge V2 into main via PR without deleting V1. Deploy Vercel with `next-app` as the configured Root Directory, confirm production routes and errors, and document screenshots, case study, and a two-minute demo.
