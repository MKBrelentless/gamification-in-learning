const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {
  getMissions,
  startMission,
  completeMission,
  getDailyQuests,
  updateQuestProgress,
  getStreak,
  getTeamChallenges,
  joinTeamChallenge,
  sendPeerReward
} = require('../controllers/enhanced.controller');

// Missions
router.get('/missions', authMiddleware, getMissions);
router.post('/missions/:missionId/start', authMiddleware, startMission);
router.post('/missions/:missionId/complete', authMiddleware, completeMission);

// Daily Quests
router.get('/quests', authMiddleware, getDailyQuests);
router.post('/quests/:questId/progress', authMiddleware, updateQuestProgress);

// Streaks
router.get('/streak', authMiddleware, getStreak);

// Team Challenges
router.get('/challenges', authMiddleware, getTeamChallenges);
router.post('/challenges/:challengeId/join', authMiddleware, joinTeamChallenge);

// Peer Rewards
router.post('/peer-reward', authMiddleware, sendPeerReward);

module.exports = router;
