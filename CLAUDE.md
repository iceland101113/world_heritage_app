# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

World Heritage information sharing website built with Rails 7.1.3 backend + Vue 3 frontend (Vite bundler). Features interactive maps, UNESCO heritage data, multilingual support (en/zh-TW/fr), and a rate-limited public REST API.

- Live site: https://world-heritage-app.fly.dev/
- Public API: https://world-heritage-app.fly.dev/public/api/v1/heritages
- API Docs: https://world-heritage-app.fly.dev/api_docs/index

## Tech Stack

- **Ruby**: 3.2.8, **Rails**: 7.1.3
- **Frontend**: Vue 3.3.4, Vite 5, Pinia, Element Plus, Leaflet maps
- **Database**: PostgreSQL
- **Package manager**: Yarn (frontend), Bundler (backend)
- **Testing**: RSpec (backend), Vitest (frontend)

## Development Commands

### Start Local Dev Server

```bash
foreman start -f Procfile.dev   # Starts both Vite dev server and Rails
# Or separately:
bin/vite dev                    # Frontend only
bin/rails s                     # Backend only
```

### Install Dependencies

```bash
bundle install
yarn install
```

### Database

```bash
rails db:migrate
bundle exec rake import_word_heritages:v2_run   # Import UNESCO heritage data
```

### Running Tests

```bash
# Backend (RSpec)
bundle exec rspec                              # All specs
bundle exec rspec spec/requests/api/v1/       # Single directory
bundle exec rspec spec/path/to/file_spec.rb   # Single file

# Frontend (Vitest)
npm run test          # Run all frontend tests
npm run coverage      # With coverage report
```

### Build

```bash
yarn build            # Production Vite build
yarn build:css        # Compile SCSS with autoprefixer
```

## Architecture

### API Routes

Two separate API namespaces exist in `config/routes.rb`:

1. **Internal API** (`/api/v1/world_heritages`) — used by the frontend Vue app
2. **Public API** (`/public/api/v1/heritages`) — external access with rate limiting (rack-attack: 1000 req/5 min per IP)

Both support index/show. The public API supports pagination (`page`, `per_page`) and filtering (`category`, `date_inscribed`, `states_name_en`, `region_en`).

### Frontend Structure

Entry points are in `app/frontend/entrypoints/` — each maps to a Rails view. The main app (`home.js`) initializes Vue with Pinia, vue-i18n, and Element Plus.

- **State**: `app/frontend/store/main.js` — holds heritages, countries, regions fetched from the internal API
- **i18n**: Locale files at `app/frontend/locales/` (en, zh-TW, fr); locale selection passed via Rails controller as `gon`/layout variable
- **Maps**: Leaflet with `leaflet.markercluster` for clustering heritage sites

### Internationalization

The app is bilingual Rails + Vue. Rails controllers handle locale via `ApplicationController` and pass it to views. Vue components use `vue-i18n`. The `WorldHeritage` model has separate columns for English/Chinese fields (e.g., `name_en`, `name_zh`, `region_en`, `region_zh`).

### API Documentation

Uses **Rswag** (Swagger/OpenAPI). Spec metadata lives in `spec/requests/` alongside regular request specs. Generated output: `swagger/v1/swagger.yaml`.

## CI/CD

GitHub Actions (`.github/workflows/ci.yml`) runs on push/PR:
1. **Build job**: Installs Ruby + Node, caches dependencies
2. **Test job**: Spins up PostgreSQL service, runs `rails db:prepare`, then `bundle exec rspec` + `npm run test`

Requires `RAILS_MASTER_KEY` secret in GitHub.

Deployment is via Fly.io using Docker (multi-stage build in `Dockerfile`).

## Environment Variables

Required in `.env` for local development:
- `RAILS_MASTER_KEY`
- `PG_HOST`, `PG_USER`, `PG_PASSWORD`, `PG_PORT` (for test DB)
- OpenAI API key (used in rake tasks for Chinese translations)
- Google API key (geocoding/location services)
