const express = require('express');
const { sendGroupMessage, sendPrivateMessage, getGroupMessages, getPrivateMessages, updateGroupMessage, deleteGroupMessage, updatePrivateMessage, deletePrivateMessage } = require('../controllers/chat.controller');
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

router.put('/group/:id', auth, tenant, [
  check('content').notEmpty().withMessage('Content is required'),
  validate,
], updateGroupMessage);

router.delete('/group/:id', auth, tenant, deleteGroupMessage);

router.put('/private/:id', auth, tenant, [
  check('content').notEmpty().withMessage('Content is required'),
  validate,
], updatePrivateMessage);

router.delete('/private/:id', auth, tenant, deletePrivateMessage);

module.exports = router;
