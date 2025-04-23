const express = require('express');
const { sendGroupMessage, sendPrivateMessage, getGroupMessages, getPrivateMessages } = require('../controllers/chat.controller');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');
const { check } = require('express-validator');
const validate = require('../middleware/validate');

const router = express.Router();

router.post('/group', auth, tenant, [
  check('content').notEmpty().withMessage('Content is required'),
  validate,
], sendGroupMessage);

router.post('/private', auth, tenant, [
  check('content').notEmpty().withMessage('Content is required'),
  check('recipientId').notEmpty().withMessage('Recipient ID is required'),
  validate,
], sendPrivateMessage);

router.get('/group', auth, tenant, getGroupMessages);

router.get('/private', auth, tenant, getPrivateMessages);

module.exports = router;
