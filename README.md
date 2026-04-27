# SkillSwap - Full Stack Web Application

A complete full-stack web application for skill sharing and learning with modern Glassmorphism UI design.

## 📋 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Glassmorphism design with modern animations
- **JavaScript (ES6+)** - Interactive UI and API integration

### Backend
- **Node.js** - Runtime environment
- **Express.js** - REST API framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Document Mapper)
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 🎨 Features

### Frontend Features
✨ **Modern Glassmorphism UI**
- Blur effects and transparency
- Gradient backgrounds
- Soft shadows and animations
- Smooth transitions

📱 **Fully Responsive Design**
- Mobile-first approach
- Desktop optimization
- Tablet friendly

🔐 **Authentication Pages**
- Login page with validation
- Register page with password confirmation
- Form error handling
- Loading states

📊 **Dashboard**
- User profile management
- Browse community members
- Settings and preferences
- Account deletion

### Backend Features
🔑 **JWT Authentication**
- Secure token-based authentication
- Protected routes with middleware
- Token expiration handling

📝 **User Management**
- User registration with validation
- User login with authentication
- Profile retrieval and updates
- Account deletion

🗄️ **Database**
- MongoDB with Mongoose ODM
- User schema with validation
- Password hashing with bcryptjs
- Timestamps for user tracking

## 📁 Project Structure

```
skillswap-app/
├── frontend/
│   ├── index.html              # Home page
│   ├── dashboard.html          # Dashboard page
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   ├── api.js             # API client
│   │   ├── app.js             # Home page logic
│   │   └── dashboard.js       # Dashboard logic
│   └── assets/                # Images and assets
│
└── backend/
    ├── server.js              # Express server
    ├── package.json           # Dependencies
    ├── .env.example           # Environment variables example
    ├── routes/
    │   ├── auth.js            # Authentication routes
    │   └── user.js            # User routes
    ├── controllers/
    │   ├── authController.js  # Auth logic
    │   └── userController.js  # User logic
    ├── models/
    │   └── User.js            # User schema
    └── middleware/
        └── auth.js            # JWT verification
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd skillswap-app/backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```bash
cp .env.example .env
```

4. **Configure environment variables in `.env`:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillswap
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. **Start the server:**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd skillswap-app/frontend
```

2. **Using Python HTTP Server (Simple):**
```bash
# Python 3
python -m http.server 8000

# Or with Python 2
python -m SimpleHTTPServer 8000
```

3. **Or using Node http-server:**
```bash
# Install globally (one time)
npm install -g http-server

# Run server
http-server
```

4. **Access the application:**
Open your browser and go to `http://localhost:8000`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User (Protected Routes)
- `GET /api/user/profile` - Get current user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/all` - Get all users
- `DELETE /api/user/account` - Delete user account

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required, min: 2 chars),
  email: String (required, unique, valid email),
  password: String (required, min: 6 chars, hashed),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

## 🔐 Security Features

✅ **Password Security**
- Bcrypt hashing with 10 salt rounds
- Never store plain text passwords
- Password validation on registration

✅ **Authentication**
- JWT token-based authentication
- Token expiration (7 days by default)
- Protected routes with middleware

✅ **Input Validation**
- Email format validation
- Password strength requirements
- Name field validation
- Server-side validation with express-validator

✅ **Error Handling**
- Proper HTTP status codes
- User-friendly error messages
- Server error logging

## 🎯 Usage Examples

### Register a New User
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "confirmPassword": "securepassword123"
}
```

**Response:**
```javascript
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d5ec49c1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-04-27T10:30:00Z"
  }
}
```

### Login User
```javascript
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Get User Profile (Protected)
```javascript
GET /api/user/profile
Authorization: Bearer <token>
```

## 🎨 UI/UX Highlights

- **Glassmorphism Design**: Modern frosted glass effect with blur
- **Gradient Backgrounds**: Beautiful gradient color schemes
- **Smooth Animations**: Fade-in, slide-up, and hover effects
- **Loading States**: Spinner animations during async operations
- **Alert Messages**: Toast-like notifications for user feedback
- **Responsive Layout**: Mobile, tablet, and desktop views
- **Accessibility**: Semantic HTML and keyboard navigation

## 🧪 Testing the Application

1. **Test Registration:**
   - Go to home page
   - Click "Get Started"
   - Fill in the registration form
   - Submit and verify success message

2. **Test Login:**
   - On home page, click auth link
   - Switch to login tab
   - Enter credentials
   - Verify redirect to dashboard

3. **Test Dashboard:**
   - View user profile
   - Edit profile information
   - Browse other users
   - Access settings

4. **Test API with cURL:**
```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123","confirmPassword":"pass123"}'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000                    # Server port
MONGODB_URI=mongodb://...    # MongoDB connection string
JWT_SECRET=your_secret       # JWT signing secret
JWT_EXPIRE=7d                # Token expiration time
NODE_ENV=development         # Environment
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally: `brew services start mongodb-community`
- Or update MONGODB_URI to use MongoDB Atlas cloud instance

### CORS Error
- Backend already has CORS enabled
- Ensure frontend is accessing correct API URL

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Token Expired
- Clear localStorage and login again
- Token automatically refreshes on login

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
cd backend
heroku login
heroku create skillswap-api
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
cd frontend
npm install -g vercel
vercel
```

## 📚 Additional Notes

- All passwords are hashed before storage using bcryptjs
- JWT tokens are valid for 7 days by default
- All API endpoints validate input before processing
- Database indexes are automatically created by Mongoose
- Error messages are user-friendly without exposing system details

## 🤝 Contributing

This is a complete project template. Feel free to extend with:
- Real-time notifications using Socket.io
- Skill category management
- Rating and review system
- Payment integration
- Email verification

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 💡 Support

For issues or questions, refer to the code comments or consult the MongoDB and Express.js documentation.

---

**Created on:** April 27, 2026
**Version:** 1.0.0
