const express = require('express');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const { getUserAnalytics, getSystemAnalytics } = require('../controllers/analytics.controller');
const router = express.Router();

router.get('/user/:userId?', auth, getUserAnalytics);
router.get('/system', auth, authorize('admin', 'teacher'), getSystemAnalytics);

module.exports = router;