
# InsightBoard

Professional Business Analytics Dashboard

## Overview

InsightBoard is a responsive business analytics
dashboard built with React and TypeScript.

The project demonstrates reusable component
architecture, interactive data management,
accessible forms, asynchronous operations,
type safety and professional development practices.

## Project Status

- Major Project: 02 of 05
- Started: 19 November 2026
- Development Roadmap: Day 24–40
- Status: In Development
- Current Milestone: Accessible Feedback System

## Current Features

### Dashboard

- Responsive statistics cards
- Business performance overview using demo data
- Show and hide percentage changes
- Show and hide statistics
- Persistent display preferences
- Reset preferences

### Interactive Watchlist

- Add, delete, pause and resume metrics
- Search metrics
- Filter by status
- Alphabetical sorting
- Automatically calculated summary counts
- Empty-state handling
- Duplicate and empty name validation
- Persistent browser storage
- Reset watchlist

### Feedback and Support

- Controlled multi-field feedback form
- Name, email, category and message fields
- Type-safe form state
- Required-field validation
- Email format validation
- Name and message length validation
- Whitespace handling
- Live character counter
- Field-specific validation errors
- Automatic focus on the first invalid field
- Accessible labels and error associations
- Reusable FormField component
- Asynchronous submission simulation
- Idle, pending, success and failure states
- Duplicate submission prevention
- Retry support
- Input preservation after failed submissions
- Automatic form reset after success
- Responsive desktop and mobile layouts

### User Experience

- Native project information modal
- Escape key dialog support
- Keyboard-accessible forms
- Responsive CSS Grid and Flexbox layouts
- Visible keyboard focus indicators
- Custom application branding

### Learning Exercise

- Interactive React counter
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
    │   │   ├── ProjectInfoDialog.css
    │   │   ├── FeedbackForm.tsx
    │   │   ├── FeedbackForm.css
    │   │   └── FormField.tsx
    │   ├── data/
    │   │   └── dashboardStats.ts
    │   ├── services/
    │   │   └── feedbackService.ts
    │   ├── types/
    │   │   ├── dashboard.ts
    │   │   └── feedback.ts
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

- App: Dashboard preferences and modal state
- Layout: Shared application structure
- Header: Application identity
- Card: Reusable content container
- StatCard: Dashboard statistics
- Button: Typed reusable button
- Counter: Primitive state practice
- Watchlist: Interactive metric management
- ProjectInfoDialog: Native modal synchronization
- FeedbackForm: Form state and submission lifecycle
- FormField: Reusable field presentation
- validateFeedback: Independent validation logic
- feedbackService: Simulated asynchronous service

## State Management

React useState manages primitive, object
and array state.

State updates are immutable.

Search results, sorted records, validation
errors and summary counts are derived during
rendering instead of being duplicated in state.

React Effects synchronize external browser
systems, including localStorage, native
dialog behavior and input focus.

## Feedback Submission Flow

    User Input
        |
        v
    Controlled Form State
        |
        v
    Validation Function
        |
        +-- Invalid --> Field Errors and Focus
        |
        v
    Pending Submission
        |
        v
    Simulated Async Service
        |
        +-- Success --> Clear Form
        |
        +-- Failure --> Preserve Form and Retry

The service simulates a 1.5-second delay.

Use fictional test data only.

- test@example.com: Simulated success
- fail@example.com: Simulated failure

No feedback is transmitted, stored or emailed.

## Browser Storage

Dashboard preferences and Watchlist records
are synchronized with localStorage.

Saved records are validated before use.

The application handles missing data,
invalid JSON, incorrect property types,
duplicate identifiers and storage failures.

Invalid stored data falls back to defaults.

Feedback information is not persisted.

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

### Day 24 — React Foundation

- Reusable components
- TypeScript props and interfaces
- Component composition
- Responsive dashboard layout

### Day 25 — Interactive Dashboard

- React state and typed events
- Immutable state updates
- Persistent preferences and Watchlist
- Search, sorting and filtering
- React DevTools and Profiler

### Day 26 — Accessible Forms

- Controlled multi-field forms
- TypeScript validation utilities
- Generic field update function
- Field-specific accessible errors
- Reusable form-field component
- Automatic invalid-field focus
- Asynchronous submission states
- Duplicate submission protection
- Responsive form styling

## Quality Assurance

- Clean dependency installation
- Oxlint code quality checks
- TypeScript compilation
- Vite production builds
- Manual functional testing
- Validation boundary testing
- Keyboard navigation testing
- Responsive layout testing
- Submission success and failure testing

## Technical Challenges

### React Render Purity

Moved the current-year calculation outside
the Layout component to resolve a lint warning.

### Corrupted Browser Data

Implemented validation and fallback defaults
to recover from invalid localStorage data.

### Derived Data

Calculated filtered records, summary counts
and form errors from existing state to avoid
unnecessary synchronization Effects.

### Duplicate Submissions

Combined submission state and an immediate
ref-based lock to prevent overlapping
asynchronous operations.

### Windows Dependency File Lock

A running Node.js process prevented npm ci
from replacing a native dependency file.

Stopping the remaining Node.js process
resolved the EPERM installation error.

## Planned Features

- Routing and detail pages
- Dashboard charts
- Users and orders pages
- API integration
- Loading and error states
- Automated behavioral tests
- Next.js migration
- Tailwind CSS
- Production deployment

## Current Limitations

- Dashboard statistics use demonstration data.
- Watchlist statuses are user-managed labels.
- Preferences and Watchlist records are local.
- Feedback submission is simulated.
- Real backend validation is not implemented.
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
