
# InsightBoard — Technology Versions

## Project Information

- Project: InsightBoard
- Category: Professional Analytics Dashboard
- Major Project: 02 of 05
- Started: 19 November 2026
- Roadmap: Day 24–40

## Initial Development Environment

| Technology | Version |
|---|---|
| Operating System | Windows 11 |
| Node.js | 24.19.0 |
| npm | 11.17.0 |
| React | 19.3.1 |
| React DOM | 19.3.1 |
| TypeScript | 7.0.2 |
| Vite | 8.3.8 |
| Vite React Plugin | 6.3.0 |
| Oxlint | 1.94.0 |
| Create Vite | 9.3.4 |
| @types/node | 24.19.2 |
| @types/react | 19.3.0 |
| @types/react-dom | 19.3.0 |

## Development Commands

npm ci
npm run dev
npm run lint
npm run build
npm run preview

Windows PowerShell users can use npm.cmd
instead of npm if required.

## Day 24 Quality Checks

- TypeScript compilation: Passed
- Production build: Passed
- Lint errors: 0
- Lint warnings: 0

## Bug Resolution

### React Render Purity Warning

Problem:
The Layout component called new Date()
during rendering.

Solution:
Moved the year calculation outside
the component function.

Result:
Linting passed with zero warnings
and zero errors.

## Version Policy

- Use official documentation.
- Record installed technology versions.
- Maintain package-lock.json.
- Use npm ci for reproducible installations.
- Test the application after dependency updates.
- Document future technology migrations.
