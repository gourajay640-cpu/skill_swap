# SkillSwap - Quick Start Guide

## 🚀 Fast Setup (5 minutes)

### Option 1: Automated Setup (macOS/Linux)

```bash
cd skillswap-app

# Make scripts executable
chmod +x setup.sh start.sh

# Run setup
./setup.sh

# Start the application
./start.sh
```

Then open `http://localhost:8000` in your browser.

---

## 🔧 Manual Setup

### Step 1: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env if needed (it should work with defaults)
# Default MongoDB: mongodb://localhost:27017/skillswap
# Default Port: 5000

# Start backend
npm run dev
```

✅ Backend running on `http://localhost:5000`

### Step 2: Frontend Setup (New Terminal)

```bash
cd frontend

# Using Python 3
python -m http.server 8000

# OR using Node http-server
http-server -p 8000
```

✅ Frontend running on `http://localhost:8000`

### Step 3: Ensure MongoDB is Running

```bash
# macOS with Homebrew
brew services start mongodb-community

# Or start manually
mongod
```

✅ MongoDB connected

---

## 🧪 Test the Application

### Test Registration
1. Go to http://localhost:8000
2. Click "Get Started" button
3. Fill in the registration form:
   - Name: John Doe
   - Email: john@test.com
   - Password: Test123456
   - Confirm: Test123456
4. Click "Create Account"
5. You should be redirected to dashboard

### Test Login
1. On home page, click "Auth" link
2. Click "Sign in" link
3. Enter credentials:
   - Email: john@test.com
   - Password: Test123456
4. Click "Sign In"
5. You should see the dashboard

### Test Profile Edit
1. On dashboard, click "Edit Profile" button
2. Change name or email
3. Click "Save Changes"
4. Verify changes are saved

### Test Browse Users
1. On dashboard, click "Browse Users"
2. See list of all registered users
3. Connect button is available

### Test API Directly

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test12345",
    "confirmPassword": "Test12345"
  }'

# Copy the token from response
# Then use it in the next request (replace TOKEN)

# Get profile
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer TOKEN"
```

---

## 📁 Project Structure

```
skillswap-app/
├── backend/                    # Node.js Backend
│   ├── server.js              # Main server file
│   ├── package.json           # Dependencies
│   ├── .env.example           # Environment template
│   ├── routes/                # API routes
│   ├── controllers/           # Business logic
│   ├── models/                # Database schemas
│   └── middleware/            # Auth middleware
├── frontend/                  # HTML/CSS/JS Frontend
│   ├── index.html            # Home page
│   ├── dashboard.html        # Dashboard page
│   ├── css/style.css         # Glassmorphism styles
│   └── js/
│       ├── api.js            # API client
│       ├── app.js            # Home page logic
│       └── dashboard.js      # Dashboard logic
├── README.md                 # Full documentation
├── API_DOCUMENTATION.md      # API reference
└── QUICK_START.md           # This file
```

---

## 🔑 Features to Try

### 1. User Registration & Login
- Create new account
- Login with credentials
- Token-based authentication

### 2. Profile Management
- View your profile
- Edit name and email
- See join date

### 3. Community Features
- Browse all users
- See community members
- Connect with users (UI ready)

### 4. Settings
- Manage account
- Delete account (with confirmation)

### 5. Responsive Design
- Test on mobile (Chrome DevTools)
- Try tablet view
- Desktop view

---

## 🎨 Design Features

- **Glassmorphism UI**: Modern frosted glass effect
- **Smooth Animations**: Fade-in, slide-up effects
- **Loading States**: Spinner during API calls
- **Error Handling**: User-friendly alert messages
- **Responsive**: Mobile, tablet, desktop optimized
- **Modern Colors**: Purple, indigo, pink gradients

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
brew services list

# Start MongoDB
brew services start mongodb-community

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in backend/.env
```

### CORS Error
- Ensure backend is running on port 5000
- Ensure frontend is on port 8000
- CORS is already enabled in server.js

### Token Errors
- Clear browser localStorage: F12 → Application → LocalStorage → Clear
- Login again to get a fresh token

### Module Not Found
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`

---

## 📚 Available NPM Scripts

### Backend
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start

# Install dependencies
npm install
```

### Frontend
- No build step needed
- Just use any HTTP server

---

## 🔐 Default Environment

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillswap
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

Change `JWT_SECRET` and `NODE_ENV` in production!

---

## 📱 Test Accounts

Create your own or use test accounts:

```
Email: test@example.com
Password: Test12345

Email: demo@example.com
Password: Demo12345
```

---

## 🚀 Next Steps

1. ✅ Install all dependencies
2. ✅ Configure environment variables
3. ✅ Start MongoDB
4. ✅ Start backend server
5. ✅ Start frontend server
6. ✅ Open http://localhost:8000
7. ✅ Register and test features

---

## 📖 Full Documentation

For complete documentation, see:
- **README.md** - Full project details
- **API_DOCUMENTATION.md** - API endpoints reference
- Code comments in all files

---

## 💡 Tips

- Use Chrome DevTools to inspect network requests
- Check browser console for JavaScript errors
- Check backend terminal for server logs
- Use MongoDB Compass to view database
- Keep environment variables secure

---

## ✨ Bonus Features to Add

- Real-time notifications (Socket.io)
- Skill categories
- User ratings and reviews
- Payment integration
- Email verification
- Two-factor authentication
- Dark mode toggle
- User avatars/profiles pictures
- Messaging system
- Post/portfolio feature

---

Happy Coding! 🎉

Questions? Check the code comments or documentation files.
