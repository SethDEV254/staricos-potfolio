# Portfolio Backend API

Backend API for Starico's portfolio website built with Node.js and Express.

## Features

- Contact form handling with email notifications
- Projects API with filtering
- Analytics tracking
- Rate limiting and security
- MongoDB integration ready
- Email notifications via Nodemailer

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
   - Set your MongoDB URI
   - Configure email settings (Gmail, SendGrid, etc.)
   - Set allowed CORS origins

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Contact
- `POST /api/contact` - Submit contact form

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- Query params: `?category=blockchain&featured=true`

### Analytics
- `POST /api/analytics/pageview` - Track page view
- `POST /api/analytics/event` - Track custom event

### Health
- `GET /health` - Health check endpoint

## Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate app password: https://myaccount.google.com/apppasswords
3. Use app password in EMAIL_PASS

### Other Providers
- SendGrid: Use API key
- Mailgun: Configure SMTP settings
- AWS SES: Configure credentials

## Security Features

- Helmet.js for security headers
- CORS protection
- Rate limiting
- Input validation
- Environment variable protection

## Deployment

### Heroku
```bash
heroku create portfolio-backend
heroku config:set NODE_ENV=production
git push heroku main
```

### Vercel
```bash
vercel --prod
```

### Railway
```bash
railway up
```

## MongoDB Setup (Optional)

If using MongoDB for storing contacts:

1. Create MongoDB Atlas account
2. Create cluster and database
3. Get connection string
4. Update MONGODB_URI in .env
5. Uncomment database connection in server.js

## Testing

Test the API:
```bash
# Health check
curl http://localhost:5000/health

# Get projects
curl http://localhost:5000/api/projects

# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello"}'
```

## License

MIT
