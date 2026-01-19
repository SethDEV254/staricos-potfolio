# 🚀 Deploy Seth Cryptolord Portfolio to Hostinger

## Quick Deploy Guide

### Step 1: Prepare Files for Upload

All files are ready in the `seths portfolio` folder:
- index.html
- script.js
- styles.css
- modern-portfolio.html
- images/ (folder with seth.png and bbt-logo.png)
- All other files

### Step 2: Access Hostinger File Manager

1. **Login to Hostinger**: https://hpanel.hostinger.com
2. Go to **File Manager**
3. Navigate to `public_html` folder (or your domain's root folder)

### Step 3: Upload Files

**Option A: Using File Manager (Recommended)**

1. In File Manager, go to `public_html`
2. Click **Upload Files**
3. Select ALL files from `seths portfolio` folder:
   - index.html
   - script.js
   - styles.css
   - modern-portfolio.html
   - vercel.json (optional, not needed for Hostinger)
   - All .md and .txt files (optional)
4. Upload the **images** folder with all contents
5. Wait for upload to complete

**Option B: Using FTP (FileZilla)**

1. Download FileZilla: https://filezilla-project.org
2. Get FTP credentials from Hostinger:
   - Go to Hostinger → File Manager → FTP Accounts
   - Note: Host, Username, Password, Port
3. Connect via FileZilla
4. Navigate to `public_html` on remote side
5. Drag and drop all files from `seths portfolio` folder

### Step 4: Set Correct Permissions

In File Manager, set permissions for:
- **Folders**: 755
- **Files**: 644

Right-click → Change Permissions

### Step 5: Configure Domain (If Using Custom Domain)

If you have a domain like `sethcryptolord.com`:

1. Go to Hostinger → Domains
2. Point domain to your hosting
3. Wait for DNS propagation (24-48 hours)

### Step 6: Test Your Site

Visit your domain:
- `https://yourdomain.com`
- Or temporary URL from Hostinger

## Files to Upload

### Required Files:
```
seths portfolio/
├── index.html              ← Main portfolio page
├── script.js               ← Terminal functionality
├── styles.css              ← All styling
├── modern-portfolio.html   ← Alternative design
└── images/
    ├── seth.png           ← Profile image
    └── bbt-logo.png       ← Company logo
```

### Optional Files (Documentation):
- README.md
- DEPLOY_HOSTINGER.md
- GITHUB_SETUP.md
- QUICKSTART.txt
- SETUP_COMPLETE.txt

## Hostinger-Specific Settings

### .htaccess File (Optional - for better performance)

Create a `.htaccess` file in `public_html`:

```apache
# Enable GZIP Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## SSL Certificate

Hostinger provides free SSL:
1. Go to Hostinger → SSL
2. Enable SSL for your domain
3. Force HTTPS redirect

## Troubleshooting

### Images Not Loading
- Check file paths in HTML
- Ensure images folder uploaded correctly
- Verify file permissions (644 for files, 755 for folders)

### 404 Error
- Make sure `index.html` is in `public_html` root
- Check file name is exactly `index.html` (lowercase)

### Slow Loading
- Enable GZIP compression (.htaccess)
- Optimize images (compress if needed)
- Enable browser caching

### Terminal Not Working
- Check if `script.js` uploaded correctly
- Verify JavaScript is enabled in browser
- Check browser console for errors

## Performance Optimization

1. **Enable Cloudflare** (Free via Hostinger)
   - Go to Hostinger → Cloudflare
   - Enable for your domain
   - Automatic CDN and caching

2. **Compress Images**
   - Use TinyPNG or similar
   - Reduce file sizes without quality loss

3. **Minify Files** (Optional)
   - Minify CSS and JS for production
   - Use online tools or build process

## Backup

Always keep a backup:
1. Download files via File Manager
2. Or use FTP to download entire site
3. Keep GitHub repository as backup

## Update Portfolio

To update after changes:
1. Edit files locally
2. Upload changed files via File Manager or FTP
3. Clear browser cache to see changes

## Custom Domain Setup

If using custom domain:

1. **Update DNS Records**:
   ```
   Type: A
   Name: @
   Value: [Your Hostinger IP]
   
   Type: CNAME
   Name: www
   Value: yourdomain.com
   ```

2. **Wait for Propagation**: 24-48 hours

3. **Enable SSL**: Hostinger → SSL → Enable

## Support

- Hostinger Support: https://www.hostinger.com/contact
- Live Chat: Available 24/7
- Knowledge Base: https://support.hostinger.com

## Your Live URLs

After deployment:
- **Main Site**: `https://yourdomain.com`
- **Alternative**: `https://yourdomain.com/modern-portfolio.html`

## Features Deployed

✅ Interactive terminal interface
✅ Seth's cartoon avatar
✅ Moving description banner
✅ MetaHub Academy & BullBear Trading logos
✅ 15+ terminal commands
✅ AI assistant
✅ Dark/Light mode
✅ Mobile responsive
✅ SEO optimized
✅ Developer credits (@starico)

---

**Your portfolio will be live in minutes!** 🚀

Professional showcase for:
- 🎯 Professional Trader
- 📚 Trainer & Consultant
- 💼 CEO of MetaHub Academy & BullBear Trading
- ✍️ Author of "6 Figure Affiliate" & "Crypto Truth Guide"
