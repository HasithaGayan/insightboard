
# InsightBoard

Professional Business Analytics Dashboard

## Overview

InsightBoard is a responsive business analytics
dashboard built with React and TypeScript.

The project demonstrates reusable component
architecture, interactive data management,
type safety, responsive design and
professional software development practices.

## Project Status

- Major Project: 02 of 05
- Started: 19 November 2026
- Development Roadmap: Day 24–40
- Status: In Development
- Current Milestone: Interactive React Dashboard

## Current Features

### Dashboard

- Responsive statistics cards
- Business performance overview using demo data
- Show and hide percentage changes
- Show and hide statistics
- Persistent display preferences
- Reset preferences

### Interactive Watchlist

- Add custom metric names
- Pause and resume metrics
- Delete metrics
- Search metrics
- Filter by monitoring status
- Sort alphabetically
- Automatically calculated summary counts
- Empty-state handling
- Duplicate and empty name validation
- Persistent browser storage
- Reset watchlist

### User Experience

- Native project information modal
- Keyboard-accessible form submission
- Escape key dialog support
- Responsive desktop, tablet and mobile CSS
- Validation feedback
- Custom application branding
- Keyboard focus indicators

### Learning Exercise

- Interactive counter demonstrating React state
- Increment, decrement and reset operations
- Negative value prevention

The counter is a temporary learning exercise.

## Technology Stack

- React
- TypeScript
- Vite
- CSS
- Oxlint
- Node.js
- npm
- Git and GitHub
- React Developer Tools
- Browser localStorage

See [versions.md](./versions.md) for exact
technology versions.

## Project Structure

    insightboard/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   ├── Header.tsx
    │   │   ├── Layout.tsx
    │   │   ├── StatCard.tsx
    │   │   ├── Counter.tsx
    │   │   ├── Watchlist.tsx
    │   │   ├── ProjectInfoDialog.tsx
    │   │   └── ProjectInfoDialog.css
    │   ├── data/
    │   │   └── dashboardStats.ts
    │   ├── types/
    │   │   └── dashboard.ts
    │   ├── App.tsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.tsx
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── versions.md
    └── README.md

## Application Architecture

InsightBoard uses component-based architecture
with local state ownership and reusable UI
components.

- App: Dashboard preferences and modal state
- Layout: Shared application structure
- Header: Application identity
- Card: Reusable content container
- StatCard: Dashboard statistics
- Button: Reusable typed button
- Counter: Primitive state practice
- Watchlist: Interactive metric management
- ProjectInfoDialog: Native modal synchronization

## State Management

React useState manages primitive, object
and array state.

Objects and arrays are updated immutably
using the spread operator, map and filter.

Search results, sorted records and summary
counts are derived during rendering instead
of being stored in redundant state.

## Data Flow

    User Interaction
          |
          v
    Typed Event Handler
          |
          v
    State Update
          |
          v
    React Re-render
          |
          v
    Updated User Interface

## Browser Storage

Dashboard preferences and Watchlist records
are synchronized with localStorage using
React Effects.

Saved records are validated before use.

The application handles:

- Missing saved data
- Invalid JSON
- Incorrect property types
- Invalid Watchlist records
- Duplicate identifiers
- Storage access failures

Invalid saved data falls back to defaults.

## Getting Started

### Requirements

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

## Quality Checks

### Day 24

- TypeScript compilation: Passed
- Production build: Passed
- Lint warnings: 0
- Lint errors: 0

### Day 25

- TypeScript compilation: Passed
- Production build: Passed
- Lint warnings: 0
- Lint errors: 0
- Functional testing: Manually tested
- Corrupted preferences recovery: Tested
- React DevTools profiling: Completed

## Debugging and Challenges

### React Render Purity

The Layout component originally calculated
the current year during rendering.

Moving the calculation outside the component
resolved the lint warning.

### Corrupted Browser Data

Invalid JSON was deliberately stored in
localStorage to test application recovery.

The application caught the parsing error,
restored default preferences and continued
working without crashing.

### Derived Data

Search results, sorting and summary counts
are calculated from existing state.

This reduces state duplication and avoids
unnecessary synchronization Effects.

### React Rendering

React DevTools Profiler was used to inspect
Counter state updates.

The selected development recording showed
that Counter caused the update without
re-rendering the Watchlist.

## Planned Features

- Interactive dashboard charts
- Users and orders pages
- Routing and detail pages
- API integration
- Loading and error states
- Automated behavioral tests
- Next.js migration
- Tailwind CSS
- Production deployment

## Current Limitations

- Business statistics use demonstration data.
- Watchlist statuses are user-managed labels,
  not real-time monitoring of business metrics.
- Data is stored locally in the browser.
- Report export is not implemented.
- Authentication is not implemented.
- Automated behavioral tests are upcoming.
- The counter is a temporary learning feature.

## Live Demo

Coming after production deployment.

## Screenshots and Demonstration

Project screenshots and a demonstration video
will be added during development.

## Developer

Developed by Hasitha Gayan.

Part of an intensive AI and Full-Stack
Web Development learning roadmap.
