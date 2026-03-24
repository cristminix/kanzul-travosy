# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kanzul Travosy is a website for "Pondok Pesantren Kanzululum" (an Islamic boarding school). Built with React + Vite using a Multi-Page Application (MPA) architecture.

## Development Commands

```bash
# Development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Lint code
yarn lint
```

## Architecture

### MPA Structure

The project uses `vite-plugin-mpa-plus` with page definitions in `mpa.config.json`. Each page has:
- Entry file in `src/web/pages/` (for public pages) or `src/admin/` (for admin)
- HTML template at root level (e.g., `index.html`, `admin/index.html`)
- Output configured in `mpa.config.json`

### Two Applications

**Admin App** (`/admin`):
- Entry: `src/admin/main.jsx`
- Main component: `src/admin/AdminApp.jsx`
- Template: `src/admin/templates/AdminTemplate.jsx`
- Pages: `src/admin/pages/` (Dashboard, Content management, etc.)
- Forms: `src/admin/components/forms/` for content editing

**Web App** (public-facing):
- Entry: `src/web/pages/*.jsx`
- Main component: `src/web/WebApp.jsx`
- Templates: `src/web/templates/` (Homepage, Profile, Berita, etc.)
- Components: `src/web/components/`

### Key Directories

- `src/global/` - Shared code across both apps
  - `store/` - Redux store and slices
  - `backend/` - Authentication backend abstraction (Firebase/null)
  - `firebase/` - Firebase integration
  - `git/` - Isomorphic-git based content storage with ORM
  - `api/` - API client functions
  - `fn/` - Utility functions
  - `css/` - Global styles (Tailwind, custom CSS)
- `src/web/data/` - JSON data files and SQLite databases
  - `forms/` - JSON Schema and UI Schema for @rjsf forms
  - `pages/` - Page-specific data
  - `templates/` - Template section/block data
- `tools/` - Development scripts (generators, compilers)

### State Management

Redux Toolkit with redux-persist (session storage). Slices in `src/global/store/features/`:
- Each content type has its own slice (berita, galery, kegiatan, etc.)
- `contentSlice` handles global UI state (loading, alerts, toasts)
- `settingSlice` handles app settings

### Content Storage

Two storage approaches:
1. **JSON files** in `src/web/data/` - Static content loaded at build time
2. **Git-based ORM** in `src/global/git/` - Dynamic content with models in `src/global/git/models/`

### Forms

React JSON Schema Form (@rjsf/bootstrap-4) with schemas in `src/web/data/forms/`:
- `schema.json` - JSON Schema for data validation
- `ui.json` - UI Schema for form layout

### Rich Text Editing

EditorJS for block-based content editing. Configuration in `src/app/content-pages/components/editor-js-tools.js`.

### Authentication

Backend-agnostic auth via `src/global/backend/`:
- Currently supports Firebase Authentication
- Can be disabled (null backend) for development

### API

API base URL configured in `src/global/api/config.ts`. External API at `https://kv.ponpeskanzululumcirebon.com`.

### Styling

- Tailwind CSS (v3.4.3)
- Bootstrap 4 for admin UI
- SCSS for component styles
- Global CSS in `src/global/css/`

### Path Aliases

Configured in `jsconfig.json`:
- `@` → `./src/`

### Database

- SQL.js for client-side SQLite
- Drizzle ORM for type-safe queries
- Database files stored in `src/web/data/` (e.g., `berita.db`, `produk.db`)

## Adding New Pages

1. Create entry file in `src/web/pages/pagename.jsx`
2. Create HTML template at `pagename/index.html`
3. Create template component in `src/web/templates/PagenameTemplate.jsx`
4. Add page config to `mpa.config.json`
5. Add route handling in `src/web/WebApp.jsx`
6. Create data file in `src/web/data/pagename.json`

## Adding New Content Types

1. Create Redux slice in `src/global/store/features/contentnameSlice.js`
2. Register in `src/global/store/index.js`
3. Create JSON schemas in `src/web/data/forms/contentname/`
4. Create model in `src/global/git/models/MContentname.js`
5. Create admin form in `src/admin/components/forms/ContentnameForm.jsx`
6. Create admin page in `src/admin/pages/contents/Contentname.jsx`