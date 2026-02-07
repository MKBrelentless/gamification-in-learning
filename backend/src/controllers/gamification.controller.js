const { Point } = require('../models/Simple');

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
    const mockLeaderboard = [
      { id: 1, full_name: 'John Doe', totalPoints: 850 },
      { id: 2, full_name: 'Jane Smith', totalPoints: 720 },
      { id: 3, full_name: 'Mike Johnson', totalPoints: 680 },
      { id: 4, full_name: 'Sarah Wilson', totalPoints: 590 },
      { id: 5, full_name: 'Tom Brown', totalPoints: 520 }
    ];
    
    res.json(mockLeaderboard);
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