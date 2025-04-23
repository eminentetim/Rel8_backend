const express = require('express');
const { signup, verifyEmail, login } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const validate = require('../middleware/validate');

const router = express.Router();

router.post('/signup', [
  check('name').notEmpty().withMessage('Name is required'),
  check('adminEmail').isEmail().withMessage('Email is required'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  check('contactDetails.phone').notEmpty().withMessage('Phone number is required'),
  validate,
], signup);

router.get('/verify/:token', verifyEmail);

router.post('/login', [
  check('email').isEmail().withMessage('Email is required'),
  check('password').notEmpty().withMessage('Password is required'),
  validate,
], login);

module.exports = router;
