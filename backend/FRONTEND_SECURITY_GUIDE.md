# 🔐 Frontend Security Checklist for NutriFlow

## ✅ Email Submission Form Security

### 1. **Form Validation (Client-Side)**
```javascript
// Add to your Next.js form component
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  if (email.length > 254) return false; // RFC 5321 limit
  if (email.includes('..')) return false; // Double dots
  return true;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Client-side validation
  if (!validateEmail(email)) {
    setError('Format d\'email invalide');
    return;
  }
  
  // Rate limiting check (optional client-side)
  const lastSubmission = localStorage.getItem('lastEmailSubmission');
  if (lastSubmission && Date.now() - parseInt(lastSubmission) < 60000) {
    setError('Veuillez patienter avant de soumettre à nouveau');
    return;
  }
  
  try {
    const response = await fetch('http://localhost:8000/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': window.location.origin,
      },
      body: JSON.stringify({ email: email.toLowerCase().trim() }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('lastEmailSubmission', Date.now().toString());
      setSuccess(data.message);
      setEmail(''); // Clear form
    } else {
      setError(data.detail || 'Une erreur s\'est produite');
    }
  } catch (error) {
    setError('Erreur de connexion. Veuillez réessayer.');
  }
};
```

### 2. **Bot Protection & Honeypot**
```javascript
// Add hidden honeypot field to your form
<input
  type="text"
  name="website"
  tabIndex="-1"
  autoComplete="off"
  style={{
    position: 'absolute',
    left: '-9999px',
    opacity: 0,
    pointerEvents: 'none'
  }}
  onChange={(e) => setHoneypot(e.target.value)}
/>

// In your submit handler
if (honeypot) {
  // Likely a bot, silently fail
  setSuccess('Inscription réussie !'); // Fake success
  return;
}
```

### 3. **CSRF Protection**
```javascript
// Add CSRF token to requests (if using cookies)
const getCsrfToken = () => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
};

// In fetch request
headers: {
  'Content-Type': 'application/json',
  'X-CSRF-Token': getCsrfToken(),
  // ...other headers
}
```

### 4. **Input Sanitization**
```javascript
// Sanitize input before sending
const sanitizeEmail = (email) => {
  return email
    .toLowerCase()
    .trim()
    .replace(/[<>'"]/g, '') // Remove dangerous characters
    .substring(0, 254); // Limit length
};
```

### 5. **Error Handling & User Feedback**
```javascript
const handleApiError = (response, data) => {
  switch (response.status) {
    case 400:
      return data.detail || 'Email invalide ou déjà inscrit';
    case 429:
      return `Trop de tentatives. Réessayez dans ${data.retry_after || 15} minutes.`;
    case 422:
      return 'Format d\'email invalide';
    case 500:
      return 'Erreur serveur. Veuillez réessayer plus tard.';
    default:
      return 'Une erreur inattendue s\'est produite';
  }
};
```

## 🛡️ Additional Security Measures

### 1. **Content Security Policy (CSP)**
Add to your `next.config.js`:
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' http://localhost:8000;"
          }
        ]
      }
    ];
  }
};
```

### 2. **Environment Variables**
Create `.env.local` for frontend:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENVIRONMENT=development
```

### 3. **Rate Limiting Display**
```javascript
const [rateLimitInfo, setRateLimitInfo] = useState(null);

// After API call, check headers
const remaining = response.headers.get('X-RateLimit-Remaining');
const reset = response.headers.get('X-RateLimit-Reset');

if (remaining !== null) {
  setRateLimitInfo({
    remaining: parseInt(remaining),
    resetTime: new Date(parseInt(reset) * 1000)
  });
}

// Display to user
{rateLimitInfo && rateLimitInfo.remaining < 2 && (
  <p className="text-amber-600 text-sm">
    ⚠️ {rateLimitInfo.remaining} tentative(s) restante(s)
  </p>
)}
```

## 🧹 Frontend Cleanup Tasks

### 1. **Remove Unused Files**
```bash
# Remove if they exist
rm -f pages/api/subscribe.ts  # Old API route (replaced by FastAPI)
rm -rf components/unused/     # Any unused components
rm -rf public/unused-assets/  # Unused images/icons
```

### 2. **Update API Endpoint**
Replace any references to `/api/subscribe` with your FastAPI endpoint:
```javascript
// OLD (Next.js API route)
fetch('/api/subscribe', ...)

// NEW (FastAPI backend)
fetch('http://localhost:8000/api/subscribe', ...)
// Or using environment variable
fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, ...)
```

### 3. **Remove Unused Dependencies**
Check `package.json` and remove unused packages:
```bash
npm uninstall package-name  # Remove unused packages
npm audit fix               # Fix security vulnerabilities
```

### 4. **Add Error Logging**
```javascript
const logError = (error, context) => {
  // In production, send to your logging service
  if (process.env.NODE_ENV === 'production') {
    // Send to logging service (e.g., Sentry, LogRocket)
    console.error('Form Error:', { error, context, timestamp: new Date().toISOString() });
  } else {
    console.error('Form Error:', error);
  }
};
```

## 📊 Monitoring & Analytics

### 1. **Track Failed Submissions**
```javascript
const trackFailedSubmission = (error, email) => {
  // Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submission_failed', {
      event_category: 'engagement',
      event_label: error,
      custom_parameter: 'email_signup'
    });
  }
};
```

### 2. **Success Metrics**
```javascript
const trackSuccessfulSubmission = () => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'email_signup_success', {
      event_category: 'conversion',
      event_label: 'newsletter_signup'
    });
  }
};
```

## 🔄 Production Checklist

- [ ] Update API URLs for production
- [ ] Implement proper CSRF protection
- [ ] Add comprehensive error logging
- [ ] Set up monitoring/alerting
- [ ] Configure CSP headers
- [ ] Test rate limiting behavior
- [ ] Verify CORS settings
- [ ] Add analytics tracking
- [ ] Test with various email formats
- [ ] Verify mobile responsiveness
- [ ] Test bot protection measures
