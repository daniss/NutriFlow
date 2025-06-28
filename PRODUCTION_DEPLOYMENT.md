# 🚀 NutriFlow Production Deployment Guide

## 🏗️ Architecture Overview

This production setup includes:
- **Frontend**: Next.js application (port 3000)
- **Backend**: FastAPI application (port 8000) 
- **Database**: PostgreSQL with persistent storage
- **Cache**: Redis for rate limiting and caching
- **Proxy**: Designed for nginx-proxy-manager integration
- **Security**: Internal networks, no unnecessary port exposure

## 📋 Prerequisites

### Server Requirements
- **OS**: Ubuntu 20.04+ or similar Linux distribution
- **RAM**: Minimum 2GB (4GB recommended)
- **Storage**: 20GB+ available space
- **Network**: Public IP with ports 80/443 available

### Software Requirements
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt update
sudo apt install docker-compose-plugin

# Logout and login again for group changes
```

## 🔧 Installation Steps

### 1. Clone and Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd NutriFlow

# Copy environment template
cp .env.production .env
nano .env  # Configure your values
```

### 2. Configure Environment Variables
Edit `.env` with your production values:
```bash
# Required - Change these values
DOMAIN=yourdomain.com
POSTGRES_PASSWORD=your_strong_db_password
REDIS_PASSWORD=your_strong_redis_password
SECRET_KEY=your_32_char_secret_key

# Optional - Customize if needed
POSTGRES_DB=nutriflow_db
POSTGRES_USER=nutriflow_user
RATE_LIMIT_REQUESTS=5
RATE_LIMIT_WINDOW=300
```

### 3. Setup nginx-proxy-manager Network
```bash
# Create the external network for nginx-proxy-manager
docker network create nginx-proxy-manager
```

### 4. Deploy Application
```bash
# Run the deployment script
./deploy.sh
```

## 🔒 nginx-proxy-manager Configuration

### Setup nginx-proxy-manager (if not already installed)
```bash
# Create nginx-proxy-manager directory
mkdir nginx-proxy-manager
cd nginx-proxy-manager

# Create docker-compose.yml for nginx-proxy-manager
cat > docker-compose.yml << EOF
version: '3.8'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    networks:
      - nginx-proxy-manager

networks:
  nginx-proxy-manager:
    external: true
EOF

# Start nginx-proxy-manager
docker-compose up -d
```

### Configure Proxy Hosts in nginx-proxy-manager

1. **Access nginx-proxy-manager**: `http://your-server-ip:81`
2. **Default login**: `admin@example.com` / `changeme`
3. **Add Proxy Hosts**:

#### Frontend (Main Website)
- **Domain Names**: `yourdomain.com`, `www.yourdomain.com`
- **Scheme**: `http`
- **Forward Hostname/IP**: `nutriflow_frontend`
- **Forward Port**: `3000`
- **Enable SSL**: Yes (Let's Encrypt)

#### Backend (API)
- **Domain Names**: `api.yourdomain.com`
- **Scheme**: `http`
- **Forward Hostname/IP**: `nutriflow_api`
- **Forward Port**: `8000`
- **Enable SSL**: Yes (Let's Encrypt)

## 🛡️ Security Features

### Network Security
- **Internal Network**: Database and Redis are isolated
- **No Direct Exposure**: Only frontend and API are accessible via proxy
- **Trusted Hosts**: API validates Host headers

### Application Security
- **Rate Limiting**: Configurable per endpoint
- **CORS Protection**: Strict origin validation
- **Security Headers**: CSP, HSTS, X-Frame-Options, etc.
- **Input Validation**: Email validation and sanitization

### Infrastructure Security
- **Container Isolation**: Services run in separate containers
- **Non-root Users**: Containers run as non-privileged users
- **Resource Limits**: Memory and CPU limits configured
- **Health Checks**: Automatic container restart on failure

## 📊 Monitoring and Maintenance

### Check Application Status
```bash
# View container status
docker-compose ps

# View logs
docker-compose logs -f api
docker-compose logs -f frontend
docker-compose logs -f db

# Check health endpoints
curl https://api.yourdomain.com/health
curl https://yourdomain.com
```

### Database Management
```bash
# Backup database
docker exec nutriflow_db pg_dump -U nutriflow_user nutriflow_db > backup.sql

# Access database
docker exec -it nutriflow_db psql -U nutriflow_user -d nutriflow_db

# View database size
docker exec nutriflow_db psql -U nutriflow_user -d nutriflow_db -c "SELECT pg_size_pretty(pg_database_size('nutriflow_db'));"
```

### Update Application
```bash
# Pull latest code
git pull origin main

# Redeploy
./deploy.sh
```

## 🔧 Troubleshooting

### Common Issues

#### Containers Not Starting
```bash
# Check logs
docker-compose logs

# Check resources
docker system df
free -h
```

#### Database Connection Issues
```bash
# Check database health
docker exec nutriflow_db pg_isready -U nutriflow_user

# Reset database
docker-compose down
docker volume rm nutriflow_postgres_data
docker-compose up -d
```

#### SSL Certificate Issues
- Ensure DNS records point to your server
- Check nginx-proxy-manager logs
- Verify ports 80/443 are open

#### High Memory Usage
```bash
# Check container resources
docker stats

# Adjust memory limits in docker-compose.yml
# Restart services
docker-compose restart
```

### Performance Optimization

#### Database Optimization
```sql
-- Connect to database and run:
VACUUM ANALYZE;
REINDEX DATABASE nutriflow_db;
```

#### Redis Optimization
```bash
# Monitor Redis memory usage
docker exec nutriflow_redis redis-cli info memory

# Clear cache if needed
docker exec nutriflow_redis redis-cli FLUSHALL
```

## 📈 Scaling Considerations

### Horizontal Scaling
- Use Docker Swarm or Kubernetes for multi-node deployment
- Implement external Redis cluster
- Use managed PostgreSQL (AWS RDS, DigitalOcean Database)

### Vertical Scaling
- Increase container resource limits
- Upgrade server specifications
- Optimize database queries

## 🔄 Backup Strategy

### Automated Backups
```bash
# Create backup script
cat > /etc/cron.daily/nutriflow-backup << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups/nutriflow"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Database backup
docker exec nutriflow_db pg_dump -U nutriflow_user nutriflow_db | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Environment backup
cp /path/to/nutriflow/.env $BACKUP_DIR/env_$DATE

# Keep only last 7 days
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete
find $BACKUP_DIR -name "env_*" -mtime +7 -delete
EOF

chmod +x /etc/cron.daily/nutriflow-backup
```

## 📞 Support

### Getting Help
- Check logs first: `docker-compose logs`
- Review this documentation
- Check nginx-proxy-manager documentation
- Contact: hello@nutriflow.fr

### Maintenance Schedule
- **Daily**: Automated backups
- **Weekly**: Check logs and performance
- **Monthly**: Update dependencies and review security
- **Quarterly**: Full system review and optimization

---

**🎉 Your NutriFlow application is now production-ready with enterprise-grade security and scalability!**
