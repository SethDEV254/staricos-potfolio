# Backend Setup Guide

## Step 1: Install Node.js

If you don't have Node.js installed:
1. Download from https://nodejs.org/
2. Install the LTS version
3. Verify installation: `node --version`

## Step 2: Configure Email

### Option A: Gmail (Recommended for testing)

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate App Password:
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password
4. Update `.env` file:
   ```
   EMAIL_USER=dollarpath1@gmail.com
   EMAIL_PASS=your-16-char-app-password
   ```

### Option B: SendGrid (Recommended for production)

1. Sign up at https://sendgrid.com/
2. Create API key
3. Update `.env`:
   ```
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASS=your-sendgrid-api-key
   ```

## Step 3: Install Dependencies

```bash
cd backend
npm install
```

## Step 4: Start Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

### Windows Quick Start:
Double-click `start.bat`

## Step 5: Test the API

Open browser and visit:
- http://localhost:5000/health

Should see: `{"status":"ok","timestamp":"..."}`

## Step 6: Update Frontend

In `api.js`, update the production URL:
```javascript
const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : 'https://your-deployed-backend.com/api';
```

## Step 7: Test Contact Form

1. Open `contact-form.html` in browser
2. Fill out the form
3. Submit
4. Check your email inbox

## Deployment Options

### Heroku (Free tier available)
```bash
heroku create portfolio-backend
git push heroku main
```

### Railway (Free tier available)
```bash
railway login
railway init
railway up
```

### Vercel
```bash
npm i -g vercel
vercel --prod
```

## Troubleshooting

### Email not sending?
- Check EMAIL_USER and EMAIL_PASS in .env
- Verify Gmail app password is correct
- Check spam folder
- Look at server console for errors

### CORS errors?
- Add your frontend URL to ALLOWED_ORIGINS in .env
- Restart the server after changes

### Port already in use?
- Change PORT in .env to different number (e.g., 5001)
- Or kill the process using port 5000

## Security Notes

- Never commit `.env` file to git
- Use strong app passwords
- Enable rate limiting in production
- Use HTTPS in production
- Keep dependencies updated

## Need Help?

Check the logs in the terminal for error messages.
