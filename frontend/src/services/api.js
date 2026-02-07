import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

// Quiz API
export const quizAPI = {
  getQuizzes: () => api.get('/quiz'),
  getQuiz: (id) => api.get(`/quiz/${id}`),
  submitQuiz: (id, answers) => api.post(`/quiz/${id}/submit`, answers),
  getResults: () => api.get('/quiz/results'),
};

// Gamification API
export const gamificationAPI = {
  getLeaderboard: () => api.get('/gamification/leaderboard'),
  getUserStats: (userId) => api.get(`/gamification/stats/${userId}`),
};

// Analytics API
export const analyticsAPI = {
  getUserAnalytics: (userId) => api.get(`/analytics/user/${userId}`),
  getSystemAnalytics: () => api.get('/analytics/system'),
};

// Recommendations API
export const recommendationAPI = {
  getRecommendations: (userStats) => api.post('/recommendations', { userStats }),
  getPrediction: (quizId, userStats) => api.post(`/recommendations/predict/${quizId}`, { userStats }),
  getProfile: (payload) => api.post('/recommendations/profile', payload),
};

export default api;