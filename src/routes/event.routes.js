const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/event.controller');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');
const upload = require('multer')({ storage: require('../middleware/upload').storage });
const { check } = require('express-validator');
const validate = require('../middleware/validate');

const router = express.Router();

router.post('/', auth, tenant, upload.single('banner'), [
  check('details').notEmpty().withMessage('Details are required'),
  check('audience').notEmpty().withMessage('Audience is required'),
  validate,
], createEvent);

router.get('/', auth, tenant, getEvents);

router.put('/:id', auth, tenant, upload.single('banner'), [
  check('details').notEmpty().withMessage('Details are required'),
  check('audience').notEmpty().withMessage('Audience is required'),
  validate,
], updateEvent);

router.delete('/:id', auth, tenant, deleteEvent);

module.exports = router;
