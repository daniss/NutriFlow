#!/bin/bash

# NutriFlow Docker Management Script
# Provides easy commands for managing the Docker environment

set -e

show_help() {
    echo "🐳 NutriFlow Docker Management"
    echo ""
    echo "Usage: ./docker-manage.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start         Start all services"
    echo "  stop          Stop all services"
    echo "  restart       Restart all services"
    echo "  rebuild       Rebuild and restart all services"
    echo "  logs          Show logs for all services"
    echo "  logs-api      Show API logs"
    echo "  logs-db       Show database logs"
    echo "  status        Show status of all services"
    echo "  shell-api     Open shell in API container"
    echo "  shell-db      Open PostgreSQL shell"
    echo "  test          Run API tests"
    echo "  clean         Stop services and remove volumes"
    echo "  reset         Complete reset (remove everything)"
    echo "  help          Show this help"
    echo ""
}

case "$1" in
    start)
        echo "🚀 Starting NutriFlow services..."
        docker compose up -d
        echo "✅ Services started"
        docker compose ps
        ;;
    
    stop)
        echo "🛑 Stopping NutriFlow services..."
        docker compose down
        echo "✅ Services stopped"
        ;;
    
    restart)
        echo "🔄 Restarting NutriFlow services..."
        docker compose restart
        echo "✅ Services restarted"
        docker compose ps
        ;;
    
    rebuild)
        echo "🏗️  Rebuilding and restarting services..."
        docker compose down
        docker compose up --build -d
        echo "✅ Services rebuilt and started"
        docker compose ps
        ;;
    
    logs)
        echo "📋 Showing logs for all services..."
        docker compose logs -f
        ;;
    
    logs-api)
        echo "📋 Showing API logs..."
        docker compose logs -f api
        ;;
    
    logs-db)
        echo "📋 Showing database logs..."
        docker compose logs -f db
        ;;
    
    status)
        echo "📊 Service status:"
        docker compose ps
        echo ""
        echo "🔍 Health checks:"
        curl -s http://localhost:8000/health 2>/dev/null && echo "✅ API is healthy" || echo "❌ API is not responding"
        ;;
    
    shell-api)
        echo "🐚 Opening shell in API container..."
        docker compose exec api /bin/bash
        ;;
    
    shell-db)
        echo "🐚 Opening PostgreSQL shell..."
        docker compose exec db psql -U nutriflow_user -d nutriflow_db
        ;;
    
    test)
        echo "🧪 Running API tests..."
        if curl -s http://localhost:8000/health &> /dev/null; then
            python test_api.py
        else
            echo "❌ API is not running. Start services first with: ./docker-manage.sh start"
        fi
        ;;
    
    clean)
        echo "🧹 Cleaning up services and volumes..."
        docker compose down -v
        echo "✅ Cleanup complete"
        ;;
    
    reset)
        echo "⚠️  This will remove all data and containers. Are you sure? (y/N)"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            echo "🗑️  Performing complete reset..."
            docker compose down -v --remove-orphans
            docker system prune -f
            echo "✅ Complete reset done"
        else
            echo "❌ Reset cancelled"
        fi
        ;;
    
    help|--help|-h)
        show_help
        ;;
    
    *)
        if [ -z "$1" ]; then
            show_help
        else
            echo "❌ Unknown command: $1"
            echo ""
            show_help
        fi
        exit 1
        ;;
esac
