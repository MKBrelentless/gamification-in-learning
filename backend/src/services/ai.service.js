const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

const aiClient = axios.create({
  baseURL: AI_SERVICE_URL,
  timeout: 5000
});

const getRecommendations = async ({ userId, totalPoints, level, preferences }) => {
  const response = await aiClient.post('/recommend', {
    userId,
    totalPoints,
    level,
    preferences
  });

  return response.data;
};

const getPerformancePrediction = async ({ userId, quizId, userStats }) => {
  const response = await aiClient.post('/predict', {
    userId,
    quizId,
    userStats
  });

  return response.data;
};

const analyzeLearnerProfile = async ({ userId, quizHistory, activityData }) => {
  const response = await aiClient.post('/profile/analyze', {
    userId,
    quizHistory,
    activityData
  });

  return response.data;
};

module.exports = {
  getRecommendations,
  getPerformancePrediction,
  analyzeLearnerProfile
};