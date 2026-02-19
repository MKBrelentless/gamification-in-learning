const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const { autoGenerateQuiz, getAvailableSubjects } = require('../controllers/quiz-generator.controller');

// Generate quiz questions
router.post('/generate', authMiddleware, roleMiddleware('teacher', 'admin'), autoGenerateQuiz);

// Get available subjects
router.get('/subjects', authMiddleware, getAvailableSubjects);

module.exports = router;
