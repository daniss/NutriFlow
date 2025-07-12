# NutriFlow Unsubscribe Feature

## Overview
A complete unsubscribe system for NutriFlow newsletter subscribers with both frontend and backend components.

## Frontend (`/unsubscribe`)

### Features
- **Clean, responsive design** using NutriFlow's emerald/teal branding
- **Pre-filled email support** via query parameter: `/unsubscribe?email=user@domain.com`
- **Success/error state management** with French localization
- **Loading states** with spinner during API calls
- **Form validation** with required email field

### Usage Examples
```
# Basic unsubscribe page
http://localhost:3001/unsubscribe

# Pre-filled email
http://localhost:3001/unsubscribe?email=user@example.com
```

### Error Handling
- **Invalid email format**: "Adresse email invalide. Veuillez vérifier le format."
- **Email not found**: "Cette adresse email n'est pas inscrite à nos communications."
- **Rate limiting**: "Trop de tentatives. Veuillez réessayer dans quelques minutes."
- **Connection errors**: "Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer."

## Backend API (`POST /api/unsubscribe`)

### Endpoint
```
POST /api/unsubscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Response Format
**Success (200)**:
```json
{
  "message": "Vous avez été désabonné(e) avec succès.",
  "email": "user@example.com"
}
```

**Error (400/404/429)**:
```json
{
  "detail": "Cette adresse email n'est pas inscrite à nos communications."
}
```

### Security Features
- **Email format validation** with regex and security checks
- **Rate limiting** per IP address
- **Request tracking** with unique request IDs
- **SQL injection protection** via SQLAlchemy ORM
- **Comprehensive logging** for monitoring and debugging

### Data Storage
Unsubscribed emails are stored in `/backend/unsubscribed_emails.json`:
```json
[
  "user1@example.com",
  "user2@example.com"
]
```

> **Production Note**: In production, consider using a database table, Redis set, or external service like SendGrid suppressions for better performance and persistence.

## Development Setup

### Prerequisites
- Docker and Docker Compose
- Node.js (for frontend development)

### Quick Start
1. **Start backend services**:
   ```bash
   cd /home/danis/code/NutriFlow
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Start frontend** (already running):
   ```bash
   npm run dev  # Running on http://localhost:3001
   ```

3. **Test the feature**:
   - Visit: http://localhost:3001/unsubscribe
   - API: http://localhost:8000/api/unsubscribe

### Service URLs
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8000
- **Database**: localhost:5433 (PostgreSQL)
- **Redis**: localhost:6380

## API Testing

### Create a subscriber (for testing)
```bash
curl -X POST http://localhost:8000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Test unsubscribe
```bash
curl -X POST http://localhost:8000/api/unsubscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Check health
```bash
curl http://localhost:8000/health
```

## Integration Notes

### For Marketing Emails
Before sending newsletters, check if email is unsubscribed:
```python
from services import SubscriberService

if SubscriberService.is_email_unsubscribed("user@example.com"):
    # Skip sending email
    pass
```

### Email Templates
Include unsubscribe links in all marketing emails:
```html
<a href="https://nutriflow.fr/unsubscribe?email={{ email }}">
  Se désabonner
</a>
```

## Production Considerations

1. **Persistent Storage**: Move from JSON file to database table
2. **Email Service Integration**: Sync with SendGrid/Mailgun suppressions
3. **GDPR Compliance**: Add data deletion capabilities
4. **Analytics**: Track unsubscribe rates and reasons
5. **Bulk Operations**: Support for bulk unsubscribe imports

## File Structure
```
/pages/unsubscribe.tsx          # Frontend React component
/backend/api.py                 # API endpoint (line ~200)
/backend/schemas.py             # Request/response schemas
/backend/services.py            # Business logic
/backend/unsubscribed_emails.json  # Storage file
```
