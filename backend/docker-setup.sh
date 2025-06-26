#!/bin/bash

# NutriFlow Docker Setup Script
# This script sets up the complete Docker environment for NutriFlow backend

set -e  # Exit on any error

echo "🐳 Setting up NutriFlow with Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "❌ Docker daemon is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker and Docker Compose are available"

# Create .env file from Docker template
if [ ! -f .env ]; then
    echo "📝 Creating .env file from Docker template..."
    cp .env.docker .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Stop any existing containers
echo "🛑 Stopping any existing containers..."
docker compose down --remove-orphans 2>/dev/null || true

# Remove any existing volumes (optional - uncomment if you want to start fresh)
# echo "🗑️  Removing existing volumes..."
# docker compose down -v 2>/dev/null || true

# Build and start services
echo "🏗️  Building and starting services..."
docker compose up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if database is ready
echo "🔍 Checking database connection..."
max_attempts=30
attempt=1

while [ $attempt -le $max_attempts ]; do
    if docker compose exec -T db pg_isready -U nutriflow_user -d nutriflow_db &> /dev/null; then
        echo "✅ Database is ready!"
        break
    fi
    
    if [ $attempt -eq $max_attempts ]; then
        echo "❌ Database failed to start after $max_attempts attempts"
        docker compose logs db
        exit 1
    fi
    
    echo "   Attempt $attempt/$max_attempts - waiting for database..."
    sleep 2
    ((attempt++))
done

# Check if API is ready
echo "🔍 Checking API connection..."
max_attempts=30
attempt=1

while [ $attempt -le $max_attempts ]; do
    if curl -f http://localhost:8000/health &> /dev/null; then
        echo "✅ API is ready!"
        break
    fi
    
    if [ $attempt -eq $max_attempts ]; then
        echo "❌ API failed to start after $max_attempts attempts"
        docker compose logs api
        exit 1
    fi
    
    echo "   Attempt $attempt/$max_attempts - waiting for API..."
    sleep 3
    ((attempt++))
done

# Test the API
echo "🧪 Testing API endpoints..."
test_email="test-$(date +%s)@example.com"

# Test health endpoint
health_response=$(curl -s http://localhost:8000/health)
if echo "$health_response" | grep -q "healthy"; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed"
    echo "Response: $health_response"
fi

# Test subscribe endpoint
subscribe_response=$(curl -s -X POST "http://localhost:8000/api/subscribe" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"$test_email\"}")

if echo "$subscribe_response" | grep -q "Inscription réussie"; then
    echo "✅ Subscribe endpoint working"
else
    echo "❌ Subscribe endpoint failed"
    echo "Response: $subscribe_response"
fi

# Show running containers
echo ""
echo "🎉 Setup complete! Services are running:"
docker compose ps

echo ""
echo "🔗 Available services:"
echo "   📡 API Server:     http://localhost:8000"
echo "   📖 API Docs:       http://localhost:8000/docs"
echo "   🗄️  Database:       localhost:5432"
echo "   🔧 pgAdmin:        http://localhost:5050"
echo ""
echo "🔑 Database credentials:"
echo "   Host:     localhost"
echo "   Port:     5432"
echo "   Database: nutriflow_db"
echo "   Username: nutriflow_user"
echo "   Password: nutriflow_password_2024"
echo ""
echo "🔑 pgAdmin credentials:"
echo "   Email:    admin@nutriflow.com"
echo "   Password: admin123"
echo ""
echo "💡 Useful commands:"
echo "   View logs:        docker compose logs -f"
echo "   Stop services:    docker compose down"
echo "   Restart:          docker compose restart"
echo "   Rebuild:          docker compose up --build -d"
echo ""
echo "🧪 Test the API:"
echo "   python test_api.py"
echo ""
echo "✅ Your NutriFlow backend is ready to use!"
