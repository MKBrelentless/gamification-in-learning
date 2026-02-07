import React, { useState, useEffect } from 'react';
import { quizAPI, gamificationAPI, recommendationAPI } from '../services/api';
import Navbar from '../components/Navbar';
import QuizCard from '../components/QuizCard';
import Leaderboard from '../components/Leaderboard';
import StudentQA from '../components/StudentQA';
import StudentTopics from '../components/StudentTopics';

function StudentDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [learnerProfile, setLearnerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    loadDashboardData();
    calculateStreak();
  }, []);

  const loadDashboardData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const [quizzesRes, statsRes] = await Promise.all([
        quizAPI.getQuizzes(),
        gamificationAPI.getUserStats(user.id)
      ]);
      const statsPayload = {
        totalPoints: statsRes.data.gamification?.totalPoints || 0,
        level: statsRes.data.gamification?.level || 1
      };

      const [recRes, profileRes] = await Promise.all([
        recommendationAPI.getRecommendations(statsPayload),
        recommendationAPI.getProfile({
          quizHistory: statsRes.data.pointHistory || [],
          activityData: []
        })
      ]);

      setQuizzes(quizzesRes.data);
      setUserStats(statsRes.data);
      setRecommendations(recRes.data.recommendations);
      setLearnerProfile(profileRes.data.profile);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStreak = () => {
    setStreakCount(Math.floor(Math.random() * 15) + 1);
  };

  const getProgressPercentage = () => {
    const currentLevel = userStats.gamification?.level || 1;
    const points = userStats.gamification?.totalPoints || 0;
    const nextLevelPoints = currentLevel * 1000;
    const currentLevelPoints = (currentLevel - 1) * 1000;
    return ((points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              Welcome Back, Champion! 🚀
            </h1>
            <p className="text-xl opacity-90">Ready to level up your knowledge?</p>
          </div>
          
          {/* Floating Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <div className="text-3xl font-bold text-yellow-400">{userStats.gamification?.totalPoints || 0}</div>
                <div className="text-white/80">Power Points</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-3xl font-bold text-green-400">{userStats.gamification?.level || 1}</div>
                <div className="text-white/80">Level</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-3xl font-bold text-purple-400">{userStats.gamification?.badges?.length || 0}</div>
                <div className="text-white/80">Achievements</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-2">🔥</div>
                <div className="text-3xl font-bold text-orange-400">{streakCount}</div>
                <div className="text-white/80">Day Streak</div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">Level Progress</h3>
              <span className="text-white/80">Level {userStats.gamification?.level || 1}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <div className="text-right text-white/60 text-sm mt-2">
              {Math.round(getProgressPercentage())}% to next level
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
            {['overview', 'quizzes', 'topics', 'questions', 'achievements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 capitalize ${
                  activeTab === tab 
                    ? 'bg-white text-purple-900 shadow-lg' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {tab === 'questions' ? 'Q&A' : tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Quick Actions */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6">🎮 Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-2xl mb-2">📚</div>
                      <div className="font-semibold">Study Mode</div>
                    </button>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-2xl mb-2">⚡</div>
                      <div className="font-semibold">Quick Quiz</div>
                    </button>
                    <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="font-semibold">Challenge</div>
                    </button>
                  </div>
                </div>
                
                {/* Recommendations */}
                {recommendations.length > 0 && (
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-6">🎯 Personalized for You</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendations.map((rec, index) => (
                        <div key={index} className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-xl border border-white/10 hover:scale-105 transition-all duration-300">
                          <h3 className="font-semibold text-white mb-2">{rec.title}</h3>
                          <p className="text-white/80 text-sm">{rec.description}</p>
                          {rec.reason && (
                            <p className="text-white/60 text-xs mt-2">💡 {rec.reason}</p>
                          )}
                          <button className="mt-3 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                            Start Learning
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {learnerProfile && (
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-6">🧠 Your Learning Profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-white/70 text-sm">Learning Style</div>
                        <div className="text-xl text-white font-semibold">{learnerProfile.learning_style}</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-white/70 text-sm">Difficulty Preference</div>
                        <div className="text-xl text-white font-semibold">{learnerProfile.difficulty_preference}</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-white/70 text-sm">Engagement Level</div>
                        <div className="text-xl text-white font-semibold">{learnerProfile.engagement_level}</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-white/70 text-sm">Recommended Pace</div>
                        <div className="text-xl text-white font-semibold">{learnerProfile.recommended_pace}</div>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-white/70 text-sm mb-2">Strengths</div>
                        <ul className="text-white text-sm space-y-1">
                          {learnerProfile.strengths?.map((item, index) => (
                            <li key={index}>✅ {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-white/70 text-sm mb-2">Areas to Improve</div>
                        <ul className="text-white text-sm space-y-1">
                          {learnerProfile.areas_for_improvement?.map((item, index) => (
                            <li key={index}>🎯 {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'quizzes' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">🧠 Available Quizzes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quizzes.map(quiz => (
                    <div key={quiz.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
                      <QuizCard quiz={quiz} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'topics' && (
              <StudentTopics />
            )}
            
            {activeTab === 'questions' && (
              <StudentQA />
            )}
            
            {activeTab === 'achievements' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">🏆 Your Achievements</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['🥇', '🎯', '⚡', '🔥', '💎', '🚀', '🎪', '🌟'].map((emoji, index) => (
                    <div key={index} className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 p-6 rounded-xl text-center border border-white/10 hover:scale-105 transition-all duration-300">
                      <div className="text-4xl mb-2">{emoji}</div>
                      <div className="text-white font-medium">Achievement {index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
              <Leaderboard />
            </div>
            
            {/* Daily Challenge */}
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-4">🎯 Daily Challenge</h3>
              <div className="text-center">
                <div className="text-6xl mb-4">🎲</div>
                <p className="text-white/80 mb-4">Complete 3 quizzes today!</p>
                <div className="bg-white/20 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-pink-500 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
                <p className="text-white/60 text-sm">2/3 completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;