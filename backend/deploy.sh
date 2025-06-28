#!/bin/bash
# Production deployment script for NutriFlow

set -e

echo "🚀 Starting NutriFlow production deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    echo -e "${YELLOW}Copy .env.production.example to .env and fill in the values:${NC}"
    echo "cp .env.production.example .env"
    echo "nano .env"
    exit 1
fi

# Check if required environment variables are set
source .env
required_vars=("SECRET_KEY" "POSTGRES_PASSWORD" "ALLOWED_ORIGINS")
missing_vars=()

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo -e "${RED}❌ Error: Missing required environment variables:${NC}"
    printf '%s\n' "${missing_vars[@]}"
    exit 1
fi

# Check if SSL certificates exist (for HTTPS)
if [ ! -f "ssl/nutriflow.fr.crt" ] || [ ! -f "ssl/nutriflow.fr.key" ]; then
    echo -e "${YELLOW}⚠️  Warning: SSL certificates not found!${NC}"
    echo "Generate SSL certificates with Let's Encrypt or place them in ssl/ directory"
    echo "For now, you can comment out the nginx service in docker-compose.prod.yml"
fi

echo -e "${BLUE}📋 Pre-deployment checklist:${NC}"
echo "✅ Environment variables configured"
echo "✅ Database credentials set"
echo "✅ CORS origins configured"

# Build and deploy
echo -e "${BLUE}🏗️  Building containers...${NC}"
docker-compose -f docker-compose.prod.yml build --no-cache

echo -e "${BLUE}🗃️  Starting database...${NC}"
docker-compose -f docker-compose.prod.yml up -d db redis

# Wait for database to be ready
echo -e "${BLUE}⏳ Waiting for database to be ready...${NC}"
for i in {1..30}; do
    if docker-compose -f docker-compose.prod.yml exec -T db pg_isready -U ${POSTGRES_USER:-nutriflow_user} -d ${POSTGRES_DB:-nutriflow_db} > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Database is ready!${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ Database failed to start!${NC}"
        docker-compose -f docker-compose.prod.yml logs db
        exit 1
    fi
    sleep 2
done

echo -e "${BLUE}🚀 Starting application...${NC}"
docker-compose -f docker-compose.prod.yml up -d

# Health check
echo -e "${BLUE}🏥 Performing health checks...${NC}"
sleep 10

if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ API is healthy!${NC}"
else
    echo -e "${RED}❌ API health check failed!${NC}"
    docker-compose -f docker-compose.prod.yml logs api
    exit 1
fi

echo -e "${GREEN}🎉 Deployment successful!${NC}"
echo ""
echo -e "${BLUE}📊 Service status:${NC}"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo -e "${BLUE}🔗 Service URLs:${NC}"
echo "API: http://localhost:8000"
echo "API Health: http://localhost:8000/health"
echo "API Docs: http://localhost:8000/docs (only in debug mode)"

echo ""
echo -e "${BLUE}📝 Useful commands:${NC}"
echo "View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "Stop services: docker-compose -f docker-compose.prod.yml down"
echo "Restart API: docker-compose -f docker-compose.prod.yml restart api"

echo ""
echo -e "${GREEN}✨ NutriFlow is now running in production mode!${NC}"
