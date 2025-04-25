const express = require('express');
const { createElection, createCandidate, castVote, getElectionResults, updateElection, updateCandidate, deleteElection, deleteCandidate, getElections,
  getElectionById, getCandidates, getCandidateById } = require('../controllers/election.controller');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');
const upload = require('multer')({ storage: require('../middleware/upload').storage });
const { check } = require('express-validator');
const validate = require('../middleware/validate');

const router = express.Router();

router.post('/', auth, tenant, [
  check('theme').notEmpty().withMessage('Theme is required'),
  check('positions').isArray().withMessage('Positions must be an array'),
  check('startDate').isISO8601().withMessage('Start date must be a valid date'),
  check('endDate').isISO8601().withMessage('End date must be a valid date'),
  validate,
], createElection);

router.post('/candidate', auth, tenant, upload.fields([{ name: 'image' }, { name: 'video' }]), [
  check('name').notEmpty().withMessage('Name is required'),
  check('bio').notEmpty().withMessage('Bio is required'),
  check('manifesto').notEmpty().withMessage('Manifesto is required'),
  check('positionId').notEmpty().withMessage('Position ID is required'),
  check('electionId').notEmpty().withMessage('Election ID is required'),
  validate,
], createCandidate);

router.post('/vote', auth, tenant, [
  check('candidateId').notEmpty().withMessage('Candidate ID is required'),
  validate,
], castVote);

router.get('/results/:electionId', auth, tenant, getElectionResults);

router.put('/:id', auth, tenant, [
  check('theme').notEmpty().withMessage('Theme is required'),
  check('positions').isArray().withMessage('Positions must be an array'),
  check('startDate').isISO8601().withMessage('Start date must be a valid date'),
  check('endDate').isISO8601().withMessage('End date must be a valid date'),
  validate,
], updateElection);

router.put('/candidate/:id', auth, tenant, upload.fields([{ name: 'image' }, { name: 'video' }]), [
  check('name').notEmpty().withMessage('Name is required'),
  check('bio').notEmpty().withMessage('Bio is required'),
  check('manifesto').notEmpty().withMessage('Manifesto is required'),
  check('positionId').notEmpty().withMessage('Position ID is required'),
  check('electionId').notEmpty().withMessage('Election ID is required'),
  validate,
], updateCandidate);

router.delete('/:id', auth, tenant, deleteElection);

router.delete('/candidate/:id', auth, tenant, deleteCandidate);

// Get all elections
router.get('/', auth, tenant, getElections);

// Get single election by ID
router.get('/:id', auth, tenant, getElectionById);

// Get all candidates (optionally filter by electionId or positionId via query params)
router.get('/candidate', auth, tenant, getCandidates);

// Get single candidate by ID
router.get('/candidate/:id', auth, tenant, getCandidateById);

module.exports = router;
