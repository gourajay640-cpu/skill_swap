# SkillSwap - Testing Guide

## Complete Testing Checklist

This guide provides comprehensive testing scenarios for the SkillSwap application.

---

## Pre-Testing Setup

### 1. Ensure Services are Running

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Should show: "🚀 Server is running on http://localhost:5000"

# Terminal 2 - Frontend
cd frontend
python -m http.server 8000
# Should show: "Serving HTTP on ... port 8000"

# Terminal 3 - MongoDB (if local)
# Should already be running or start with: brew services start mongodb-community
```

### 2. Clear Browser Cache

- Open DevTools (F12)
- Go to Application → LocalStorage
- Clear all entries
- Close and reopen browser

---

## Functional Testing

### 1. Home Page UI Tests

**Test 1.1: Page Load**
- [ ] Home page loads successfully
- [ ] Navigation bar is visible
- [ ] Hero section displays properly
- [ ] All buttons are clickable
- [ ] Features section shows 4 feature cards
- [ ] No console errors (F12 → Console)

**Test 1.2: Navigation**
- [ ] "Home" link works and shows hero section
- [ ] "About" link scrolls to features section
- [ ] "Auth" link opens auth modal
- [ ] Logo is clickable

**Test 1.3: Buttons**
- [ ] "Get Started" button opens register form
- [ ] "Learn More" button is functional
- [ ] All buttons have hover effects
- [ ] Buttons have smooth transitions

**Test 1.4: Responsive Design**
- [ ] Mobile view (375px):
  - [ ] Navigation collapses to hamburger menu
  - [ ] Hero text is properly sized
  - [ ] Buttons stack vertically
  - [ ] Features grid is single column
- [ ] Tablet view (768px):
  - [ ] Layout adapts properly
  - [ ] Navigation is responsive
  - [ ] Features show 2 columns
- [ ] Desktop view (1200px+):
  - [ ] Full layout displays
  - [ ] Features show 4 columns
  - [ ] Optimal spacing

---

### 2. Authentication Tests

**Test 2.1: User Registration**

Registration Valid Data:
- [ ] Navigate to home page
- [ ] Click "Get Started" button
- [ ] Modal opens with registration form
- [ ] Enter valid data:
  - Name: "John Developer"
  - Email: "john@test.com"
  - Password: "SecurePass123"
  - Confirm: "SecurePass123"
- [ ] Click "Create Account"
- [ ] Success message appears
- [ ] Redirected to dashboard within 1.5 seconds
- [ ] User is logged in (check localStorage has token)

**Test 2.2: Registration Validation**

Invalid Scenarios:
- [ ] Submit with empty name:
  - [ ] Error message appears
  - [ ] User stays on form
- [ ] Submit with invalid email:
  - [ ] Error message appears
  - [ ] Focus stays on email field
- [ ] Submit with short password (less than 6 chars):
  - [ ] Error message appears
  - [ ] Form not submitted
- [ ] Passwords don't match:
  - [ ] Show "Passwords do not match" error
  - [ ] Form not submitted
- [ ] Duplicate email:
  - [ ] Show "User already exists" error
  - [ ] Can try different email

**Test 2.3: User Login**

Valid Login:
- [ ] Go to home page
- [ ] Click "Auth" link
- [ ] Click "Sign in" link
- [ ] Modal shows login form
- [ ] Enter registered email and password
- [ ] Click "Sign In"
- [ ] Success message appears
- [ ] Redirected to dashboard
- [ ] Token is stored in localStorage

Invalid Login:
- [ ] Try with wrong email:
  - [ ] Show "Invalid credentials" error
  - [ ] Stay on login form
- [ ] Try with wrong password:
  - [ ] Show "Invalid credentials" error
  - [ ] Stay on login form
- [ ] Try with empty fields:
  - [ ] Show validation error
  - [ ] Form not submitted

**Test 2.4: Form Transitions**

- [ ] On registration form, click "Sign in" link:
  - [ ] Registration form switches to login form
  - [ ] Modal stays open
- [ ] On login form, click "Sign up" link:
  - [ ] Login form switches to registration form
  - [ ] Modal stays open
- [ ] Close modal:
  - [ ] Click X button - modal closes
  - [ ] Click outside modal - modal closes
  - [ ] Form data is cleared

**Test 2.5: Loading and Alerts**

- [ ] When submitting form:
  - [ ] Loading spinner appears
  - [ ] Button becomes disabled
  - [ ] Buttons show proper feedback
- [ ] On success:
  - [ ] Success alert appears (green)
  - [ ] Alert auto-dismisses after 4 seconds
  - [ ] Redirect happens automatically
- [ ] On error:
  - [ ] Error alert appears (red)
  - [ ] Error message is descriptive
  - [ ] User can retry

---

### 3. Dashboard Tests

**Test 3.1: Dashboard Access**

- [ ] Access dashboard without token:
  - [ ] Redirected to home page
  - [ ] Cannot view dashboard
- [ ] Access dashboard with valid token:
  - [ ] Dashboard loads successfully
  - [ ] User profile section visible
  - [ ] Sidebar visible
  - [ ] All sections load properly

**Test 3.2: Profile Section**

Display Profile:
- [ ] Profile card shows glassmorphism design
- [ ] User name displays correctly
- [ ] User email displays correctly
- [ ] Join date shows in correct format
- [ ] Profile avatar icon displays
- [ ] "Edit Profile" button is visible

Edit Profile:
- [ ] Click "Edit Profile" button
- [ ] Form appears with current values
- [ ] Change name to new value
- [ ] Change email to new value
- [ ] Click "Save Changes"
- [ ] Success message appears
- [ ] Form closes
- [ ] Profile updates with new values
- [ ] Click "Cancel" during edit:
  - [ ] Form closes
  - [ ] Changes not saved

**Test 3.3: Browse Users Section**

- [ ] Click "Browse Users" in sidebar
- [ ] Users section becomes active
- [ ] Loading spinner shows while fetching
- [ ] All users display in grid layout
- [ ] Each user card shows:
  - [ ] User avatar icon
  - [ ] User name
  - [ ] User email
  - [ ] "Connect" button
- [ ] User cards have glass effect
- [ ] Hover effect on cards works
- [ ] "Connect" button has hover animation

**Test 3.4: Settings Section**

- [ ] Click "Settings" in sidebar
- [ ] Settings section becomes active
- [ ] Shows security settings
- [ ] Shows delete account option
- [ ] "Delete Account" button is red (danger state)
- [ ] Click "Delete Account":
  - [ ] Confirmation modal appears
  - [ ] Shows warning message
  - [ ] Has Confirm and Cancel buttons
  - [ ] Click Confirm:
    - [ ] Account deleted
    - [ ] Redirected to home page
    - [ ] Can register new account
  - [ ] Click Cancel:
    - [ ] Modal closes
    - [ ] Stay on settings

**Test 3.5: Sidebar Navigation**

- [ ] All sidebar links clickable
- [ ] Active link has highlight
- [ ] Clicking link shows corresponding section
- [ ] Active state updates correctly
- [ ] Sidebar is sticky (stays visible when scrolling)
- [ ] Mobile view: sidebar becomes horizontal tabs

**Test 3.6: Dashboard Responsive**

Mobile (375px):
- [ ] Sidebar converts to horizontal tabs
- [ ] Each tab labeled with icon and text
- [ ] Content area full width
- [ ] Profile card stacks properly
- [ ] Edit form is readable
- [ ] Users grid is single column
- [ ] All buttons clickable

Tablet (768px):
- [ ] Sidebar visible on left
- [ ] Two-column layout for users
- [ ] Content scales properly
- [ ] Forms are readable

Desktop (1200px+):
- [ ] Full three-column design
- [ ] Sticky sidebar
- [ ] Optimal spacing
- [ ] All elements properly aligned

---

### 4. API Tests

Use cURL or Postman to test API endpoints:

**Test 4.1: Registration Endpoint**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test User",
    "email": "apitest@example.com",
    "password": "TestPass123",
    "confirmPassword": "TestPass123"
  }'
```

- [ ] Returns 201 status
- [ ] Response includes token
- [ ] Response includes user data
- [ ] Response success is true
- [ ] Token can be used for authentication

**Test 4.2: Login Endpoint**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "apitest@example.com",
    "password": "TestPass123"
  }'
```

- [ ] Returns 200 status
- [ ] Response includes token
- [ ] Token matches registration token format
- [ ] Can use token in protected endpoints

**Test 4.3: Get Profile Endpoint**

```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer <token>"
```

- [ ] Returns 200 status
- [ ] Returns user profile
- [ ] Includes all user fields
- [ ] Does not include password

**Test 4.4: Update Profile Endpoint**

```bash
curl -X PUT http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "email": "newemail@example.com"
  }'
```

- [ ] Returns 200 status
- [ ] Profile updated successfully
- [ ] New values reflected in response
- [ ] New values persist (check with GET)

**Test 4.5: Get All Users Endpoint**

```bash
curl -X GET http://localhost:5000/api/user/all \
  -H "Authorization: Bearer <token>"
```

- [ ] Returns 200 status
- [ ] Returns array of users
- [ ] Includes user count
- [ ] Does not include passwords
- [ ] All users visible

**Test 4.6: Delete Account Endpoint**

```bash
curl -X DELETE http://localhost:5000/api/user/account \
  -H "Authorization: Bearer <token>"
```

- [ ] Returns 200 status
- [ ] Success message returned
- [ ] User cannot login after deletion
- [ ] Account data removed from database

**Test 4.7: Authentication Errors**

Missing Token:
- [ ] Protected endpoint returns 401
- [ ] Error message indicates no token

Invalid Token:
- [ ] Protected endpoint returns 401
- [ ] Error message indicates invalid token

Expired Token:
- [ ] Cannot use old token
- [ ] Returns 401

---

### 5. UI/UX Tests

**Test 5.1: Loading States**

- [ ] Loading spinner appears during:
  - [ ] Registration
  - [ ] Login
  - [ ] Profile fetch
  - [ ] Profile update
  - [ ] Users fetch
  - [ ] Account delete
- [ ] Spinner is centered
- [ ] Spinner has smooth animation
- [ ] Spinner displays while waiting
- [ ] Spinner disappears on completion

**Test 5.2: Alert Messages**

Success Alerts:
- [ ] Green color with success icon
- [ ] Shows positive message
- [ ] Auto-dismisses after 4 seconds
- [ ] Can appear multiple times

Error Alerts:
- [ ] Red color with error icon
- [ ] Shows descriptive error
- [ ] Stays visible for full duration
- [ ] User can see what went wrong

Info Alerts:
- [ ] Blue color with info icon
- [ ] Shows informational message
- [ ] Appropriate tone

**Test 5.3: Animations**

Glassmorphism Effects:
- [ ] Cards have blur effect
- [ ] Cards have semi-transparent background
- [ ] Border has soft appearance
- [ ] Shadow is subtle
- [ ] Hover enlarges card slightly

Button Animations:
- [ ] Hover changes color
- [ ] Click provides feedback
- [ ] Ripple or glow effect on hover
- [ ] Smooth transitions

Page Transitions:
- [ ] Page loads with fade-in
- [ ] Elements slide up smoothly
- [ ] Sections transition smoothly

**Test 5.4: Form UX**

- [ ] Input fields have focus state
- [ ] Focus ring is visible
- [ ] Placeholder text is clear
- [ ] Error messages below field
- [ ] Inputs accept correct data
- [ ] Tab order is logical
- [ ] Submit on Enter key works

**Test 5.5: Color Scheme**

- [ ] Primary color (indigo) used consistently
- [ ] Secondary color (purple) for accents
- [ ] Danger color (red) for destructive actions
- [ ] Text contrast is readable
- [ ] Light backgrounds on dark text
- [ ] Dark backgrounds on light text

---

### 6. Performance Tests

**Test 6.1: Load Times**

- [ ] Home page loads in < 2 seconds
- [ ] Dashboard loads in < 2 seconds
- [ ] API responses in < 1 second
- [ ] No lag on animations
- [ ] Smooth scrolling

**Test 6.2: Browser Console**

- [ ] No JavaScript errors on home page
- [ ] No errors on dashboard
- [ ] No console warnings
- [ ] No CORS errors
- [ ] Network requests are successful

**Test 6.3: Memory**

- [ ] App doesn't consume excessive memory
- [ ] No memory leaks on page reload
- [ ] Smooth performance with multiple operations

---

### 7. Security Tests

**Test 7.1: Authentication**

- [ ] Passwords are hashed (check DB)
- [ ] Tokens are secure (JWT format)
- [ ] Token includes expiration
- [ ] Protected routes require token
- [ ] Invalid tokens rejected

**Test 7.2: Data Validation**

- [ ] Email validation works
- [ ] Name minimum length enforced
- [ ] Password minimum length enforced
- [ ] Invalid data rejected

**Test 7.3: CORS**

- [ ] Frontend can communicate with backend
- [ ] No CORS errors in console
- [ ] Protected endpoints enforce auth

**Test 7.4: Session Security**

- [ ] Logout clears token
- [ ] Cannot access protected pages without login
- [ ] Token stored in localStorage
- [ ] Clear browser data logs out user

---

### 8. Edge Cases

**Test 8.1: Network Errors**

- [ ] Disconnect internet while loading:
  - [ ] Shows appropriate error
  - [ ] Can retry operation
- [ ] Slow network:
  - [ ] Loading spinner still shows
  - [ ] UI remains responsive

**Test 8.2: Rapid Clicks**

- [ ] Click button multiple times:
  - [ ] Only one request sent
  - [ ] Only one submission happens
- [ ] Click during loading:
  - [ ] Action doesn't duplicate

**Test 8.3: Special Characters**

- [ ] Register with name containing:
  - [ ] Numbers: "User123" ✓
  - [ ] Hyphens: "John-Doe" ✓
  - [ ] Spaces: "John Doe" ✓
- [ ] Register with special email characters:
  - [ ] Plus: "user+tag@example.com" ✓
  - [ ] Dots: "first.last@example.com" ✓

**Test 8.4: Max Length**

- [ ] Very long names accepted
- [ ] Very long emails validated
- [ ] Database handles large data

---

### 9. Cross-Browser Tests

Test in multiple browsers:

- [ ] Chrome (latest)
  - [ ] All features work
  - [ ] Performance is good
  - [ ] No console errors
- [ ] Firefox (latest)
  - [ ] All features work
  - [ ] Styling looks correct
  - [ ] Forms work properly
- [ ] Safari (latest)
  - [ ] All features work
  - [ ] Glassmorphism renders
  - [ ] Mobile view works
- [ ] Edge (latest)
  - [ ] All features work
  - [ ] API calls successful

---

## Test Report Template

```
Date: [DATE]
Tester: [NAME]
Browser: [BROWSER] [VERSION]
OS: [OS] [VERSION]

Passed: [NUMBER]
Failed: [NUMBER]
Skipped: [NUMBER]

Issues Found:
1. [Issue Description]
   Priority: [High/Medium/Low]
   Steps to Reproduce: [STEPS]

Notes:
[ANY ADDITIONAL NOTES]

Sign Off: [SIGNATURE]
```

---

## Automated Testing (Future)

Consider adding:
- Unit tests with Jest
- Integration tests with Supertest
- E2E tests with Cypress
- Performance testing with Lighthouse

---

## Quick Smoke Tests

**5-Minute Quick Test:**
1. [ ] Register new user
2. [ ] Login with credentials
3. [ ] View profile
4. [ ] Edit profile
5. [ ] Browse users
6. [ ] Logout

---

## Bug Reporting

If you find bugs, report with:
1. Browser and version
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots if applicable
6. Console errors

---

Happy Testing! 🧪

For more details, check API_DOCUMENTATION.md and README.md
