// User Routes
const express = require('express');
const protect = require('../middleware/auth');
const { 
  getProfile, 
  updateProfile, 
  getAllUsers, 
  deleteAccount 
} = require('../controllers/userController');

const router = express.Router();

// All routes below require authentication
router.use(protect);

// User routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/account', deleteAccount);
router.get('/all', getAllUsers);

module.exports = router;
