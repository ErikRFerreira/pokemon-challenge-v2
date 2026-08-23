# Pokédex

A responsive Pokédex built with React and TypeScript. The app retrieves live Pokémon data from [PokéAPI](https://pokeapi.co/), presents a paginated roster and detailed profiles, supports global search, and saves favorites in the browser.

## Features

- Browse Pokémon in a paginated roster
- Search the complete Pokémon index by name
- View a Pokémon's artwork, types, description, abilities, physical details, and base stats
- Add and remove favorites, persisted with `localStorage`
- Loading skeletons and useful API error states
- Validated URL parameters, API responses, and stored favorites
- Responsive, accessible navigation and controls

## Technologies and libraries

- **React 19** for the component-based user interface
- **TypeScript** for static typing
- **Vite** for the development server and production build
- **React Router** for client-side routing and URL-based pagination
- **TanStack Query** for API requests, caching, and request state
- **Tailwind CSS 4** for responsive styling and the design system
- **Zod** for runtime validation of API responses, query parameters, and local storage data
- **Lucide React** for interface icons
- **Vitest** and **jsdom** for the test runner and browser-like test environment
- **React Testing Library**, **jest-dom**, and **user-event** for testing UI behavior and user interactions
- **Mock Service Worker (MSW)** for intercepting and mocking HTTP requests during tests
- **ESLint** for code quality checks

## API and data sources

The application uses the free, public [PokéAPI v2](https://pokeapi.co/docs/v2) and does not require an API key.

The service layer in `src/services/pokemon.service.ts` uses:

- `GET https://pokeapi.co/api/v2/pokemon?offset={offset}&limit={limit}` for the roster, pagination, and search index
- `GET https://pokeapi.co/api/v2/pokemon/{name}` for a Pokémon's details
- The species URL returned by the details endpoint for its English flavor-text description
- Official artwork hosted in the [PokeAPI sprites repository](https://github.com/PokeAPI/sprites)

All remote payloads are treated as untrusted data and parsed with Zod schemas before reaching the UI. TanStack Query caches roster, search, and details requests for one hour.

## Getting started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Testing

Run the complete test suite once:

```bash
npm test
```

Run tests in watch mode while developing:

```bash
npm run test:watch
```

The tests run in jsdom. Shared setup in `src/test/setup.ts` resets rendered components, `localStorage`, and MSW handlers after every test. `src/test/server.ts` creates the MSW request interceptor, `src/test/mock.ts` contains schema-compatible fixtures, and `src/test/render.tsx` provides a render helper with isolated TanStack Query and in-memory router instances.

### What is tested and where

| Test file | Coverage |
| --- | --- |
| `src/services/pokemon.service.test.ts` | Pagination request parameters, artwork enrichment, detail/species response composition, description normalization and fallback behavior, HTTP failures, and invalid API payload rejection |
| `src/services/storage.service.test.ts` | JSON serialization, reading, removal, and schema-compatible values in `localStorage` |
| `src/utils/utils.test.ts` | Pokémon ID extraction, official artwork URLs, API label formatting, and pagination ranges at the beginning, middle, and end |
| `src/hooks/useFavorites.test.ts` | Loading valid favorites, rejecting missing or malformed stored data, persistence, duplicate prevention, and removal |
| `src/pages/pages.functional.test.tsx` | Roster rendering and pagination, API error states, pagination boundaries, detail loading and retry states, favorite interactions, the favorites empty state, search results, and navigation |

At the time of this README update, all **28 tests across 5 test files** pass.

## Project structure

```text
src/
├── components/  Reusable application components
├── hooks/       Data-fetching, validation, and favorites hooks
├── pages/       Route-level screens and functional tests
├── router/      Browser route definitions
├── schemas/     Zod schemas and inferred domain types
├── services/    HTTP, PokéAPI, and localStorage access
├── test/        Shared test setup, fixtures, server, and render helper
├── ui/          Small presentational UI components
└── utils/       Formatting, image, ID, and pagination helpers
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite in development mode |
| `npm run build` | Type-check and create a production build |
| `npm run lint` | Run ESLint across the project |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run preview` | Serve the production build locally |
