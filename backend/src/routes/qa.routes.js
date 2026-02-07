const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const {
  askQuestion,
  getMyQuestions,
  getPendingQuestions,
  respondToQuestion,
  createTopic,
  getTopics,
  submitTopicResponse
} = require('../controllers/qa.controller');

// Student routes
router.post('/questions', authMiddleware, askQuestion);
router.get('/my-questions', authMiddleware, getMyQuestions);
router.get('/topics', authMiddleware, getTopics);
router.post('/topics/:topicId/respond', authMiddleware, submitTopicResponse);

// Teacher routes
router.get('/pending-questions', authMiddleware, roleMiddleware('teacher', 'admin'), getPendingQuestions);
router.post('/questions/:questionId/respond', authMiddleware, roleMiddleware('teacher', 'admin'), respondToQuestion);
router.post('/topics', authMiddleware, roleMiddleware('teacher', 'admin'), createTopic);

module.exports = router;