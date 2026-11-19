
# InsightBoard

Professional Business Analytics Dashboard

## Overview

InsightBoard is a responsive, data-driven business
analytics dashboard built with React and TypeScript.

The project demonstrates component architecture,
accessible forms, asynchronous programming,
client-side routing, shared state management
and external API integration.

## Project Status

- Major Project: 02 of 05
- Started: 19 November 2026
- Development Roadmap: Day 24-40
- Status: In Development
- Current Milestone: API-Powered Dashboard

## Current Features

### Dashboard

- Responsive business statistics cards
- Demonstration business performance metrics
- Show and hide statistics
- Show and hide percentage changes
- Persistent display preferences
- Project information modal

### Interactive Watchlist

- Add, delete, pause and resume metrics
- Search, filter and sort records
- Derived summary counts
- Empty-state handling
- Duplicate and empty name validation
- Persistent browser storage
- Reset Watchlist

### Feedback and Support

- Controlled multi-field form
- Type-safe validation utilities
- Required-field and length validation
- Basic email format validation
- Accessible labels and field errors
- Automatic invalid-field focus
- Reusable FormField component
- Live character counter
- Simulated asynchronous submission
- Idle, pending, success and failure states
- Duplicate submission protection
- Input preservation on failure
- Automatic reset on success

### API-Powered User Directory

- External DummyJSON API integration
- Up to 20 fetched user records
- Runtime API response validation
- Normalized user records
- Dynamic user details pages
- Account role summary cards
- Case-insensitive name and email search
- Account role filtering
- Alphabetical and numerical sorting
- Derived result counts
- Clear filters and refresh controls
- Loading skeleton/message behavior
- Empty API and empty search states
- Error handling and retry functionality
- Missing-user handling
- Obsolete request cancellation

### Routing and Settings

- React Router client-side navigation
- Shared navigation and layout
- Active navigation styles
- Dynamic route parameters
- Unknown-route handling
- Shared Preferences Context
- Persistent dashboard settings
- Reset preferences to defaults

### User Experience

- Responsive CSS Grid and Flexbox
- Keyboard-accessible controls
- Visible focus indicators
- Reduced-motion-aware loading spinner
- Escape key modal support

### Learning Exercise

A temporary Counter component demonstrates
fundamental React state management.

## Technology Stack

- React
- TypeScript
- React Router
- Vite
- CSS
- Fetch API
- AbortController
- DummyJSON REST API
- Oxlint
- Node.js
- npm
- Git and GitHub
- React Developer Tools
- Browser localStorage

See [versions.md](./versions.md) for exact
technology versions.

## Application Routes

| Route | Description |
| --- | --- |
| / | Dashboard overview |
| /users | API-powered user directory |
| /users/:id | Individual user details |
| /settings | Shared display preferences |
| * | Page not found |

User details are independently fetched using
the route identifier.

## Project Structure

    insightboard/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   │   ├── PreferencesProvider.tsx
    │   │   └── preferencesContext.ts
    │   ├── data/
    │   │   ├── dashboardStats.ts
    │   │   └── users.ts
    │   ├── hooks/
    │   │   └── useAsyncData.ts
    │   ├── pages/
    │   │   ├── DashboardPage.tsx
    │   │   ├── UsersPage.tsx
    │   │   ├── UserDetailsPage.tsx
    │   │   ├── UsersPage.css
    │   │   ├── UsersFilters.css
    │   │   ├── SettingsPage.tsx
    │   │   └── SettingsPage.css
    │   ├── services/
    │   │   ├── feedbackService.ts
    │   │   └── userService.ts
    │   ├── types/
    │   │   ├── dashboard.ts
    │   │   ├── feedback.ts
    │   │   ├── user.ts
    │   │   └── apiUser.ts
    │   ├── utils/
    │   │   ├── validateFeedback.ts
    │   │   └── filterUsers.ts
    │   ├── App.tsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.tsx
    ├── package.json
    ├── package-lock.json
    ├── versions.md
    └── README.md

## Application Architecture

    App
      └── PreferencesProvider
          └── BrowserRouter
              └── Shared DashboardLayout
                  ├── Header
                  ├── Navigation
                  ├── Outlet
                  │   ├── DashboardPage
                  │   ├── UsersPage
                  │   ├── UserDetailsPage
                  │   └── SettingsPage
                  └── Footer

## API Integration

Data source:

https://dummyjson.com/docs/users

Endpoints:

- GET /users?limit=20
- GET /users/:id

The API provides fictional demonstration users.

The service selects and validates the required
user fields before passing normalized data
to React components.

HTTP errors and malformed data are handled
explicitly.

A missing user returns a dedicated
User Not Found state.

## API Data Flow

    User Action or Route Change
                |
                v
          useAsyncData
                |
                v
          userService
                |
                v
         External REST API
                |
                v
      Validate HTTP and JSON
                |
                v
        Normalize Records
                |
                v
         React State Update
                |
                v
       Search / Filter / Sort
                |
                v
         Render Components

The reusable asynchronous Hook manages
loading, success and error states.

AbortController cancels obsolete requests
during Effect cleanup.

Aborted requests are prevented from updating
the current UI.

Retry attempts and loader identities are
checked before displaying stored results.

## State Management

### Local State

Feature-specific state remains inside
its corresponding component.

Examples include feedback inputs, Watchlist,
search filters, modal visibility and Counter.

### Shared Context

PreferencesProvider owns display preferences.

DashboardPage and SettingsPage consume
the same values through usePreferences.

### Derived Data

Search results, role counts, sorted records
and validation errors are derived from
existing data instead of duplicated in state.

The filterUsers utility does not mutate
the original API array.

### External State Libraries

Redux Toolkit and Zustand are possible future
options for more complex shared state.

They are not currently required.

## Browser Storage

Display preferences and Watchlist records
are persisted through localStorage.

Stored data is validated before use.
Invalid data falls back to defaults.

Feedback and API user records are not
persisted in browser storage by the app.

## Feedback Submission

The feedback service simulates a
1.5-second network delay.

Use fictional test data only.

- test@example.com: Simulated success
- fail@example.com: Simulated failure

No feedback is transmitted, stored or emailed.

## Getting Started

### Requirements

- Node.js 24.19.0
- npm 11.17.0

### Install Dependencies

    npm ci

### Development Server

    npm run dev

### Code Quality

    npm run lint

### Production Build

    npm run build

### Production Preview

    npm run preview

Open the URL displayed in the terminal.

Windows PowerShell users may use npm.cmd
instead of npm when required.

## Development Milestones

### Day 24 - React Foundation

- Typed reusable components
- Props and component composition
- Responsive dashboard layout

### Day 25 - Interactive Dashboard

- React state and typed events
- Immutable state updates
- Persistent Watchlist and preferences
- Search, filtering and sorting
- React DevTools and Profiler

### Day 26 - Accessible Forms

- Controlled multi-field forms
- Independent validation utilities
- Accessible error handling
- Asynchronous submission states
- Duplicate submission protection

### Day 27 - Routing and Context

- React Router integration
- Shared layouts and navigation
- Dynamic user details routes
- Missing-record handling
- Shared preferences provider
- Functional Settings page

### Day 28 - API Integration

- Reusable API service
- Runtime response validation
- API data normalization
- Generic asynchronous React Hook
- Loading, empty, success and error states
- Retry and refresh functionality
- Search, role filtering and sorting
- Request cancellation
- Chrome Network inspection
- API response overrides for testing

## Quality Assurance

Development checks:

- Clean dependency installation
- Oxlint
- TypeScript compilation
- Vite production build

Manual test scenarios:

- Dashboard and navigation regression
- Controlled form validation
- Direct URL navigation and refresh
- Responsive layouts and keyboard controls
- Successful API responses
- Empty API responses
- Malformed API records
- Offline errors and retry
- Missing user identifiers
- Request cancellation
- Combined search and filters

Automated behavioral tests are planned.

## Technical Challenges

### Render Purity

Moved the current-year calculation outside
Layout to resolve a React purity warning.

### Invalid Browser Data

Implemented validation and fallback defaults
for corrupted localStorage records.

### Duplicate Submissions

Used pending state and a ref-based lock
to prevent overlapping submissions.

### Windows Dependency File Lock

Resolved an EPERM installation error by
stopping Node.js processes before reinstalling.

### Shared State Ownership

Moved display preferences into Context
to avoid duplicate state across pages.

### API Response Validation

Validated unknown JSON data before converting
it into typed application records.

### Request Race Conditions

Used AbortController, Effect cleanup and
request identity checks to protect against
obsolete asynchronous results.

### Empty API Responses

Used Chrome Local Overrides to simulate
an empty users array and verify zero counts.

## Deployment Considerations

BrowserRouter requires SPA fallback support
from the production hosting server.

Direct routes must work without previous
client-side navigation.

## Planned Features

- Dashboard charts
- Orders and additional data screens
- Automated behavioral tests
- Next.js migration
- Tailwind CSS
- Production deployment

## Current Limitations

- Dashboard statistics use demo data.
- The user directory uses fictional API data.
- Only up to 20 users are loaded at a time.
- Filters operate on the loaded records.
- API availability depends on DummyJSON.
- User roles are not authorization permissions.
- Watchlist statuses are user-managed labels.
- Feedback submission is simulated.
- Authentication is not implemented.
- Report export is not implemented.
- Counter is a temporary learning exercise.

## Live Demo

Coming after production deployment.

## Screenshots and Demonstration

Project screenshots and a demonstration
video will be added during development.

## Developer

Developed by Hasitha Gayan.

Part of an intensive AI and Full-Stack
Web Development learning roadmap.
