const express = require('express');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const { createCourse, getCourses, getCourse, createLesson, getLesson } = require('../controllers/content.controller');
const router = express.Router();

router.post('/courses', auth, authorize('teacher', 'admin'), createCourse);
router.get('/courses', getCourses);
router.get('/courses/:id', getCourse);
router.post('/lessons', auth, authorize('teacher', 'admin'), createLesson);
router.get('/lessons/:id', getLesson);

module.exports = router;