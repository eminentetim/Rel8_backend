const express = require('express');
const { getOrganization, updateOrganization, deleteOrganization } = require('../controllers/organization.controller');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

const router = express.Router();

router.get('/', auth, tenant, getOrganization);
router.put('/:id', auth, tenant, updateOrganization);
router.delete('/:id', auth, tenant, deleteOrganization);

module.exports = router;
