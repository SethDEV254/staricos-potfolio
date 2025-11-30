# GitHub Setup Guide

## Push to Both GitHub Accounts

Follow these steps to push your portfolio to both GitHub accounts.

---

## 📋 Prerequisites

1. Git installed: `git --version`
2. GitHub accounts ready:
   - **sethdev254**
   - **dollarpath1**

---

## 🚀 Method 1: Push to Both Accounts (Recommended)

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Portfolio with backend"
```

### Step 2: Create Repositories on GitHub

**For dollarpath1:**
1. Go to: https://github.com/dollarpath1
2. Click "New repository"
3. Name: `portfolio`
4. Description: `Full-stack portfolio with terminal interface and backend API`
5. Public repository
6. Click "Create repository"

**For sethdev254:**
1. Go to: https://github.com/sethdev254
2. Click "New repository"
3. Name: `portfolio`
4. Description: `Full-stack portfolio with terminal interface and backend API`
5. Public repository
6. Click "Create repository"

### Step 3: Push to dollarpath1

```bash
# Add remote for dollarpath1
git remote add dollarpath https://github.com/dollarpath1/portfolio.git

# Push to dollarpath1
git push -u dollarpath main
```

If prompted for credentials:
- Username: `dollarpath1`
- Password: Use Personal Access Token (see below)

### Step 4: Push to sethdev254

```bash
# Add remote for sethdev254
git remote add sethdev https://github.com/sethdev254/portfolio.git

# Push to sethdev254
git push -u sethdev main
```

If prompted for credentials:
- Username: `sethdev254`
- Password: Use Personal Access Token (see below)

### Step 5: Verify

Check both repositories:
- https://github.com/dollarpath1/portfolio
- https://github.com/sethdev254/portfolio

---

## 🔑 Create GitHub Personal Access Token

If you need a token for authentication:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: `Portfolio Upload`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## 🔄 Future Updates

To push updates to both repositories:

```bash
# Make your changes
git add .
git commit -m "Update: description of changes"

# Push to both
git push dollarpath main
git push sethdev main
```

Or push to both at once:

```bash
git push --all
```

---

## 📝 Alternative: Use GitHub CLI

### Install GitHub CLI

Download from: https://cli.github.com/

### Login to Both Accounts

```bash
# Login to dollarpath1
gh auth login

# Create and push repo
gh repo create portfolio --public --source=. --remote=dollarpath --push

# Login to sethdev254 (in a different terminal or after logout)
gh auth login

# Create and push repo
gh repo create portfolio --public --source=. --remote=sethdev --push
```

---

## 🎯 Quick Commands Reference

```bash
# Check remotes
git remote -v

# Add remote
git remote add <name> <url>

# Remove remote
git remote remove <name>

# Push to specific remote
git push <remote-name> main

# Push to all remotes
git push --all

# Check status
git status

# View commit history
git log --oneline
```

---

## 🔧 Troubleshooting

### Authentication Failed?
- Use Personal Access Token instead of password
- Make sure token has `repo` scope

### Remote Already Exists?
```bash
git remote remove dollarpath
git remote remove sethdev
# Then add them again
```

### Wrong Branch Name?
```bash
# Rename branch to main
git branch -M main
```

### Large Files Error?
Add to `.gitignore`:
```
node_modules/
.env
```

Then:
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules"
```

---

## 📦 What Gets Pushed

✅ Included:
- All HTML, CSS, JS files
- Backend code
- Documentation
- Configuration files

❌ Excluded (via .gitignore):
- `node_modules/`
- `.env` (sensitive data)
- Log files
- IDE settings

---

## 🌟 After Pushing

### Enable GitHub Pages (Optional)

**For dollarpath1:**
1. Go to: https://github.com/dollarpath1/portfolio/settings/pages
2. Source: Deploy from branch
3. Branch: `main` / `root`
4. Save
5. Your site: https://dollarpath1.github.io/portfolio/

**For sethdev254:**
1. Go to: https://github.com/sethdev254/portfolio/settings/pages
2. Source: Deploy from branch
3. Branch: `main` / `root`
4. Save
5. Your site: https://sethdev254.github.io/portfolio/

### Add Topics (Optional)

Add topics to make your repo discoverable:
- `portfolio`
- `nodejs`
- `express`
- `terminal`
- `fullstack`
- `blockchain`
- `ai`

---

## ✅ Checklist

- [ ] Git initialized
- [ ] All files committed
- [ ] Created repo on dollarpath1
- [ ] Created repo on sethdev254
- [ ] Pushed to dollarpath1
- [ ] Pushed to sethdev254
- [ ] Verified both repos online
- [ ] Enabled GitHub Pages (optional)
- [ ] Added topics (optional)

---

## 🎉 Done!

Your portfolio is now on GitHub under both accounts:
- https://github.com/dollarpath1/portfolio
- https://github.com/sethdev254/portfolio

Share your amazing work! 🚀
