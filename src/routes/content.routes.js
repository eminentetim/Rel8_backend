const express = require('express');
const { createNews, createGallery, createPublication, createMinute, getNews, getGallery, getPublications, getMinutes, updateNews, updateGallery, updatePublication, updateMinute, deleteNews, deleteGallery, deletePublication, deleteMinute } = require('../controllers/content.controller');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');
const upload = require('multer')({ storage: require('../middleware/upload').storage });
const { check } = require('express-validator');
const validate = require('../middleware/validate');

const router = express.Router();

router.post('/news', auth, tenant, upload.single('banner'), [
  check('topic').notEmpty().withMessage('Topic is required'),
  check('content').notEmpty().withMessage('Content is required'),
  check('audience').notEmpty().withMessage('Audience is required'),
  validate,
], createNews);

router.post('/gallery', auth, tenant, upload.single('image'), [
  check('caption').notEmpty().withMessage('Caption is required'),
  check('audience').notEmpty().withMessage('Audience is required'),
  validate,
], createGallery);

router.post('/publication', auth, tenant, upload.single('file'), [
  check('title').notEmpty().withMessage('Title is required'),
  check('audience').notEmpty().withMessage('Audience is required'),
  validate,
], createPublication);

router.post('/minute', auth, tenant, upload.single('file'), [
  check('content').notEmpty().withMessage('Content is required'),
  check('audience').notEmpty().withMessage('Audience is required'),
  validate,
], createMinute);

router.get('/news', auth, tenant, getNews);

router.get('/gallery', auth, tenant, getGallery);

router.get('/publications', auth, tenant, getPublications);

router.get('/minutes', auth, tenant, getMinutes);

router.put('/news/:id', auth, tenant, [
  check('topic').notEmpty().withMessage('Topic is required'),
  check('content').notEmpty().withMessage('Content is required'),
  check('audience').notEmpty().withMessage('Audience is required'),
  validate,
], updateNews);

router.put('/gallery/:id', auth, tenant, upload.single('image'), [
  check('caption').notEmpty().withMessage('Caption is required'),
  check('audience').notEmpty().withMessage('Audience is required'),
  validate,
], updateGallery);

router.put('/publication/:id', auth, tenant, upload.single('file'), [
  check('title').notEmpty().withMessage('Title is required'),
  check('audience').notEmpty().withMessage('Audience is required'),
  validate,
], updatePublication);

router.put('/minute/:id', auth, tenant, upload.single('file'), [
  check('content').notEmpty().withMessage('Content is required'),
  check('audience').notEmpty().withMessage('Audience is required'),
  validate,
], updateMinute);

router.delete('/news/:id', auth, tenant, deleteNews);

router.delete('/gallery/:id', auth, tenant, deleteGallery);

router.delete('/publication/:id', auth, tenant, deletePublication);

router.delete('/minute/:id', auth, tenant, deleteMinute);

module.exports = router;
