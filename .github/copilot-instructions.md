# NutriFlow Copilot Instructions

## Architecture Overview
NutriFlow is a SaaS landing page for French dietitians with Next.js frontend and FastAPI backend. The core architecture separates concerns: Next.js handles the marketing site with email collection, while FastAPI manages subscriber data with PostgreSQL and Redis.

## Key Development Patterns

### Frontend (Next.js)
- **Single massive component**: `pages/index.tsx` (~1300 lines) contains the entire landing page - this is intentional for a marketing site
- **French-first localization**: All UI text is in French (e.g., "Réserver mon accès gratuit", error messages)
- **Health-focused branding**: Use emerald/teal gradients (`from-emerald-500 to-teal-600`) instead of generic blue/purple
- **Email form integration**: Form submits to `${process.env.NEXT_PUBLIC_API_URL}/api/subscribe` with specific error handling for duplicates and rate limits

### Backend (FastAPI)
- **Modular structure**: `main.py` (app setup) → `api.py` (routes) → `services.py` (business logic) → `database.py` (data access)
- **Production-first**: Rate limiting, CORS, security headers, health checks built-in from start
- **Environment-driven config**: Single `Settings` class in `config.py` uses environment variables with sensible defaults

### Docker-First Development
```bash
# Backend development (recommended)
cd backend && ./docker-setup.sh     # One command builds, starts, tests everything
./docker-manage.sh logs             # View logs, status, etc.

# Full stack
docker-compose up -d                # Postgres + Redis + API + Frontend
```

## Critical Workflows

### Frontend Development
```bash
npm run dev                         # Standard Next.js dev server
```

### API Testing
```bash
cd backend && ./docker-manage.sh test    # Runs comprehensive API tests
```

### Production Deployment
- Uses `.env.production` for frontend, `.env` for backend
- Health checks: Frontend `http://localhost:3000/`, Backend `http://localhost:8000/health`

## Project-Specific Conventions

### Color Scheme (Critical)
- **Primary**: `from-emerald-500 to-teal-600` (health/wellness focus)
- **Hover**: `hover:from-emerald-600 hover:to-teal-700`
- **Avoid**: Blue/purple gradients (replaced for professional health branding)

### Error Handling Patterns
- French error messages with specific cases: Rate limiting → "Trop de tentatives...", Duplicates → "Cette adresse email est déjà inscrite !"
- Backend returns structured errors with HTTP status codes

### Database Schema
- Simple `subscribers` table with email uniqueness constraint
- Uses SQLAlchemy ORM with proper connection pooling

## Key Files

- `pages/index.tsx`: Complete landing page with email collection
- `backend/main.py`: FastAPI app configuration and middleware
- `backend/api.py`: Email subscription endpoint with validation
- `backend/config.py`: Environment-based settings class
- `docker-compose.yml`: Full-stack orchestration
- `backend/docker-manage.sh`: Development workflow scripts

## Dependencies & Integration
- **Frontend**: Next.js 14, React 18, Tailwind CSS, TypeScript
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL 15, Redis 7, Pydantic
- **Analytics**: Google Analytics integration for signup tracking
- **Legal**: French legal pages (CGU, mentions légales) in separate page components

When working on this codebase, maintain the French localization, health-focused emerald/teal branding, and Docker-first development approach.
