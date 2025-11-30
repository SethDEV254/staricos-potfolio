# Starico Portfolio - Full Stack

> Modern portfolio website with terminal interface and backend API

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

### Frontend
- **Interactive Terminal Interface** - Unix-style command terminal
- **Modern Design** - Clean, professional UI with dark/light mode
- **Responsive** - Works on all devices
- **SEO Optimized** - Meta tags, structured data, Open Graph
- **Analytics Ready** - PostHog integration

### Backend
- **Contact Form API** - Email notifications via Nodemailer
- **Projects API** - Dynamic project data with filtering
- **Analytics Tracking** - Page views and custom events
- **Security** - Helmet, CORS, rate limiting, input validation
- **Production Ready** - Easy deployment to Railway, Heroku, Vercel

## 📁 Project Structure

```
├── index.html              # Main portfolio page
├── script.js               # Terminal functionality
├── styles.css              # Styling
├── api.js                  # Frontend API integration
├── contact-form.html       # Contact form page
├── backend/                # Backend API
│   ├── server.js          # Express server
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── utils/             # Utilities
│   └── config/            # Configuration
├── QUICKSTART.md          # Quick setup guide
└── README.md              # This file
```

## 🎯 Quick Start

### Prerequisites
- Node.js 18+ installed
- Gmail account for email notifications
- Git installed

### 1. Clone Repository

```bash
git clone https://github.com/dollarpath1/portfolio.git
cd portfolio
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add your Gmail app password:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### 3. Start Backend

```bash
npm run dev
```

Backend runs on: http://localhost:5000

### 4. Open Frontend

Open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

Frontend runs on: http://localhost:8000

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - 5-minute setup
- **[Backend Setup](backend/SETUP.md)** - Detailed backend configuration
- **[Deployment Guide](backend/DEPLOYMENT.md)** - Deploy to production
- **[API Documentation](backend/README.md)** - API endpoints reference

## 🌐 API Endpoints

```
POST   /api/contact              - Submit contact form
GET    /api/projects             - Get all projects
GET    /api/projects/:id         - Get single project
POST   /api/analytics/pageview   - Track page view
POST   /api/analytics/event      - Track custom event
GET    /health                   - Health check
```

## 🎨 Terminal Commands

Type these commands in the terminal interface:

```bash
help        # Show all commands
about       # About Starico
skills      # Technical skills
projects    # View projects
experience  # Work experience
education   # Educational background
contact     # Contact information
github      # GitHub profile
resume      # Download resume
ai          # Chat with AI assistant
clear       # Clear terminal
```

## 🔧 Configuration

### Frontend Configuration

Update `api.js` with your backend URL:

```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

### Backend Configuration

Environment variables in `backend/.env`:

```env
PORT=5000
NODE_ENV=development
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=your-email@gmail.com
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## 🚀 Deployment

### Deploy Backend

**Railway (Recommended):**
```bash
cd backend
railway login
railway init
railway up
```

**Heroku:**
```bash
cd backend
heroku create portfolio-backend
git push heroku main
```

**Vercel:**
```bash
cd backend
vercel --prod
```

### Deploy Frontend

**GitHub Pages:**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

Enable GitHub Pages in repository settings.

**Netlify:**
- Connect your GitHub repository
- Build command: (none)
- Publish directory: `/`

**Vercel:**
```bash
vercel --prod
```

## 🧪 Testing

Test the backend API:

```bash
# Open test page
open backend/test-api.html

# Or use curl
curl http://localhost:5000/health
curl http://localhost:5000/api/projects
```

## 🔒 Security Features

- ✅ Helmet.js security headers
- ✅ CORS protection
- ✅ Rate limiting (100 req/15min)
- ✅ Input validation
- ✅ Environment variable protection
- ✅ XSS protection
- ✅ SQL injection prevention

## 📊 Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Responsive Design
- Terminal UI
- PostHog Analytics

### Backend
- Node.js & Express
- Nodemailer (Email)
- MongoDB (Optional)
- Helmet (Security)
- Express Rate Limit

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 👤 Author

**Starico John**
- GitHub: [@dollarpath1](https://github.com/dollarpath1)
- Email: dollarpath1@gmail.com
- Portfolio: [starico.me](https://starico.me)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

## 📞 Contact

Have questions? Reach out:
- Email: dollarpath1@gmail.com
- Twitter: [@dollarpath_ke](https://twitter.com/dollarpath_ke)
- LinkedIn: [starico](https://linkedin.com/in/starico)

---

**Built with ❤️ by Starico**
