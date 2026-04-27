# 🚀 Deploy Frontend to Vercel - Step by Step

Your frontend is ready to deploy! Follow these simple steps.

---

## ⚡ **Method 1: Fastest - GitHub Integration (2 minutes)**

### Step 1: Sign Up on Vercel
1. Go to: **https://vercel.com/signup**
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. Sign in with your GitHub account

### Step 2: Import Your Repository
1. After login, you'll see "Import Project"
2. Click **"Import from Git"**
3. Paste your repo URL: `https://github.com/gourajay640-cpu/skill_swap`
4. Click **"Continue"**

### Step 3: Configure Deployment
1. **Project Name:** `skill-swap` (or any name you like)
2. **Framework Preset:** Select `Other` (since it's static HTML)
3. **Root Directory:** Keep as `./` (default)
4. **Build Command:** Leave empty
5. **Output Directory:** `frontend`
6. Click **"Deploy"**

### Step 4: Wait for Deployment ⏳
- Vercel will build your project (2-3 minutes)
- You'll see a green checkmark when done ✅
- Click the URL to visit your live site!

---

## 🎉 Your Site is Live!

Your frontend URL will be something like:
```
https://skill-swap-xxx.vercel.app
```

It will be automatically deployed every time you push to GitHub! 🚀

---

## 🔧 **Method 2: Using Vercel CLI (Alternative)**

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /Users/ajay/Downloads/skill\ swap/skillswap-app
vercel

# Follow the prompts:
# - Connect GitHub? Yes
# - Which scope? Your GitHub username
# - Link to existing project? No
# - Project name? skill-swap
# - Confirm settings? Yes
```

---

## 📋 **Verify Your Deployment**

After deployment, check:
- [ ] Homepage loads at your Vercel URL
- [ ] Glasmorphism styling looks good
- [ ] Navigation works
- [ ] Login/Register forms appear
- [ ] Responsive design on mobile
- [ ] Dashboard page accessible
- [ ] No console errors (open DevTools: F12)

---

## 🔗 **Connect Frontend to Backend**

Your frontend needs to know where your backend is. 

### Update API URL:

1. Open: `frontend/js/api.js`
2. Find the line with `API_URL`
3. Update it to your backend URL (after you deploy backend)

Example:
```javascript
const API_URL = 'https://skillswap-api.herokuapp.com/api';
```

---

## 🌐 **Environment Variables (If Needed)**

If you need to use environment variables:

1. Go to Vercel Dashboard
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add your variables
5. Redeploy

---

## 📱 **Custom Domain (Optional)**

To use your own domain:

1. Go to your Vercel project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Update DNS settings at your domain provider
5. Wait for verification (can take a few minutes)

Example: `skillswap.com` instead of `skill-swap-xxx.vercel.app`

---

## 🔄 **Automatic Updates**

Every time you push to GitHub:
1. Vercel automatically detects the change
2. Runs a new build
3. Deploys the new version
4. Your site updates within 1-2 minutes

No manual steps needed! 🎯

---

## 🐛 **Troubleshooting**

### Problem: "Build failed"
- Check that `frontend/` folder exists
- Verify all HTML/CSS/JS files are there
- Check for any syntax errors

### Problem: "404 Not Found" on pages
- The `vercel.json` config handles routing
- Make sure `dashboard.html` exists
- Check browser console for errors

### Problem: "API requests failing"
- You haven't deployed backend yet
- Update `API_URL` in `frontend/js/api.js`
- Ensure backend CORS allows your frontend URL

### Problem: "Styling looks broken"
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file path in HTML
- Verify all CSS files are in `frontend/css/`

---

## 🚀 **Next Step: Deploy Backend**

After frontend is deployed, deploy your backend to Heroku:

```bash
brew install heroku
heroku login
heroku create skillswap-api
heroku config:set JWT_SECRET="your-secret-key"
git push heroku main
```

Then update the API_URL in your frontend! 🎉

---

## 📊 **Your Deployed Stack**

After both are deployed:

```
Frontend (Vercel):
  https://skill-swap-xxx.vercel.app

Backend (Heroku):
  https://skillswap-api.herokuapp.com/api

Database (MongoDB Atlas):
  mongodb+srv://username:password@cluster.mongodb.net/skillswap
```

Perfect! Your full-stack app is live! 🌍

---

## ✨ **Celebrate!**

You now have:
✅ Code on GitHub
✅ Frontend deployed on Vercel
✅ Ready for backend deployment
✅ Live on the internet!

Share your URL: `https://github.com/gourajay640-cpu/skill_swap`

Happy deploying! 🚀✨

