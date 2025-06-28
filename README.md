# 🥗 NutriFlow - SaaS Landing Page

A modern, production-ready SaaS landing page for NutriFlow, a nutrition software platform for independent dietitians.

## 🚀 Quick Start

### Development Setup

1. **Clone and navigate:**
```bash
git clone <your-repo>
cd NutriFlow
```

2. **Frontend (Next.js):**
```bash
# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Edit .env.local with your API URL

# Start development server
npm run dev
```

3. **Backend (FastAPI):**
```bash
cd backend

# Create environment file
cp .env.example .env
# Edit .env with your database settings

# Start with Docker
docker-compose up -d
```

### Production Deployment

1. **Prepare environment:**
```bash
cd backend
cp .env.production.example .env
nano .env  # Fill in production values
```

2. **Deploy:**
```bash
./deploy.sh
```

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework:** Next.js 14 with TypeScript
- **Styling:** Tailwind CSS
- **Features:** Responsive design, Email capture, Error handling

### Backend (FastAPI)
- **Framework:** FastAPI with Python 3.11+
- **Database:** PostgreSQL with SQLAlchemy
- **Security:** Rate limiting, Input validation, CORS protection

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Reverse Proxy:** Nginx (production)
- **SSL:** Let's Encrypt support

## 📡 API Endpoints

- `POST /api/subscribe` - Email subscription
- `GET /health` - Health check
- `GET /api/subscribers/count` - Admin endpoint

## 🔒 Security Features

- ✅ HTTPS enforcement
- ✅ Rate limiting (3 req/5min per IP)
- ✅ Input validation and sanitization
- ✅ SQL injection protection
- ✅ Security headers (HSTS, CSP, etc.)

## 🚦 Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```bash
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your_secret_key_here
ENVIRONMENT=production
ALLOWED_ORIGINS=https://nutriflow.fr
```

---

**Built with ❤️ for French dietitians**