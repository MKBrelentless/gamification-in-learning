const express = require('express');
const auth = require('../middleware/auth.middleware');
const {
  getRecommendationsForUser,
  getPredictedPerformance,
  getLearnerProfile
} = require('../controllers/recommendation.controller');
const router = express.Router();

router.post('/', auth, getRecommendationsForUser);
router.post('/predict/:quizId', auth, getPredictedPerformance);
router.post('/profile', auth, getLearnerProfile);

module.exports = router;