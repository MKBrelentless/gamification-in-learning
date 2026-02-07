const express = require('express');
const auth = require('../middleware/auth.middleware');
const { awardPoints, getLeaderboard, getUserStats } = require('../controllers/gamification.controller');
const router = express.Router();

router.post('/points', auth, awardPoints);
router.get('/leaderboard', getLeaderboard);
router.get('/stats/:userId', auth, getUserStats);

module.exports = router;