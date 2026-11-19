
# InsightBoard

Professional Business Analytics Dashboard

## Overview

InsightBoard is a responsive multi-page business
analytics dashboard built with React and TypeScript.

The application demonstrates reusable component
architecture, interactive data management,
accessible forms, asynchronous operations,
client-side routing and shared state management.

## Project Status

- Major Project: 02 of 05
- Started: 19 November 2026
- Development Roadmap: Day 24–40
- Status: In Development
- Current Milestone: Multi-page Dashboard

## Current Features

### Dashboard

- Responsive business statistics cards
- Demonstration business performance data
- Show and hide statistics
- Show and hide percentage changes
- Persistent display preferences
- Native project information modal

### Interactive Watchlist

- Add and delete metrics
- Pause and resume metrics
- Search, filter and sort records
- Automatically calculated summary counts
- Empty-state handling
- Duplicate and empty name validation
- Persistent browser storage
- Reset Watchlist

### Feedback and Support

- Controlled multi-field feedback form
- TypeScript validation utilities
- Required-field and length validation
- Basic email format validation
- Accessible labels and field errors
- Automatic invalid-field focus
- Reusable FormField component
- Live character counter
- Idle, pending, success and failure states
- Simulated asynchronous submission
- Duplicate submission prevention
- Input preservation after failure
- Automatic reset after success

### User Directory

- Five fictional demonstration users
- Responsive user cards
- Active and inactive user summaries
- Dynamic user details pages
- Account role and status labels
- Missing-user handling

### Navigation and Settings

- React Router client-side navigation
- Shared application layout
- Active navigation styles
- Dynamic route parameters
- Unknown-route handling
- Shared Preferences Context
- Persistent dashboard settings
- Reset preferences to defaults

### User Experience

- Responsive CSS Grid and Flexbox layouts
- Keyboard-accessible controls
- Visible focus indicators
- Escape key modal support
- Custom application branding

### Learning Exercise

The dashboard includes a temporary Counter
component for demonstrating React state.

## Technology Stack

- React
- TypeScript
- React Router
- Vite
- CSS
- Oxlint
- Node.js
- npm
- Git and GitHub
- React Developer Tools
- Browser localStorage

See [versions.md](./versions.md) for
technology versions.

## Application Routes

| Route | Description |
| --- | --- |
| / | Dashboard overview |
| /users | User directory |
| /users/:id | Individual user details |
| /settings | Shared display preferences |
| * | Page not found |

The details page retrieves a record using
the route parameter rather than depending
on previous navigation history.

Invalid user identifiers display a
dedicated User Not Found message.

## Project Structure

    insightboard/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   ├── Header.tsx
    │   │   ├── Layout.tsx
    │   │   ├── StatCard.tsx
    │   │   ├── Navigation.tsx
    │   │   ├── Navigation.css
    │   │   ├── Counter.tsx
    │   │   ├── Watchlist.tsx
    │   │   ├── ProjectInfoDialog.tsx
    │   │   ├── ProjectInfoDialog.css
    │   │   ├── FeedbackForm.tsx
    │   │   ├── FeedbackForm.css
    │   │   └── FormField.tsx
    │   ├── context/
    │   │   ├── preferencesContext.ts
    │   │   └── PreferencesProvider.tsx
    │   ├── pages/
    │   │   ├── DashboardPage.tsx
    │   │   ├── UsersPage.tsx
    │   │   ├── UserDetailsPage.tsx
    │   │   ├── UsersPage.css
    │   │   ├── SettingsPage.tsx
    │   │   └── SettingsPage.css
    │   ├── data/
    │   │   ├── dashboardStats.ts
    │   │   └── users.ts
    │   ├── services/
    │   │   └── feedbackService.ts
    │   ├── types/
    │   │   ├── dashboard.ts
    │   │   ├── feedback.ts
    │   │   └── user.ts
    │   ├── utils/
    │   │   └── validateFeedback.ts
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
              └── DashboardLayout
                  ├── Header
                  ├── Navigation
                  ├── Outlet
                  │   ├── DashboardPage
                  │   ├── UsersPage
                  │   ├── UserDetailsPage
                  │   ├── SettingsPage
                  │   └── Not Found
                  └── Footer

Shared navigation and layout remain mounted
while the matched child route changes.

## State Management

### Local State

Feature-specific state remains local to the
relevant component.

Examples include Counter, Watchlist, feedback
form values and modal visibility.

Object and array state updates are immutable.

### Shared Context

PreferencesProvider owns dashboard display
preferences and their update functions.

DashboardPage and SettingsPage consume
the same values through usePreferences.

Context avoids duplicated preference state
and unnecessary prop drilling.

### External State Libraries

Redux Toolkit and Zustand may be useful
for more complex shared-state requirements.

They are not currently necessary for this
application's limited shared preferences.

### Derived Data

Filtered records, sorted records, summary
counts and validation errors are derived
from existing state.

Unnecessary synchronization Effects
are avoided.

## Browser Storage

Dashboard preferences and Watchlist
records are persisted using localStorage.

Saved data is validated before use.
Invalid data falls back to defaults.

Preferences remain compatible with
previous development milestones.

Feedback information is not persisted.
Unsaved local form state may reset when
navigating away from the dashboard.

## Feedback Submission

The asynchronous feedback service
simulates a 1.5-second network delay.

Use fictional test data only.

- test@example.com: Simulated success
- fail@example.com: Simulated failure

No feedback is transmitted, stored or emailed.

## Getting Started

### Development Environment

- Node.js 24.19.0
- npm 11.17.0

### Installation

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

## Deployment Considerations

BrowserRouter requires the production host
to support SPA fallback to index.html.

Direct URLs and page refreshes must work
without previous client-side navigation.

Live deployment is planned for a later
development milestone.

## Development Milestones

### Day 24 — React Foundation

- Typed reusable components
- Props and component composition
- Responsive dashboard layout

### Day 25 — Interactive Dashboard

- React state and typed events
- Immutable state updates
- Persistent preferences and Watchlist
- Search, filtering and sorting
- React DevTools and Profiler

### Day 26 — Accessible Forms

- Multi-field controlled forms
- Independent validation utilities
- Accessible error handling
- Asynchronous submission states
- Duplicate submission protection

### Day 27 — Routing and Context

- React Router integration
- Shared navigation and layout
- User directory and dynamic routes
- Missing-record and unknown-route handling
- Shared preferences provider
- Functional settings page
- Local and shared state boundaries

## Quality Assurance

- Clean dependency installation
- Oxlint checks
- TypeScript compilation
- Vite production builds
- Manual functional testing
- Validation boundary testing
- Keyboard accessibility testing
- Responsive layout testing
- Direct-route and refresh testing
- Shared-state synchronization testing

## Technical Challenges

### React Render Purity

Moved the current-year calculation outside
the Layout component to resolve a lint warning.

### Invalid Browser Data

Implemented saved-data validation and
fallback defaults for localStorage recovery.

### Duplicate Submissions

Combined pending state with a ref-based
lock to prevent overlapping operations.

### Windows Dependency File Lock

Resolved an EPERM installation error by
stopping remaining Node.js processes
before reinstalling dependencies.

### Shared State Ownership

Moved display preferences from the
DashboardPage into PreferencesProvider
to establish a single source of truth.

### Dynamic Route Validation

Matched route identifiers against the
demonstration dataset and handled
missing records without crashing.

## Planned Features

- API integration
- Loading, error and retry states
- Searchable user data
- Interactive dashboard charts
- Orders pages
- Automated behavioral tests
- Next.js migration
- Tailwind CSS
- Production deployment

## Current Limitations

- Statistics and user accounts use demo data.
- User roles are not authorization permissions.
- Watchlist statuses are user-managed labels.
- Feedback submission is simulated.
- Browser storage is local to each origin.
- Authentication is not implemented.
- Report export is not implemented.
- Automated behavioral tests are upcoming.
- Counter is a temporary learning exercise.

## Live Demo

Coming after production deployment.

## Screenshots and Demonstration

Screenshots and a demonstration video
will be added during development.

## Developer

Developed by Hasitha Gayan.

Part of an intensive AI and Full-Stack
Web Development learning roadmap.
