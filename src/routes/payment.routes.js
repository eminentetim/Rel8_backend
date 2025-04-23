const express = require('express');
const { makePayment, getPayments } = require('../controllers/payment.controller');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');
const { check } = require('express-validator');
const validate = require('../middleware/validate');

const router = express.Router();

router.post('/', auth, tenant, [
  check('dueId').notEmpty().withMessage('Due ID is required'),
  check('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  validate,
], makePayment);

router.get('/', auth, tenant, getPayments);

module.exports = router;
