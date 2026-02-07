const { getRecommendations, getPerformancePrediction, analyzeLearnerProfile } = require('../services/ai.service');

const buildFallbackRecommendations = () => ([
  {
    type: 'quiz',
    title: 'Practice Quiz - Beginner Level',
    description: 'Start with basic concepts',
    difficulty: 'easy',
    reason: 'Solid foundation starter'
  },
  {
    type: 'lesson',
    title: 'Introduction to Learning',
    description: 'Build your foundation',
    difficulty: 'beginner',
    reason: 'Recommended for consistent progress'
  }
]);

const getRecommendationsForUser = async (req, res) => {
  try {
    const { userStats } = req.body;
    const payload = {
      userId: req.user.id,
      totalPoints: userStats?.totalPoints ?? 0,
      level: userStats?.level ?? 1,
      preferences: userStats?.preferences ?? null
    };

    const aiResponse = await getRecommendations(payload);
    res.json({
      recommendations: aiResponse.recommendations,
      message: 'Recommendations available'
    });
  } catch (error) {
    const fallbackRecommendations = buildFallbackRecommendations();
    res.json({
      recommendations: fallbackRecommendations,
      message: 'AI unavailable, returning fallback recommendations'
    });
  }
};

const getPredictedPerformance = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { userStats } = req.body;

    const aiResponse = await getPerformancePrediction({
      userId: req.user.id,
      quizId,
      userStats: userStats || {}
    });

    res.json({
      predictedScore: aiResponse.predicted_score,
      confidence: aiResponse.confidence,
      suggestions: aiResponse.suggestions
    });
  } catch (error) {
    res.json({
      predictedScore: 0.7,
      confidence: 0.6,
      suggestions: ['Review the lesson materials before taking the quiz']
    });
  }
};

const getLearnerProfile = async (req, res) => {
  try {
    const { quizHistory = [], activityData = [] } = req.body;
    const aiResponse = await analyzeLearnerProfile({
      userId: req.user.id,
      quizHistory,
      activityData
    });

    res.json({
      profile: aiResponse
    });
  } catch (error) {
    res.json({
      profile: {
        learning_style: 'visual',
        difficulty_preference: 'moderate',
        engagement_level: 'medium',
        strengths: ['persistence'],
        areas_for_improvement: ['time management'],
        recommended_pace: 'average'
      }
    });
  }
};

module.exports = { getRecommendationsForUser, getPredictedPerformance, getLearnerProfile };