const { User, Point } = require('../models/Simple');
const { sequelize } = require('../config/db');

const getUserAnalytics = async (req, res) => {
  try {
    const mockAnalytics = {
      quizPerformance: {
        totalQuizzes: 5,
        averageScore: 78,
        recentResults: [
          { quiz: { title: 'JavaScript Basics' }, score: 8, totalQuestions: 10 },
          { quiz: { title: 'React Components' }, score: 7, totalQuestions: 10 },
          { quiz: { title: 'Database Design' }, score: 6, totalQuestions: 8 }
        ]
      },
      pointsHistory: [
        { points_earned: 80, reason: 'Quiz completion', earned_at: new Date() },
        { points_earned: 70, reason: 'Quiz completion', earned_at: new Date(Date.now() - 86400000) },
        { points_earned: 60, reason: 'Quiz completion', earned_at: new Date(Date.now() - 172800000) }
      ],
      recentActivity: [
        { action: 'quiz_attempt', timestamp: new Date() },
        { action: 'lesson_view', timestamp: new Date(Date.now() - 3600000) }
      ]
    };
    
    res.json(mockAnalytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSystemAnalytics = async (req, res) => {
  try {
    // Get real-time top performers from database
    const topPerformers = await sequelize.query(`
      SELECT 
        u.id,
        u.full_name as username,
        u.email,
        COALESCE(SUM(p.points_earned), 0) as "totalPoints"
      FROM users u
      LEFT JOIN points p ON u.id = p.user_id
      WHERE u.role = 'student'
      GROUP BY u.id, u.full_name, u.email
      ORDER BY "totalPoints" DESC
      LIMIT 10
    `, { type: sequelize.QueryTypes.SELECT });

    // Get user count
    const totalUsers = await User.count({ where: { role: 'student' } });
    
    const systemAnalytics = {
      overview: {
        totalUsers,
        totalQuizzes: 0,
        averageSystemScore: 0
      },
      topPerformers
    };
    
    res.json(systemAnalytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getUserAnalytics, getSystemAnalytics };