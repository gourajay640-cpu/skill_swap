// Authentication Routes
const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('name', 'Name is required and must be at least 2 characters').trim().isLength({ min: 2 }),
  body('email', 'Please provide a valid email').isEmail().normalizeEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  body('confirmPassword', 'Confirm password is required').notEmpty(),
];

const loginValidation = [
  body('email', 'Please provide a valid email').isEmail().normalizeEmail(),
  body('password', 'Password is required').notEmpty(),
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

module.exports = router;
