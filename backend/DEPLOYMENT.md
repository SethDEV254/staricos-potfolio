# Deployment Guide - Wealth@2025

## 🚀 Deploy to Railway (Recommended - Free & Easy)

### Step 1: Sign Up
1. Go to https://railway.app/
2. Sign up with GitHub

### Step 2: Deploy
```bash
cd backend
npm install -g @railway/cli
railway login
railway init
railway up
```

### Step 3: Add Environment Variables
In Railway dashboard:
1. Click your project
2. Go to "Variables" tab
3. Add all variables from `.env`:
   - `EMAIL_HOST`
   - `EMAIL_PORT`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `EMAIL_FROM`
   - `EMAIL_TO`
   - `ALLOWED_ORIGINS` (add your domain)
   - `NODE_ENV=production`

### Step 4: Get Your URL
Railway will give you a URL like: `https://your-app.railway.app`

Update `api.js`:
```javascript
const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : 'https://your-app.railway.app/api';
```

---

## 🌐 Deploy to Heroku

### Step 1: Install Heroku CLI
Download from: https://devcenter.heroku.com/articles/heroku-cli

### Step 2: Deploy
```bash
cd backend
heroku login
heroku create portfolio-backend-starico
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### Step 3: Set Environment Variables
```bash
heroku config:set EMAIL_HOST=smtp.gmail.com
heroku config:set EMAIL_PORT=587
heroku config:set EMAIL_USER=dollarpath1@gmail.com
heroku config:set EMAIL_PASS=your-app-password
heroku config:set EMAIL_FROM=dollarpath1@gmail.com
heroku config:set EMAIL_TO=dollarpath1@gmail.com
heroku config:set ALLOWED_ORIGINS=https://starico.me
heroku config:set NODE_ENV=production
```

### Step 4: Open Your App
```bash
heroku open
```

---

## ⚡ Deploy to Vercel

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Create vercel.json
Already created in backend folder!

### Step 3: Deploy
```bash
cd backend
vercel --prod
```

### Step 4: Add Environment Variables
In Vercel dashboard or via CLI:
```bash
vercel env add EMAIL_HOST
vercel env add EMAIL_PORT
vercel env add EMAIL_USER
vercel env add EMAIL_PASS
vercel env add EMAIL_FROM
vercel env add EMAIL_TO
vercel env add ALLOWED_ORIGINS
vercel env add NODE_ENV
```

---

## 🔧 Deploy to Render

### Step 1: Sign Up
Go to https://render.com/

### Step 2: Create Web Service
1. Click "New +"
2. Select "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Name:** portfolio-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### Step 3: Add Environment Variables
In Render dashboard, add all variables from `.env`

---

## 🌍 Deploy to Your Own VPS (DigitalOcean, AWS, etc.)

### Step 1: SSH into Server
```bash
ssh root@your-server-ip
```

### Step 2: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 3: Clone & Setup
```bash
cd /var/www
git clone your-repo-url backend
cd backend
npm install
```

### Step 4: Create .env File
```bash
nano .env
# Paste your environment variables
```

### Step 5: Install PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start server.js --name portfolio-backend
pm2 startup
pm2 save
```

### Step 6: Setup Nginx (Optional)
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/backend
```

Add:
```nginx
server {
    listen 80;
    server_name api.starico.me;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable:
```bash
sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 📊 Post-Deployment Checklist

- [ ] Backend is accessible at your URL
- [ ] `/health` endpoint returns `{"status":"ok"}`
- [ ] Contact form sends emails successfully
- [ ] CORS is configured for your domain
- [ ] Environment variables are set
- [ ] HTTPS is enabled (use Cloudflare or Let's Encrypt)
- [ ] Rate limiting is working
- [ ] Error logging is set up
- [ ] Monitoring is configured (optional)

---

## 🔒 Security Best Practices

1. **Use HTTPS** - Always use SSL in production
2. **Environment Variables** - Never commit `.env` to git
3. **Rate Limiting** - Already configured (100 req/15min)
4. **CORS** - Only allow your domain
5. **Input Validation** - Already implemented
6. **Keep Updated** - Run `npm audit` regularly

---

## 📈 Monitoring (Optional)

### Add Logging Service
- **Logtail**: https://logtail.com/
- **Papertrail**: https://papertrailapp.com/
- **Sentry**: https://sentry.io/

### Add Uptime Monitoring
- **UptimeRobot**: https://uptimerobot.com/
- **Pingdom**: https://www.pingdom.com/

---

## 🆘 Troubleshooting

### Backend not starting?
```bash
# Check logs
pm2 logs portfolio-backend

# Or on Heroku
heroku logs --tail
```

### Email not sending?
- Verify Gmail app password
- Check EMAIL_* variables
- Look for errors in logs
- Test with: `curl -X POST your-url/api/contact -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Testing"}'`

### CORS errors?
- Add your frontend domain to ALLOWED_ORIGINS
- Restart the backend
- Clear browser cache

---

## 💰 Cost Estimates

| Platform | Free Tier | Paid |
|----------|-----------|------|
| Railway | 500 hours/month | $5/month |
| Heroku | 550 hours/month | $7/month |
| Vercel | Unlimited | $20/month |
| Render | 750 hours/month | $7/month |
| DigitalOcean | - | $5/month |

**Recommendation:** Start with Railway or Render free tier!

---

## 🎉 You're Done!

Your backend is now live and ready to handle:
- ✅ Contact form submissions
- ✅ Project API requests
- ✅ Analytics tracking
- ✅ Email notifications

Update your frontend `api.js` with the deployed URL and you're all set!
