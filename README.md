
# InsightBoard

Professional Business Analytics Dashboard

## Overview

InsightBoard is a responsive, data-driven
business analytics dashboard built with
React and TypeScript.

The application demonstrates reusable
component architecture, accessible forms,
client-side routing, shared state,
external API integration, automated testing
and measured performance optimization.

## Project Status

- Major Project: 02 of 05
- Started: 19 November 2026
- Development Roadmap: Day 24-40
- Status: In Development
- Current Milestone: Testing and Quality Assurance

## Current Features

### Dashboard

- Responsive business statistics cards
- Demonstration business performance metrics
- Configurable statistics and percentage changes
- Persistent display preferences
- Project information modal
- Isolated modal state

### Interactive Watchlist

- Add, remove, pause and resume metrics
- Search, filter and sort records
- Derived summary counts
- Duplicate and empty name validation
- Empty-state handling
- Persistent browser storage
- Reset Watchlist

### Feedback and Support

- Controlled multi-field feedback form
- Independent TypeScript validation utilities
- Required-field and length validation
- Email format validation
- Accessible labels and error associations
- Automatic invalid-field focus
- Reusable FormField component
- Live character counter
- Simulated asynchronous submission
- Pending, success and failure states
- Duplicate submission protection
- Input preservation on failure
- Automatic reset on success

### API-Powered User Directory

- DummyJSON REST API integration
- Up to 20 fetched user records
- Runtime response validation
- Normalized user data
- Dynamic user details pages
- Account role summary cards
- Case-insensitive name and email search
- Role filtering
- Alphabetical and numerical sorting
- Derived results and summary counts
- Clear filters and refresh functionality
- Loading, success, empty and error states
- Retry functionality
- Missing-user handling
- Obsolete request cancellation

### Routing and Settings

- React Router client-side navigation
- Shared layout and navigation
- Active navigation indicators
- Dynamic route parameters
- Unknown-route handling
- Shared Preferences Context
- Persistent dashboard settings
- Reset preferences to defaults

### Accessibility

- Semantic navigation and form controls
- Accessible labels
- Field-specific validation errors
- Visible keyboard focus indicators
- Native dialog keyboard behavior
- Escape key modal support
- Reduced-motion-aware loading animation
- Programmatic focus after route changes
- Responsive desktop and mobile layouts

### Automated Testing

- Component rendering tests
- Form interaction tests
- Accessibility behavior tests
- API loading and error tests
- Search and filtering tests
- Runtime API validation tests
- Request cancellation tests
- Deterministic race-condition tests

## Technology Stack

### Application

- React
- TypeScript
- React Router
- Vite
- CSS
- Fetch API
- AbortController
- DummyJSON REST API
- Browser localStorage

### Development and Testing

- Node.js
- npm
- Oxlint
- Vitest 5.1.1
- React Testing Library
- Testing Library DOM
- Testing Library User Event
- Jest DOM
- jsdom
- React Developer Tools
- Git and GitHub

See [versions.md](./versions.md) and
package-lock.json for dependency versions.

## Application Routes

| Route | Description |
| --- | --- |
| / | Dashboard overview |
| /users | API-powered user directory |
| /users/:id | Individual user details |
| /settings | Shared display preferences |
| * | Page not found |

## Project Structure

    insightboard/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── DashboardActions.tsx
    │   │   ├── FeedbackForm.tsx
    │   │   ├── FeedbackForm.test.tsx
    │   │   ├── RouteContent.tsx
    │   │   ├── RouteContent.test.tsx
    │   │   ├── StatCard.tsx
    │   │   ├── StatCard.test.tsx
    │   │   └── Other reusable components
    │   ├── context/
    │   │   ├── PreferencesProvider.tsx
    │   │   └── preferencesContext.ts
    │   ├── data/
    │   ├── hooks/
    │   │   ├── useAsyncData.ts
    │   │   └── useAsyncData.test.tsx
    │   ├── pages/
    │   │   ├── DashboardPage.tsx
    │   │   ├── UsersPage.tsx
    │   │   ├── UsersPage.test.tsx
    │   │   ├── UserDetailsPage.tsx
    │   │   └── SettingsPage.tsx
    │   ├── services/
    │   │   ├── feedbackService.ts
    │   │   ├── userService.ts
    │   │   └── userService.test.ts
    │   ├── test/
    │   │   └── setup.ts
    │   ├── types/
    │   ├── utils/
    │   ├── App.tsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.tsx
    ├── package.json
    ├── package-lock.json
    ├── vite.config.ts
    ├── vitest.config.ts
    ├── versions.md
    └── README.md

## Application Architecture

    App
      └── PreferencesProvider
          └── BrowserRouter
              └── DashboardLayout
                  ├── Header
                  ├── Navigation
                  ├── RouteContent
                  │   └── Outlet
                  │       ├── DashboardPage
                  │       ├── UsersPage
                  │       ├── UserDetailsPage
                  │       └── SettingsPage
                  └── Footer

RouteContent manages keyboard focus when
the application pathname changes.

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

API documentation:

https://dummyjson.com/docs/users

The API provides fictional demonstration
user records.

AbortController and Effect cleanup prevent
obsolete requests from updating the current
application state.

## State Management

Feature-specific state remains local to
the component that needs it.

PreferencesProvider owns display preferences
shared between Dashboard and Settings.

Search results, validation errors and summary
counts are derived rather than duplicated.

Redux and Zustand are not currently required.

## Performance Optimization

React DevTools Profiler identified an
unnecessary rendering problem when opening
the project information modal.

Previously, DashboardPage owned modal state,
causing unrelated dashboard components
to participate in modal-related updates.

The modal state was moved into DashboardActions
using state colocation.

This narrows the update boundary without
introducing unnecessary memoization.

Baseline development Profiler measurement:

- Render duration: 7.9 ms
- Passive effects: 5.1 ms
- Component causing update: DashboardPage
- Watchlist participated in the render

The baseline is a single development
measurement, not a production benchmark.

The same interaction should be measured
after refactoring to quantify the improvement.

## Testing Strategy

Tests focus on user-visible behavior
and meaningful failure scenarios.

External API dependencies are mocked to
produce deterministic test results.

Deferred Promises simulate competing
asynchronous requests.

### Test Suite Inventory

| Suite | Tests |
| --- | ---: |
| StatCard | 3 |
| FeedbackForm | 5 |
| UsersPage | 8 |
| userService | 10 |
| useAsyncData | 3 |
| RouteContent | 2 |
| Total | 31 |

### Testing Coverage

- Component props and rendered output
- Required-field validation
- Invalid-field focus
- Accessible error associations
- Form reset behavior
- API loading and successful responses
- Empty API responses
- API failures and retry
- Search and role filtering
- Invalid response structures
- Duplicate user identifiers
- HTTP errors
- Missing user records
- Obsolete asynchronous responses
- Effect cleanup and cancellation
- Route-change focus management

Browser layout and keyboard behavior
also require manual verification.

## Browser Storage

Dashboard preferences and Watchlist
records are persisted in localStorage.

Stored values are validated before use.

Feedback and API user records are not
persisted by the application.

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

### Automated Tests

    npm test

### Test Watch Mode

    npm run test:watch

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

- TypeScript interfaces and typed props
- Reusable components
- Responsive dashboard

### Day 25 - Interactive Dashboard

- React state and typed events
- Immutable state updates
- Persistent preferences and Watchlist
- Search, filtering and sorting
- React DevTools and Profiler

### Day 26 - Accessible Forms

- Controlled forms
- Runtime validation
- Accessible error handling
- Asynchronous submission states
- Duplicate submission protection

### Day 27 - Routing and Context

- React Router integration
- Shared layouts
- Dynamic routes
- Missing-record handling
- Preferences Context

### Day 28 - API Integration

- Reusable API services
- Runtime response validation
- Generic asynchronous Hook
- Loading, empty and error states
- Search, filtering and sorting
- Stale-response protection

### Day 29 - Testing and Quality Assurance

- Vitest testing infrastructure
- React Testing Library
- Component and interaction tests
- Mocked API service tests
- Deterministic request-race tests
- React Profiler analysis
- State colocation
- Route focus management
- Accessibility regression tests

## Technical Challenges

- Resolved React render purity warnings.
- Recovered from corrupted localStorage data.
- Prevented overlapping feedback submissions.
- Resolved Windows dependency file locks.
- Centralized shared display preferences.
- Validated external JSON at the service boundary.
- Prevented stale asynchronous responses.
- Tested empty APIs using browser overrides.
- Reduced the scope of modal-related renders.
- Added route-change focus management.

## Deployment Considerations

BrowserRouter requires the production
hosting server to support SPA fallback.

Direct URLs must work without previous
client-side navigation.

## Planned Features

- Interactive dashboard charts
- Additional data-driven screens
- Dashboard presentation improvements
- Next.js migration
- Tailwind CSS
- Production deployment

## Current Limitations

- Dashboard statistics use demonstration data.
- User accounts are fictional API records.
- Filters operate on up to 20 loaded users.
- User roles are not authorization permissions.
- Feedback submission is simulated.
- Watchlist labels do not represent live monitoring.
- Authentication is not implemented.
- Report export is not implemented.
- Counter is a temporary learning exercise.
- Accessibility compliance is not fully audited.
- The application is not yet deployed.

## Live Demo

Coming after production deployment.

## Screenshots and Demonstration

Project screenshots and a demonstration
video will be added during development.

## Developer

Developed by Hasitha Gayan.

Part of an intensive AI and Full-Stack
Web Development learning roadmap.
