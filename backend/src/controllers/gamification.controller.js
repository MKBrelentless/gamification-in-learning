const { Point, User } = require('../models/Simple');
const { sequelize } = require('../config/db');

const awardPoints = async (req, res) => {
  try {
    const { userId, points_earned, reason } = req.body;
    
    const pointRecord = await Point.create({
      user_id: userId,
      points_earned,
      reason
    });

    res.json({ message: 'Points awarded successfully', points: points_earned });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await sequelize.query(`
      SELECT 
        u.id,
        u.full_name,
        u.email,
        COALESCE(SUM(p.points_earned), 0) as "totalPoints"
      FROM users u
      LEFT JOIN points p ON u.id = p.user_id
      WHERE u.role = 'student'
      GROUP BY u.id, u.full_name, u.email
      ORDER BY "totalPoints" DESC
      LIMIT 10
    `, { type: sequelize.QueryTypes.SELECT });
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserStats = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const pointHistory = await Point.findAll({ 
      where: { user_id: userId },
      order: [['createdAt', 'DESC']],
      limit: 20
    });

    const totalPoints = pointHistory.reduce((sum, point) => sum + point.points_earned, 0);

    res.json({
      gamification: {
        totalPoints,
        level: Math.floor(totalPoints / 100) + 1,
        badges: []
      },
      pointHistory
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { awardPoints, getLeaderboard, getUserStats };