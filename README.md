
# InsightBoard

Professional Business Analytics Dashboard

## Overview

InsightBoard is a responsive analytics dashboard
designed to present business performance through
reusable components, key statistics and clear
data visualization.

The project is being developed as a professional
frontend portfolio project, with a focus on
maintainability, accessibility, type safety
and software quality.

## Project Status

- Major Project: 02 of 05
- Started: 19 November 2026
- Development Roadmap: Day 24–40
- Status: In Development
- Current milestone: React + TypeScript Foundation

## Current Features

- Responsive dashboard layout
- Reusable React components
- TypeScript interfaces and typed props
- Dynamic statistics rendering
- Stable list keys
- Empty-state handling
- Reusable buttons
- Custom application branding
- Keyboard focus indicators
- Responsive CSS Grid and Flexbox layouts

## Technology Stack

- React
- TypeScript
- Vite
- CSS
- Oxlint
- Node.js
- npm
- Git and GitHub

See [versions.md](./versions.md) for exact
technology versions and environment details.

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
    │   │   └── StatCard.tsx
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

The application follows a component-based
architecture with a clear separation of concerns.

- Layout: Shared application structure
- Header: Project identity
- Card: Reusable content container
- StatCard: Individual dashboard statistics
- Button: Reusable user actions
- Data: Demonstration dashboard records
- Types: TypeScript data contracts

## Data Flow

    Dashboard Types
          |
          v
    Dashboard Data
          |
          v
        App
          |
          v
      StatCard
          |
          v
        Card
          |
          v
    User Interface

The App component imports typed dashboard data
and renders reusable StatCard components using
the JavaScript map method.

An empty-state message is displayed when
no dashboard statistics are available.

## Getting Started

### Requirements

- Node.js 24.19.0
- npm 11.17.0

### Installation

    npm ci

### Development Server

    npm run dev

Open the local URL displayed in the terminal.

### Code Quality

    npm run lint

### Production Build

    npm run build

### Preview Production Build

    npm run preview

Windows PowerShell users may use npm.cmd
instead of npm when required.

## Quality Checks

Day 24 results:

- TypeScript compilation: Passed
- Production build: Passed
- Lint warnings: 0
- Lint errors: 0
- Empty-state manual test: Passed

## Challenges and Solutions

### React Render Purity

A lint warning occurred because the Layout
component calculated the current year
during rendering.

The calculation was moved outside the
component function to maintain render purity.

Linting subsequently passed with zero
warnings and zero errors.

## Planned Features

- Interactive search and filtering
- Dashboard charts
- Users and orders pages
- Detail pages and routing
- Shared application state
- API data fetching
- Loading and error states
- Automated tests
- Next.js migration
- Tailwind CSS
- Production deployment

## Current Limitations

The dashboard currently uses demonstration data.

The report export feature is not implemented.

API integration, authentication, charts and
advanced interactions are not yet implemented.

## Live Demo

Coming after production deployment.

## Screenshots and Demonstration

Project screenshots and a demonstration video
will be added during development.

## Developer

Developed by Hasitha Gayan.

Part of an intensive AI and Full-Stack
Web Development learning roadmap.
