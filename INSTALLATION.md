# 🚀 SkillSwap - Installation & Run Instructions

## Prerequisites Check ✓

Before starting, ensure you have:
- [ ] Node.js v14+ installed (`node -v`)
- [ ] npm v6+ installed (`npm -v`)
- [ ] MongoDB (local or Atlas)
- [ ] Git (optional)
- [ ] A code editor (VS Code recommended)

---

## 📥 Installation Steps

### Method 1: Quickest Setup (Recommended)

#### On macOS/Linux:

```bash
cd /Users/ajay/Downloads/skill\ swap/skillswap-app

# Make scripts executable
chmod +x setup.sh start.sh verify-installation.sh

# Run automated setup
./setup.sh

# Verify installation
./verify-installation.sh

# Start all services
./start.sh
```

Then open: **http://localhost:8000**

---

### Method 2: Manual Step-by-Step Setup

#### Step 1: Install Backend Dependencies

```bash
cd /Users/ajay/Downloads/skill\ swap/skillswap-app/backend

# Install npm packages
npm install

# Expected output: "added XX packages"
```

#### Step 2: Configure Environment

```bash
# Copy template
cp .env.example .env

# Edit if needed (defaults work with local MongoDB):
# nano .env
```

#### Step 3: Start Backend Server

```bash
# Keep this terminal open
npm run dev

# Expected output:
# 🚀 Server is running on http://localhost:5000
# ✅ MongoDB connected successfully
```

#### Step 4: Start Frontend Server (New Terminal)

```bash
cd /Users/ajay/Downloads/skill\ swap/skillswap-app/frontend

# Using Python 3
python -m http.server 8000

# OR using Node http-server
npx http-server -p 8000

# Expected output:
# Serving HTTP on [::]:8000
```

#### Step 5: Ensure MongoDB is Running (New Terminal)

```bash
# Check if MongoDB is running
brew services list | grep mongodb-community

# If not running, start it:
brew services start mongodb-community

# Or start manually:
mongod
```

#### Step 6: Open Application

Open browser and go to: **http://localhost:8000**

---

## ✅ Verification Checklist

After installation, verify everything:

- [ ] Navigate to http://localhost:8000
- [ ] Home page loads with "SkillSwap" title
- [ ] No console errors (Press F12)
- [ ] Network shows successful requests (DevTools → Network)
- [ ] Click "Get Started" button
- [ ] Registration form appears in modal
- [ ] Try registering with test data
- [ ] Dashboard loads after registration
- [ ] Backend terminal shows API requests

---

## 🧪 Quick Test

### 1. Test Registration

```
Go to: http://localhost:8000
Click: "Get Started" button
Fill form:
  Name: Test User
  Email: test@example.com
  Password: Test12345
  Confirm: Test12345
Click: "Create Account"
Expected: Redirect to dashboard in 1-2 seconds
```

### 2. Test API (cURL)

```bash
# In a new terminal, test API health
curl http://localhost:5000/api/health

# Should return:
# {"message":"Server is running","timestamp":"..."}
```

---

## 🎯 Project Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:8000 | Main application |
| Backend API | http://localhost:5000 | API endpoints |
| MongoDB | localhost:27017 | Database (if local) |
| API Health | http://localhost:5000/api/health | Check server status |

---

## 📁 File Locations

All important files relative to:
```
/Users/ajay/Downloads/skill\ swap/skillswap-app/
```

| File | Location | Purpose |
|------|----------|---------|
| package.json | backend/ | Dependencies |
| .env | backend/ | Environment variables |
| server.js | backend/ | Main server |
| index.html | frontend/ | Home page |
| dashboard.html | frontend/ | Dashboard page |
| style.css | frontend/css/ | Styling |
| api.js | frontend/js/ | API client |

---

## 🔧 Common Issues & Solutions

### Issue: "Port 5000 already in use"

```bash
# Find process on port 5000
lsof -ti:5000

# Kill it
lsof -ti:5000 | xargs kill -9

# Or use different port:
PORT=3001 npm run dev
```

### Issue: MongoDB connection error

```bash
# Check if MongoDB is installed
which mongod

# If not installed (macOS):
brew install mongodb-community

# Start MongoDB:
brew services start mongodb-community

# Or use MongoDB Atlas (cloud):
# 1. Sign up at https://www.mongodb.com/cloud/atlas
# 2. Create a cluster
# 3. Get connection string
# 4. Update MONGODB_URI in backend/.env
```

### Issue: "Cannot find module"

```bash
cd backend
rm -rf node_modules
npm install
```

### Issue: CORS errors in browser console

- Verify backend is running on port 5000
- Verify frontend is on port 8000
- Check that CORS is enabled in server.js

### Issue: Blank screen or no content loading

```bash
# Check browser console (F12 → Console)
# Look for:
# - JavaScript errors
# - Network errors (F12 → Network)
# - CORS issues

# Clear browser cache:
# F12 → Application → Clear Site Data
# Refresh page
```

### Issue: Can't login after registration

```bash
# Clear localStorage:
# F12 → Application → LocalStorage → Clear All
# Then register and login again

# Or check backend logs for errors
```

---

## 🛠️ Development Tips

### Browser DevTools

```
F12 - Open DevTools
Console - Check for JavaScript errors
Network - Monitor API calls
Application → LocalStorage - View stored token
```

### Backend Logging

```bash
# Monitor requests in real-time
# Terminal running "npm run dev" will show all API requests
# Look for: GET/POST/PUT/DELETE requests and responses
```

### Database Inspection

```bash
# View data in MongoDB
mongosh

# Connect to database
use skillswap

# View users
db.users.find().pretty()

# Check authentication token
# Stored in browser LocalStorage
# F12 → Application → LocalStorage → http://localhost:8000
```

---

## 📚 Documentation Files

After installation, read these in order:

1. **QUICK_START.md** - 5-minute overview
2. **README.md** - Complete guide
3. **API_DOCUMENTATION.md** - API reference
4. **TESTING_GUIDE.md** - Testing procedures
5. **PROJECT_MANIFEST.md** - File structure

---

## 🚀 Advanced Setup

### Using MongoDB Atlas (Cloud)

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update backend/.env:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillswap?retryWrites=true&w=majority
   ```

### Using Docker

```bash
# Start MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Then follow regular setup steps
```

### Production Deployment

See README.md section "Deployment" for:
- Heroku backend deployment
- Vercel frontend deployment
- Environment configuration

---

## 🧩 Architecture Overview

```
┌─────────────────────────────────────────────┐
│         Browser (Frontend)                  │
│  ├─ HTML, CSS, JavaScript                  │
│  ├─ http://localhost:8000                  │
│  └─ API Client (JavaScript)                │
└────────────────┬────────────────────────────┘
                 │ HTTP/CORS
                 ▼
┌─────────────────────────────────────────────┐
│    Express.js Server (Backend)              │
│  ├─ Routes & Controllers                   │
│  ├─ JWT Authentication                     │
│  ├─ http://localhost:5000                  │
│  └─ REST API Endpoints                     │
└────────────────┬────────────────────────────┘
                 │ Mongoose ODM
                 ▼
┌─────────────────────────────────────────────┐
│      MongoDB Database                       │
│  ├─ User Collection                        │
│  ├─ localhost:27017 (local)               │
│  └─ Or MongoDB Atlas (cloud)               │
└─────────────────────────────────────────────┘
```

---

## 📊 Technology Stack

**Frontend:**
- HTML5 ✓
- CSS3 (Glassmorphism) ✓
- JavaScript ES6+ ✓
- Fetch API ✓

**Backend:**
- Node.js ✓
- Express.js ✓
- MongoDB ✓
- Mongoose ✓
- JWT ✓
- bcryptjs ✓

**Tools:**
- npm ✓
- nodemon ✓
- .env ✓

---

## 🎓 Learning Resources

After setup, explore:

### Frontend
- `frontend/index.html` - HTML structure
- `frontend/css/style.css` - Glassmorphism design
- `frontend/js/app.js` - Main logic
- `frontend/js/dashboard.js` - Dashboard logic

### Backend
- `backend/server.js` - Express setup
- `backend/routes/auth.js` - Auth routes
- `backend/controllers/authController.js` - Auth logic
- `backend/models/User.js` - Data model
- `backend/middleware/auth.js` - JWT verification

### Testing
- Use `TESTING_GUIDE.md` for complete test scenarios
- Use browser DevTools for frontend debugging
- Use backend terminal logs for API debugging

---

## ⚡ Quick Commands Reference

```bash
# Setup (first time)
cd backend && npm install
cp .env.example .env

# Development (daily)
cd backend && npm run dev          # Terminal 1
cd frontend && python -m http.server 8000  # Terminal 2

# Production
NODE_ENV=production npm start

# Testing API
curl http://localhost:5000/api/health

# View database
mongosh
use skillswap
db.users.find().pretty()

# Clean everything
rm -rf backend/node_modules
rm backend/.env
npm install
```

---

## 📱 Mobile Testing

### Test Responsive Design

```
Chrome DevTools → F12
Toggle device toolbar (Ctrl+Shift+M)
Test on:
  - iPhone 12 (390x844)
  - iPad (768x1024)
  - Desktop (1920x1080)
```

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change JWT_SECRET in .env
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Add input sanitization
- [ ] Use environment variables
- [ ] Enable logging
- [ ] Set up monitoring

---

## 📞 Need Help?

1. Check **QUICK_START.md** for fast answers
2. Review **README.md** for detailed info
3. See **API_DOCUMENTATION.md** for endpoint details
4. Read **TESTING_GUIDE.md** for troubleshooting
5. Check code comments for explanations
6. Look at browser console (F12) for errors

---

## ✨ Next Steps After Installation

1. ✅ Complete the installation above
2. ✅ Verify everything works
3. ✅ Read QUICK_START.md
4. ✅ Try all features in the app
5. ✅ Test API endpoints with cURL
6. ✅ Read full README.md
7. ✅ Explore the codebase
8. ✅ Customize and extend

---

## 🎉 Congratulations!

You now have a complete full-stack web application with:
- ✅ Modern Glassmorphism UI
- ✅ Responsive design
- ✅ JWT authentication
- ✅ User management
- ✅ Professional code structure
- ✅ Complete documentation

Ready to build, learn, and deploy! 🚀

---

**Installation Verification Command:**

```bash
cd /Users/ajay/Downloads/skill\ swap/skillswap-app
./verify-installation.sh
```

This will check:
- Node.js and npm
- MongoDB
- File structure
- Dependencies
- Port availability

---

Happy Coding! 💻

Questions? See the documentation files or check the code comments!
