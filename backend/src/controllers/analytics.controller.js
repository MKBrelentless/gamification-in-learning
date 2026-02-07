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
    const mockSystemAnalytics = {
      overview: {
        totalUsers: 150,
        totalQuizzes: 45,
        averageSystemScore: 72
      },
      topPerformers: [
        { id: 1, username: 'john_doe', totalPoints: 850 },
        { id: 2, username: 'jane_smith', totalPoints: 720 },
        { id: 3, username: 'mike_johnson', totalPoints: 680 }
      ]
    };
    
    res.json(mockSystemAnalytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getUserAnalytics, getSystemAnalytics };