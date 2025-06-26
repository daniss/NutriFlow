# NutriFlow Backend API

FastAPI backend for handling email subscriptions and free trial signups for NutriFlow.

## 🚀 Features

- **Email Subscription**: Collect and validate email addresses for free trial signups
- **PostgreSQL Integration**: Store subscriber data with proper constraints
- **Email Validation**: Built-in email format validation using Pydantic
- **Duplicate Prevention**: Prevent duplicate email subscriptions
- **CORS Support**: Configured for frontend integration
- **Production Ready**: Proper error handling, logging, and configuration
- **Docker Support**: Complete containerized setup with Docker Compose

## 🛠️ Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **PostgreSQL**: Robust relational database
- **SQLAlchemy**: Python SQL toolkit and ORM
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: ASGI server for running the application
- **Docker**: Containerization for easy deployment

## 🐳 Quick Start with Docker (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- No need for Python, PostgreSQL, or other dependencies

### 1. Setup and Run
```bash
cd backend

# One-command setup (builds, starts, and tests everything)
./docker-setup.sh
```

### 2. Manage Services
```bash
# View all available commands
./docker-manage.sh help

# Common commands
./docker-manage.sh start    # Start services
./docker-manage.sh stop     # Stop services
./docker-manage.sh logs     # View logs
./docker-manage.sh test     # Run API tests
./docker-manage.sh status   # Check service status
```

### 3. Access Services
- **API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Database**: localhost:5432
- **pgAdmin**: http://localhost:5050

## 📦 Manual Installation (Alternative)

If you prefer not to use Docker:

1. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Set up PostgreSQL database:**
   ```bash
   # Create database
   createdb nutriflow_db
   
   # Run schema (optional - tables will be auto-created)
   psql nutriflow_db < schema.sql
   ```

## 🔧 Configuration

### Docker Configuration
All configuration is handled automatically by Docker Compose. Default settings:

- **Database**: PostgreSQL 15 with automatic initialization
- **API**: FastAPI with auto-reload in development
- **pgAdmin**: Web-based database management tool

### Manual Configuration
Update `.env` file with your settings:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/nutriflow_db
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

## 🚀 Running the API

### With Docker (Recommended)
```bash
cd backend
./docker-setup.sh           # First time setup
./docker-manage.sh start     # Start services
./docker-manage.sh stop      # Stop services
```

### Manual Development
```bash
cd backend
python main.py
```

### Production
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 📋 API Endpoints

### POST `/api/subscribe`
Subscribe a new email for free trial.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (201):**
```json
{
  "message": "Inscription réussie ! Vérifiez votre email pour commencer votre essai gratuit de 14 jours.",
  "subscriber": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "detail": "Cette adresse email est déjà inscrite à notre liste."
}
```

### GET `/api/subscribers/count`
Get total number of subscribers (for analytics).

**Response:**
```json
{
  "total_subscribers": 142
}
```

## 🗄️ Database Schema

```sql
CREATE TABLE subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

## 🧪 Testing

### With Docker
```bash
./docker-manage.sh test
```

### Manual Testing
```bash
# Make sure API is running, then:
python test_api.py
```

### Test with curl:
```bash
# Subscribe new email
curl -X POST "http://localhost:8000/api/subscribe" \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com"}'

# Get subscriber count
curl "http://localhost:8000/api/subscribers/count"

# Health check
curl "http://localhost:8000/health"
```

## 🐳 Docker Commands

### Basic Operations
```bash
# Setup everything (first time)
./docker-setup.sh

# Start services
./docker-manage.sh start

# Stop services
./docker-manage.sh stop

# Restart services
./docker-manage.sh restart

# View logs
./docker-manage.sh logs

# Check status
./docker-manage.sh status
```

### Development
```bash
# Rebuild after code changes
./docker-manage.sh rebuild

# Open API container shell
./docker-manage.sh shell-api

# Open database shell
./docker-manage.sh shell-db

# View API logs only
./docker-manage.sh logs-api
```

### Maintenance
```bash
# Clean up (removes volumes)
./docker-manage.sh clean

# Complete reset (removes everything)
./docker-manage.sh reset
```

## 🔒 Security Features

- **Email Validation**: Proper email format validation
- **SQL Injection Protection**: SQLAlchemy ORM prevents SQL injection
- **CORS Configuration**: Restricted to specified origins
- **Input Sanitization**: Pydantic models validate all inputs
- **Error Handling**: Proper error responses without sensitive data
- **Container Security**: Non-root user in Docker containers

## 🚀 Frontend Integration

Update your Next.js frontend to point to the new backend:

```javascript
// In your form submission handler
const response = await fetch('http://localhost:8000/api/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email }),
});
```

## 📈 Production Deployment

### Docker Production
1. **Update environment variables** in `docker-compose.yml`
2. **Use production database** credentials
3. **Set DEBUG=False**
4. **Configure proper secrets**
5. **Set up reverse proxy** (nginx, Traefik)
6. **Enable SSL/TLS**

### Manual Production
```bash
# Production command example
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 🗂️ Project Structure

```
backend/
├── main.py              # FastAPI application entry point
├── config.py            # Configuration and environment settings
├── database.py          # SQLAlchemy models and database setup
├── schemas.py           # Pydantic models for validation
├── services.py          # Business logic
├── api.py              # API endpoints
├── Dockerfile          # Docker container definition
├── docker-compose.yml  # Multi-container setup
├── init.sql            # Database initialization
├── docker-setup.sh     # One-command setup script
├── docker-manage.sh    # Container management script
├── test_api.py         # API testing script
├── requirements.txt    # Python dependencies
├── schema.sql          # Manual database setup
└── README.md           # This file
```

## 📝 License

This project is part of the NutriFlow application.

## 📋 API Endpoints

### POST `/api/subscribe`
Subscribe a new email for free trial.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (201):**
```json
{
  "message": "Inscription réussie ! Vérifiez votre email pour commencer votre essai gratuit de 14 jours.",
  "subscriber": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "detail": "Cette adresse email est déjà inscrite à notre liste."
}
```

### GET `/api/subscribers/count`
Get total number of subscribers (for analytics).

**Response:**
```json
{
  "total_subscribers": 142
}
```

## 🗄️ Database Schema

```sql
CREATE TABLE subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

## 🧪 Testing

### Test the API with curl:

```bash
# Subscribe new email
curl -X POST "http://localhost:8000/api/subscribe" \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com"}'

# Get subscriber count
curl "http://localhost:8000/api/subscribers/count"

# Health check
curl "http://localhost:8000/health"
```

## 🔒 Security Features

- **Email Validation**: Proper email format validation
- **SQL Injection Protection**: SQLAlchemy ORM prevents SQL injection
- **CORS Configuration**: Restricted to specified origins
- **Input Sanitization**: Pydantic models validate all inputs
- **Error Handling**: Proper error responses without sensitive data

## 🚀 Frontend Integration

Update your Next.js frontend to point to the new backend:

```javascript
// In your form submission handler
const response = await fetch('http://localhost:8000/api/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email }),
});
```

## 📈 Production Deployment

1. **Set environment variables for production**
2. **Use a production ASGI server**: Gunicorn with Uvicorn workers
3. **Set up database connection pooling**
4. **Configure proper logging**
5. **Set up monitoring and health checks**

```bash
# Production command example
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 📝 License

This project is part of the NutriFlow application.
