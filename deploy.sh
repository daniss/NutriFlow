#!/bin/bash

# NutriFlow Production Deployment Script
# Secure deployment with nginx-proxy-manager integration

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="nutriflow"
BACKUP_DIR="./backups"
LOG_FILE="./deployment.log"

# Functions
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" | tee -a "$LOG_FILE"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}" | tee -a "$LOG_FILE"
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}" | tee -a "$LOG_FILE"
}

# Check prerequisites
check_prerequisites() {
    info "Checking prerequisites..."
    
    # Check if Docker is installed and running
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed"
    fi
    
    if ! docker info &> /dev/null; then
        error "Docker is not running"
    fi
    
    # Check if Docker Compose is available
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        error "Docker Compose is not installed"
    fi
    
    # Check if .env file exists
    if [[ ! -f .env ]]; then
        error ".env file not found. Copy .env.production to .env and configure it"
    fi
    
    # Check if nginx-proxy-manager network exists
    if ! docker network ls | grep -q "nginx-proxy-manager"; then
        warning "nginx-proxy-manager network not found. Creating it..."
        docker network create nginx-proxy-manager || error "Failed to create nginx-proxy-manager network"
    fi
    
    success "Prerequisites check passed"
}

# Create backup
create_backup() {
    info "Creating backup..."
    
    mkdir -p "$BACKUP_DIR"
    
    # Backup database if containers are running
    if docker ps | grep -q "${PROJECT_NAME}_db"; then
        BACKUP_FILE="$BACKUP_DIR/database_backup_$(date +%Y%m%d_%H%M%S).sql"
        docker exec "${PROJECT_NAME}_db" pg_dumpall -U postgres > "$BACKUP_FILE" || warning "Database backup failed"
        success "Database backup created: $BACKUP_FILE"
    fi
    
    # Backup environment file
    if [[ -f .env ]]; then
        cp .env "$BACKUP_DIR/.env.backup.$(date +%Y%m%d_%H%M%S)"
        success "Environment file backed up"
    fi
}

# Build images
build_images() {
    info "Building Docker images..."
    
    # Build backend
    info "Building backend image..."
    docker build -t ${PROJECT_NAME}_backend ./backend || error "Failed to build backend image"
    
    # Build frontend
    info "Building frontend image..."
    docker build -f Dockerfile.frontend -t ${PROJECT_NAME}_frontend . || error "Failed to build frontend image"
    
    success "All images built successfully"
}

# Deploy services
deploy_services() {
    info "Deploying services..."
    
    # Stop existing containers gracefully
    if docker-compose ps | grep -q "Up"; then
        info "Stopping existing containers..."
        docker-compose down --timeout 30 || warning "Some containers didn't stop gracefully"
    fi
    
    # Start services
    info "Starting services..."
    docker-compose up -d || error "Failed to start services"
    
    # Wait for services to be healthy
    info "Waiting for services to be healthy..."
    sleep 10
    
    # Check API health
    for i in {1..30}; do
        if docker exec ${PROJECT_NAME}_api curl -f http://localhost:8000/health &> /dev/null; then
            success "API is healthy"
            break
        fi
        if [[ $i -eq 30 ]]; then
            error "API health check failed after 5 minutes"
        fi
        sleep 10
    done
    
    # Check frontend health
    for i in {1..30}; do
        if docker exec ${PROJECT_NAME}_frontend curl -f http://localhost:3000 &> /dev/null; then
            success "Frontend is healthy"
            break
        fi
        if [[ $i -eq 30 ]]; then
            error "Frontend health check failed after 5 minutes"
        fi
        sleep 10
    done
    
    success "All services deployed and healthy"
}

# Show status
show_status() {
    info "Deployment status:"
    echo
    docker-compose ps
    echo
    
    info "Container logs (last 10 lines):"
    echo "=== API Logs ==="
    docker-compose logs --tail=10 api
    echo
    echo "=== Frontend Logs ==="
    docker-compose logs --tail=10 frontend
    echo
    
    info "Next steps:"
    echo "1. Configure nginx-proxy-manager to proxy:"
    echo "   - ${DOMAIN:-nutriflow.fr} -> frontend:3000"
    echo "   - api.${DOMAIN:-nutriflow.fr} -> api:8000"
    echo "2. Set up SSL certificates"
    echo "3. Configure DNS records"
    echo "4. Test the application"
}

# Rollback function
rollback() {
    warning "Rolling back deployment..."
    
    docker-compose down || true
    
    # Restore from latest backup if available
    LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/*.sql 2>/dev/null | head -1 || echo "")
    if [[ -n "$LATEST_BACKUP" ]]; then
        info "Restoring database from: $LATEST_BACKUP"
        # Start only the database for restore
        docker-compose up -d db
        sleep 10
        docker exec -i ${PROJECT_NAME}_db psql -U postgres < "$LATEST_BACKUP" || warning "Database restore failed"
    fi
    
    warning "Rollback completed"
}

# Main deployment process
main() {
    log "Starting NutriFlow production deployment"
    
    # Handle interrupts for rollback
    trap rollback INT TERM
    
    check_prerequisites
    create_backup
    build_images
    deploy_services
    show_status
    
    success "Deployment completed successfully!"
    log "Deployment completed successfully"
}

# Script entry point
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
