# SkillSwap - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 1. User Registration
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d5ec49c1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-04-27T10:30:00.000Z",
    "updatedAt": "2024-04-27T10:30:00.000Z"
  }
}
```

**Error Responses:**
- **400**: Validation errors or user already exists
- **500**: Server error

**Validation:**
- Name: minimum 2 characters
- Email: valid email format
- Password: minimum 6 characters
- Passwords must match

---

### 2. User Login
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d5ec49c1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-04-27T10:30:00.000Z",
    "updatedAt": "2024-04-27T10:30:00.000Z"
  }
}
```

**Error Responses:**
- **400**: Invalid credentials
- **500**: Server error

---

### 3. Get User Profile
**GET** `/user/profile`

Retrieve current authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "60d5ec49c1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-04-27T10:30:00.000Z",
    "updatedAt": "2024-04-27T10:30:00.000Z"
  }
}
```

**Error Responses:**
- **401**: Unauthorized (no token)
- **404**: User not found
- **500**: Server error

---

### 4. Update User Profile
**PUT** `/user/profile`

Update current user's profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "60d5ec49c1234567890abcd",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "createdAt": "2024-04-27T10:30:00.000Z",
    "updatedAt": "2024-04-27T11:45:00.000Z"
  }
}
```

**Error Responses:**
- **400**: Missing required fields or email already in use
- **401**: Unauthorized
- **500**: Server error

**Validation:**
- Name: required, minimum 2 characters
- Email: required, valid email format, unique

---

### 5. Get All Users
**GET** `/user/all`

Retrieve all users in the system (public data only).

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "users": [
    {
      "_id": "60d5ec49c1234567890abcd",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-04-27T10:30:00.000Z",
      "updatedAt": "2024-04-27T10:30:00.000Z"
    },
    {
      "_id": "60d5ec49c1234567890abce",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "createdAt": "2024-04-27T10:35:00.000Z",
      "updatedAt": "2024-04-27T10:35:00.000Z"
    }
  ]
}
```

**Error Responses:**
- **401**: Unauthorized
- **500**: Server error

---

### 6. Delete User Account
**DELETE** `/user/account`

Permanently delete the current user's account.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

**Error Responses:**
- **401**: Unauthorized
- **404**: User not found
- **500**: Server error

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (only in development)"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## Authentication Token

JWT Token Format:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDVlYzQ5YzEyMzQ1Njc4OTBhYmNkIiwiaWF0IjoxNjE2ODQ2MjAwLCJleHAiOjE2MTc0NTEwMDB9.signature
```

Token Properties:
- **Expires in:** 7 days (configurable)
- **Algorithm:** HS256
- **Payload:** User ID

Token should be included in all protected endpoint requests:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Example cURL Requests

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "confirmPassword": "SecurePass123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Get Profile (Protected)
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer <your_token>"
```

### Update Profile
```bash
curl -X PUT http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com"
  }'
```

### Get All Users
```bash
curl -X GET http://localhost:5000/api/user/all \
  -H "Authorization: Bearer <your_token>"
```

### Delete Account
```bash
curl -X DELETE http://localhost:5000/api/user/account \
  -H "Authorization: Bearer <your_token>"
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. Consider adding it for production:
```bash
npm install express-rate-limit
```

---

## CORS Configuration

CORS is enabled for all origins. Update in `server.js` for production:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

---

## Database Indexes

Mongoose automatically creates indexes for:
- User email (unique index)
- CreatedAt timestamp

---

Last Updated: April 27, 2026
