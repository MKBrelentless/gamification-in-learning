const express = require('express');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const { createQuiz, getQuizzes, getQuiz, submitQuiz, getUserQuizResults } = require('../controllers/quiz.controller');
const router = express.Router();

router.post('/', auth, authorize('teacher', 'admin'), createQuiz);
router.get('/', getQuizzes);
router.get('/results', auth, getUserQuizResults);
router.get('/:id', auth, getQuiz);
router.post('/:id/submit', auth, submitQuiz);

module.exports = router;