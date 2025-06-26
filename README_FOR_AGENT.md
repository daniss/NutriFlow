# NutriFlow - SaaS Landing Page + Backend Project

## 🎯 Project Overview

**NutriFlow** is a French SaaS platform designed for independent dietitians (diététiciens). The project consists of a modern landing page built with Next.js + Tailwind CSS and a complete backend API built with FastAPI + PostgreSQL, all containerized with Docker.

### Core Value Proposition
- **AI-powered meal planning** in 2 minutes
- **Automated client tracking** and follow-up
- **Simplified billing** and invoicing
- **Professional dashboard** for managing nutrition practice

---

## 🏗️ Project Structure

```
/home/danis/code/saasnutri/
├── pages/
│   └── index.tsx                 # Main landing page (heavily customized)
├── backend/
│   ├── main.py                   # FastAPI main application
│   ├── api.py                    # API endpoints (/api/subscribe, /health)
│   ├── schemas.py                # Pydantic models for data validation
│   ├── security.py               # Security middleware and rate limiting
│   ├── docker-compose.yml        # Docker orchestration (API + DB + pgAdmin)
│   ├── Dockerfile                # FastAPI container
│   ├── requirements.txt          # Python dependencies
│   ├── init.sql                  # Database initialization script
│   ├── schema_enhanced.sql       # Enhanced database schema
│   ├── BACKEND_SECURITY_SUMMARY.md
│   └── FRONTEND_SECURITY_GUIDE.md
├── styles/
├── public/
├── package.json                  # Next.js dependencies
├── tailwind.config.js           # Tailwind CSS configuration
└── next.config.js               # Next.js configuration
```

---

## 🚀 What We Built

### 1. **Modern French Landing Page** (Next.js + Tailwind)

#### **Hero Section**
- **Emotional benefit-focused subtitle**: "Moins d'administratif, plus de clients. Automatisez 80 % de votre suivi, sans sacrifier l'humain."
- **Gradient CTA buttons** using main brand colors (blue-purple-indigo gradient)
- **Fixed email/button alignment issues** with proper flex layouts
- **Trust badges**: "Déjà utilisé par plus de 300 diététicien·nes en France"
- **GDPR compliance indicator**: "Données sécurisées & hébergées en France 🇫🇷"

#### **Dashboard Visual Section**
- **Realistic nutrition app UI** with:
  - Client statistics (47 active clients, €4,290 monthly revenue)
  - AI meal planning workflow (real-time generation status)
  - Client cards with realistic names (Marie Dubois, Jean Martin, Sophie Chen)
  - Nutrition-focused fields (weight goals, allergies, budgets)
  - Recent activity feed with timestamps

#### **Enhanced Testimonials**
- **3 realistic testimonials** with full names and locations:
  - **Camille Roche** (Lyon): "Grâce à NutriFlow, je gagne 4h par semaine sur les suivis"
  - **Marie Leblanc** (Bordeaux): Client retention increased 60% with mobile app
  - **Julien Martinez** (Nice): Perfect integration with sports apps for athletes
- **Avatar initials** and 5-star ratings
- **Realistic usage stats** (months using, client counts)

#### **FAQ Section**
- **5 key questions** in French:
  - Data security and GDPR compliance
  - Cancellation policy and flexibility
  - Doctolib integration compatibility
  - Post-trial subscription details
  - Training requirements and support

### 2. **FastAPI Backend** (Production-Ready)

#### **API Endpoints**
- `POST /api/subscribe` - Email subscription with validation
- `GET /health` - Health check endpoint
- **Email validation** and deduplication
- **Rate limiting** (10 requests per minute per IP)
- **CORS configuration** for frontend integration

#### **Security Features**
- **Security headers** (HSTS, CSP, X-Frame-Options)
- **Input validation** with Pydantic schemas
- **SQL injection protection** with SQLAlchemy
- **Environment variable** configuration
- **Error handling** and logging

#### **Database**
- **PostgreSQL 15** with proper schemas
- **Email subscribers table** with timestamps
- **Data persistence** with Docker volumes
- **pgAdmin interface** for database management

### 3. **Docker Infrastructure**

#### **Services**
- **PostgreSQL**: Database with persistent storage
- **FastAPI**: Backend API with health checks
- **pgAdmin**: Database management interface (port 5050)

#### **Features**
- **Health checks** for all services
- **Automatic restart** policies
- **Development volume mounting** for hot reload
- **Network isolation** with custom bridge

---

## 🛠️ Technical Implementation

### **Frontend (Next.js + Tailwind)**
- **Responsive design** with mobile-first approach
- **Modern CSS Grid/Flexbox** layouts
- **Gradient backgrounds** and animations
- **Form handling** with React state management
- **API integration** with error handling and loading states
- **SEO optimization** with proper meta tags

### **Backend (FastAPI + PostgreSQL)**
- **Async/await** patterns for performance
- **Type hints** throughout the codebase
- **Dependency injection** for database connections
- **Middleware stack** for security and CORS
- **Environment-based configuration**

### **DevOps (Docker + Docker Compose)**
- **Multi-stage builds** for production optimization
- **Health checks** and dependency management
- **Volume persistence** for data integrity
- **Environment isolation** between services

---

## 🔧 Setup Instructions

### **Development Setup**
```bash
# Frontend
cd /home/danis/code/saasnutri
npm install
npm run dev  # Starts on http://localhost:3000

# Backend
cd backend
docker-compose up -d  # Starts API:8000, DB:5432, pgAdmin:5050
```

### **Database Access**
- **pgAdmin**: http://localhost:5050
  - Email: admin@nutriflow.com
  - Password: admin123
- **Direct DB**: localhost:5432
  - Database: nutriflow_db
  - User: nutriflow_user
  - Password: nutriflow_password_2024

---

## 🎨 Design System

### **Color Palette**
- **Primary Gradient**: `from-blue-600 via-purple-600 to-indigo-600`
- **Secondary**: Emerald, Teal for success states
- **Neutral**: Gray scale for text and backgrounds
- **Accent**: Yellow for ratings, Orange for stats

### **Typography**
- **Headlines**: Extrabold, tracking-tight
- **Body**: Light to medium weights
- **CTA Buttons**: Semibold, rounded-2xl borders

### **Components**
- **Gradient cards** with hover effects
- **Glass-morphism** backgrounds with backdrop-blur
- **Animated orbs** for visual interest
- **Modern form inputs** with focus states

---

## 🚦 Current Status

### ✅ **Completed Features**
- [x] Complete landing page with all sections
- [x] Hero section with emotional benefits
- [x] Realistic dashboard mockup
- [x] Authentic testimonials with avatars
- [x] Comprehensive FAQ section
- [x] FastAPI backend with all endpoints
- [x] PostgreSQL database setup
- [x] Docker containerization
- [x] Form submission integration
- [x] Email validation and storage
- [x] Security headers and rate limiting
- [x] Health checks and monitoring
- [x] UI alignment fixes for mobile/desktop

### 🔄 **Ready for Enhancement**
- [ ] Email marketing automation
- [ ] Payment integration (Stripe)
- [ ] User authentication system
- [ ] Admin dashboard for analytics
- [ ] A/B testing framework
- [ ] Advanced SEO optimization
- [ ] Performance monitoring
- [ ] Mobile app mockups
- [ ] Internationalization (i18n)

---

## 🧑‍💻 Development Notes

### **Key Files to Know**
- **`pages/index.tsx`**: Main landing page (1155+ lines of React/TSX)
- **`backend/main.py`**: FastAPI application entry point
- **`backend/api.py`**: Core API endpoints and business logic
- **`backend/docker-compose.yml`**: Infrastructure configuration

### **Important Patterns**
- **Form handling**: Uses React state with async/await for API calls
- **Error handling**: Graceful degradation with user feedback
- **Responsive design**: Mobile-first with sm/md/lg breakpoints
- **Component structure**: Semantic sections with clear separation

### **Database Schema**
```sql
CREATE TABLE email_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);
```

---

## 🎯 Next Steps for AI Agent

### **Immediate Priorities**
1. **Test the complete flow**: Form submission → Backend → Database
2. **Performance optimization**: Image optimization, code splitting
3. **SEO enhancement**: Schema markup, meta descriptions
4. **Analytics integration**: Google Analytics, conversion tracking

### **Feature Expansion**
1. **Payment flow**: Stripe integration for subscriptions
2. **User onboarding**: Multi-step signup process
3. **Dashboard mockup**: More detailed nutrition app screens
4. **Email sequences**: Welcome series for new subscribers

### **Technical Improvements**
1. **TypeScript**: Stronger typing throughout
2. **Testing**: Unit tests for components and API endpoints
3. **CI/CD**: GitHub Actions for deployment
4. **Monitoring**: Application performance monitoring

---

## 📞 API Documentation

### **POST /api/subscribe**
```json
{
  "email": "user@example.com"
}
```

**Response (Success)**:
```json
{
  "message": "Subscription successful",
  "email": "user@example.com"
}
```

**Response (Error)**:
```json
{
  "detail": "Email already exists"
}
```

### **GET /health**
```json
{
  "status": "healthy",
  "timestamp": "2024-06-26T...",
  "database": "connected"
}
```

---

## 🎨 Brand Guidelines

### **Voice & Tone**
- **Professional** but approachable
- **French-first** with local references
- **Benefit-focused** rather than feature-heavy
- **Trust-building** with social proof

### **Visual Style**
- **Modern gradient** aesthetics
- **Clean typography** with generous whitespace
- **Subtle animations** for engagement
- **Mobile-responsive** design patterns

---

This documentation should provide complete context for any AI agent to understand, modify, and extend the NutriFlow project effectively.
