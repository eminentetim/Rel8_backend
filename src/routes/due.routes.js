const express = require('express');
const { createDue, getDues, updateDue, deleteDue } = require('../controllers/due.controller');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');
const { check } = require('express-validator');
const validate = require('../middleware/validate');

const router = express.Router();

router.post('/', auth, tenant, [
  check('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  check('dueDate').isISO8601().withMessage('Due date must be a valid date'),
  check('purpose').notEmpty().withMessage('Purpose is required'),
  check('targetGroup').notEmpty().withMessage('Target group is required'),
  validate,
], createDue);

router.get('/', auth, tenant, getDues);

router.put('/:id', auth, tenant, [
  check('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  check('dueDate').isISO8601().withMessage('Due date must be a valid date'),
  check('purpose').notEmpty().withMessage('Purpose is required'),
  check('targetGroup').notEmpty().withMessage('Target group is required'),
  validate,
], updateDue);

router.delete('/:id', auth, tenant, deleteDue);

module.exports = router;
