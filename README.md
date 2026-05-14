# Assembly: Endgame

A Wordle/Hangman-style word-guessing game built as a **learning project** for React. Based on the [Scrimba "Intro to React" final project](https://scrimba.com/).

## What this is

This is a hands-on project for learning modern React patterns. The goal is to build a real, working game while applying React concepts in context — not just reading about them.

## How to play

- A secret programming-related word is chosen at random.
- Guess letters one at a time by clicking the on-screen keyboard.
- Each wrong guess eliminates a programming language "faction".
- Guess the word before all 8 factions are wiped out — or the **Endgame** begins.

## Concepts practiced

- **React 19** function components and hooks (`useState`, `useEffect`, `useRef`)
- **Derived state** — computing values from existing state instead of storing them separately
- **Props and callbacks** — passing data down, events up
- **Component composition** — splitting UI into small, focused pieces
- **TypeScript** — strict types for props, state, and game-domain models
- **CSS Modules + Sass** — scoped component styles with Bootstrap overrides
- **Vite** — fast dev server and production bundler

## Stack

| Tool                | Purpose                 |
| ------------------- | ----------------------- |
| React 19            | UI framework            |
| TypeScript ~6       | Static typing           |
| Vite                | Dev server + bundler    |
| Bootstrap 5 + Sass  | Styling base            |
| CSS Modules         | Scoped component styles |
| ESLint + Prettier   | Code quality            |
| Husky + lint-staged | Pre-commit hooks        |

## Project structure

```
src/
  component/    # one .tsx + .module.scss pair per component
  data/         # static data: word list, faction definitions, constants
  styles/       # global SCSS: design tokens + Bootstrap overrides
  types.ts      # shared TypeScript types
  App.tsx       # root component — owns all game state
  main.tsx      # ReactDOM entry point
```

## Running locally

```bash
npm install
npm run dev       # start dev server at localhost:5173
npm run build     # type-check + production build
npm run lint      # run ESLint
npm run preview   # preview the production build
```

## Running with Docker

A `Makefile` wraps all Docker Compose commands — no need to remember long `docker compose` invocations.

### Development

```bash
cp docker.env-example docker.env   # configure ports and Node version
make up                            # start the dev container (installs deps automatically)
make logs                          # tail live output
```

The app is served with Vite HMR at `http://localhost:5173`. Source files are mounted directly into the container, so edits are reflected instantly without rebuilding.

### Useful make targets

| Command          | What it does                              |
| ---------------- | ----------------------------------------- |
| `make up`        | Start the dev container                   |
| `make down`      | Stop and remove containers                |
| `make logs`      | Tail live container logs                  |
| `make shell`     | Open a shell inside the running container |
| `make install`   | Run `npm install` inside the container    |
| `make add PKG=x` | Install a package inside the container    |
| `make build`     | Production build inside the container     |
| `make preview`   | Preview the production build              |
| `make clean`     | Stop containers and wipe volumes          |

Run `make help` to see the full list.

### Production

The production image uses a multi-stage build: Node compiles the app, then Nginx serves the static files.

```bash
make prod-build   # build the production image
make prod-up      # start the production container
make prod-down    # stop the production container
make prod-logs    # tail production logs
```
