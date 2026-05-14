# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Assembly: Endgame** — a Wordle/Hangman-style word-guessing game built with React 19, TypeScript, Vite, Bootstrap, and Sass. Based on the Scrimba "Intro to React" final project. The player guesses a secret word letter by letter; wrong guesses eliminate programming language "factions". Losing all factions triggers the game-over ("Endgame") state.

## Commands

```bash
npm run dev       # start dev server with HMR
npm run build     # TypeScript type-check + Vite production build
npm run lint      # ESLint across all .ts/.tsx files
npm run preview   # serve the production build locally
```

Prettier is used for formatting alongside ESLint (mirrors the Chef Claude project setup).

## Stack

- **React 19** — function components and hooks only
- **TypeScript ~6** — strict types; avoid `any`
- **Sass (SCSS) + Bootstrap** — Bootstrap Sass variables are overridden in `src/styles/_variables.scss` before `@use 'bootstrap'`; per-component styles use CSS Modules (`.module.scss`)
- **Vite** — dev server and bundler; no test runner configured yet

## Architecture

```
src/
  components/    # one .tsx + .module.scss pair per UI component
  data/          # static data: word list, faction/language definitions
  styles/        # global SCSS: _variables.scss (design tokens + Bootstrap overrides)
  types.ts       # shared TypeScript types (Language, GameStatus, Letter, etc.)
  App.tsx        # root component — owns all game state
  main.tsx       # ReactDOM entry point
```

`App.tsx` is the single source of truth for game state (`currentWord`, `guessedLetters`). All other values — wrong-guess count, win/loss status, which factions are eliminated — are **derived** from those two pieces of state rather than stored in additional `useState` calls.

Child components are presentational: they receive props and fire callback functions. Game logic lives only in `App.tsx`.

## Clean code standards

### Single Responsibility

Each file does one thing. A component renders UI. A data file holds data. A types file holds types. Never mix concerns — no game logic inside a component file, no hardcoded data inside `App.tsx`.

### Naming

- Components: `PascalCase` (`WordDisplay`, `LanguageChip`)
- Functions and variables: `camelCase`, verb-first for handlers (`handleKeyPress`, `handleNewGame`)
- Types: `PascalCase` (`GameStatus`, `FactionName`)
- SCSS modules: same name as the component (`WordDisplay.module.scss`)
- Constants: `SCREAMING_SNAKE_CASE` for truly fixed values (`MAX_WRONG_GUESSES`)

### No magic values

Game constants (max wrong guesses, faction count, alphabet) belong in `src/data/constants.ts`, not scattered as raw literals across components.

### Small, focused components

If a component's JSX exceeds ~60 lines or handles more than one concept, split it. Prefer many small components over one large one.

### Props

- Define a `type Props` above every component — never use inline anonymous types as function params.
- Keep prop lists short. If a component needs more than ~5 props, consider whether it is doing too much or whether a sub-component should own some of them.
- Pass only what a component needs — no "god objects" passed wholesale.

### Data lives in `src/data/`

Word lists, faction definitions, and any other static content are plain `.ts` files that export typed arrays/objects. Components import from there — they never define data inline.

## React patterns to follow

- **Derive, don't sync.** If a value can be calculated from existing state, compute it during render — never store it in a separate `useState`.
- `useEffect` is for side effects that can't happen during render (e.g. focusing an element, syncing to localStorage). Do not use it to keep two pieces of state in sync.
- `useRef` for values that must persist across renders without triggering a re-render (e.g. a DOM reference, a timer id).
- Event handlers are named `handleX` and defined inside the component (or passed down as `onX` props).

## Styling conventions

- Design tokens (colours, spacing, fonts) → `src/styles/_variables.scss`
- Bootstrap Sass variables overridden in `_variables.scss` **before** `@use 'bootstrap'`
- Component styles → `.module.scss` co-located with the component; import as `import styles from './Component.module.scss'`
- No inline `style` props except for genuinely dynamic values driven by data (e.g. a faction's unique colour)

## TypeScript conventions

- All game-domain types in `src/types.ts` — `type` aliases for plain data shapes, `interface` only when extension is needed
- Component prop types defined as `type Props = { ... }` immediately above the component; export only when shared
- No `any`; use `unknown` + type narrowing when the shape is truly unknown

## Mentoring — things to flag

- `useState` for a value that could be derived from existing state
- `useEffect` used where a derived value or direct event handler would be cleaner
- List `key` props set to array index instead of a stable, meaningful id
- Raw literals (numbers, strings) used instead of named constants
- Game logic or data defined inside a component file
- Props drilled more than 2–3 levels (discuss lifting state or component composition)
- A component doing more than one job
