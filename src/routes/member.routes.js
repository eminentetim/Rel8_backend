const express = require('express');
const { uploadMembers, setPassword, updateMember, deleteMember } = require('../controllers/member.controller');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');
const upload = require('multer')({ storage: require('../middleware/upload').storage });
const { check } = require('express-validator');
const validate = require('../middleware/validate');

const router = express.Router();

router.post('/upload', auth, tenant, upload.single('file'), uploadMembers);

router.post('/set-password', [
  check('token').notEmpty().withMessage('Token is required'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  validate,
], setPassword);

router.put('/:id', auth, updateMember);

router.delete('/:id', auth, deleteMember);

module.exports = router;
