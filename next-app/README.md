
# InsightBoard — Business Analytics Dashboard

A responsive analytics application developed using React,
TypeScript and Next.js App Router.

InsightBoard demonstrates interactive business dashboards,
user management interfaces, data visualization, API
integration and accessible application design.

## Project Purpose

Provide a practical analytics interface where users can
explore business metrics, inspect demonstration user
records, and customize dashboard preferences.

## Features

- Business KPI dashboard and revenue trend chart
- Interactive chart period selection
- User directory with search, filtering and sorting
- Dynamic user-details pages
- Saved dashboard preferences
- Browser-persistent metric watchlist
- Feedback form with validation and simulated submission
- Loading, empty, error and retry states
- Responsive desktop and mobile interfaces

## Technology

- Next.js 16 App Router
- React and TypeScript
- CSS
- Next.js Route Handlers
- DummyJSON demonstration API
- React Context and localStorage
- Node.js smoke tests
- Vitest tests retained for React V1

## Application Routes

| Route | Purpose |
| --- | --- |
| / | Analytics dashboard |
| /dashboard | Redirect to dashboard home |
| /users | User directory |
| /users/[id] | Individual user details |
| /settings | Dashboard preferences |
| /api/users | Server-side user API |
| /api/users/[id] | Server-side user details API |

## Architecture

Browser
  |
Next.js App Router
  |
Server-rendered route wrappers
  |
Interactive Client Components
  |
Next.js API Route Handlers
  |
DummyJSON external demonstration API

The application validates upstream data before returning
normalized records through its own API routes.

## State Management

React Context stores dashboard preferences.

Browser localStorage preserves preferences and watchlist
entries on the current device.

User directory data is fetched through Next.js API routes
and supports loading, error and retry behavior.

## Testing

The original React V1 application has 37 passing tests.

The Next.js V2 application includes eight HTTP smoke tests
covering important routes, redirects and invalid API IDs.

Additional manual testing covers dashboard interactions,
navigation, saved settings and mobile layout.

## Getting Started

From this next-app directory:

    npm ci
    npm run dev

Open http://localhost:3000

## Production Build

    npm run lint
    npm run build
    npm run start

Run the smoke suite in a separate terminal while
the application server is running:

    npm run test:smoke

## Design Decisions

- Preserve the original React V1 implementation and Git history.
- Keep interactive UI in Client Components.
- Use Next.js Route Handlers for external API integration.
- Validate user data on the server and client boundaries.
- Restore localStorage preferences after hydration.
- Preserve the existing dark enterprise design.
- Avoid unnecessary shared caching for the user API.

## Known Limitations

- Dashboard business metrics are demonstration values.
- DummyJSON records are demonstration users.
- The feedback form simulates submission.
- Watchlist and preferences are stored locally.
- No production authentication or permanent database.
- The external API requires network connectivity.
- Automated tests do not guarantee full accessibility.

## Project History

React V1 was developed first and is preserved in the
repository root.

Next.js V2 was introduced on a separate migration branch.

See [Migration Notes](../DAY39_MIGRATION.md).

## Screenshots

See the [existing screenshot collection](../docs/screenshots/).

Screenshots should be refreshed using the deployed Next.js
version during the final showcase.

## Author

Hasitha Gayan
SLIIT Information Technology Undergraduate
Artificial Intelligence Specialization
