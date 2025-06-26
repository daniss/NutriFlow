#!/bin/bash

# NutriFlow Backend Setup Script
# This script sets up the development environment

echo "🚀 Setting up NutriFlow Backend..."

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Please install PostgreSQL first."
    echo "   Ubuntu/Debian: sudo apt install postgresql postgresql-contrib"
    echo "   macOS: brew install postgresql"
    echo "   Or use Docker: docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres"
    exit 1
fi

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    echo "✏️  Please edit .env file with your database credentials"
else
    echo "✅ .env file already exists"
fi

# Create database if it doesn't exist
echo "🗄️  Setting up database..."
createdb nutriflow_dev 2>/dev/null || echo "Database might already exist"

echo ""
echo "✅ Setup complete!"
echo ""
echo "🔥 To start the API server:"
echo "   source venv/bin/activate"
echo "   python main.py"
echo ""
echo "📖 The API will be available at:"
echo "   - API: http://localhost:8000"
echo "   - Docs: http://localhost:8000/docs"
echo ""
echo "🧪 To test the API:"
echo "   python test_api.py"
echo ""
echo "⚙️  Don't forget to:"
echo "   1. Edit .env with your database credentials"
echo "   2. Update your frontend to use the new API endpoint"
