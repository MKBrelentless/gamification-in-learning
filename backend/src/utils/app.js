const express = require('express');
const cors = require('cors');
const { connectDB } = require('../config/db');

// Import routes
const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.route');
const quizRoutes = require('../routes/quiz.routes');
const gamificationRoutes = require('../routes/gamification.routes');
const analyticsRoutes = require('../routes/analytics.routes');
const recommendationRoutes = require('../routes/recommendation.routes');
const contentRoutes = require('../routes/content.routes');
const qaRoutes = require('../routes/qa.routes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/qa', qaRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = app;