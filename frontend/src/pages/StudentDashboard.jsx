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
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseContent, setCourseContent] = useState('');
  const [showTopicInput, setShowTopicInput] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  const [userTopics, setUserTopics] = useState([]);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);
  const [rewardMessage, setRewardMessage] = useState('');
  const [completedTopics, setCompletedTopics] = useState([]);

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

  const handleAddTopic = () => {
    if (customTopic && !userTopics.find(t => t.title === customTopic)) {
      const newTopic = {
        title: customTopic,
        description: `Learn about ${customTopic}`,
        reason: 'Custom topic added by you',
        points: 50
      };
      setUserTopics([...userTopics, newTopic]);
      setCustomTopic('');
      setShowTopicInput(false);
      
      // Award points for adding topic
      showReward('+50 XP for adding a new topic! 🎯');
    }
  };

  const showReward = (message) => {
    setRewardMessage(message);
    setShowRewardAnimation(true);
    setTimeout(() => setShowRewardAnimation(false), 3000);
  };

  const handleCompleteTopic = (topic) => {
    if (!completedTopics.includes(topic.title)) {
      setCompletedTopics([...completedTopics, topic.title]);
      showReward('+100 XP for completing a topic! 🏆');
    }
  };

  const handleStartLearning = async (course) => {
    const topic = course?.title || customTopic;
    const description = course?.description || `Learn about ${customTopic}`;
    
    setSelectedCourse({ title: topic, description });
    setShowTopicInput(false);
    setCustomTopic('');
    setCourseContent('Loading AI-generated content...');
    
    setTimeout(() => {
      setCourseContent(`
# ${topic}

## Introduction
Welcome to this comprehensive learning module on ${topic}. This course will help you master the essential concepts and skills.

## Key Concepts
1. **Fundamental Principles**: Understanding the core concepts
2. **Practical Applications**: Real-world use cases
3. **Best Practices**: Industry-standard approaches
4. **Advanced Techniques**: Taking your skills to the next level

## Learning Objectives
- Master the fundamental concepts
- Apply knowledge to practical scenarios
- Develop problem-solving skills
- Build confidence in the subject

## Course Content
${description}

## Practice Exercises
1. Complete the interactive quiz
2. Work on hands-on projects
3. Participate in peer discussions
4. Review and reflect on your learning

## Next Steps
Continue your learning journey by exploring related topics and completing the assessment.
      `);
    }, 1500);
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
                    <button 
                      onClick={() => setShowTopicInput(true)}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                    >
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
                {userTopics.length > 0 && (
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-white">🎯 Personalized for You</h2>
                      <button
                        onClick={() => setShowTopicInput(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        + Add Topic
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userTopics.map((rec, index) => {
                        const isCompleted = completedTopics.includes(rec.title);
                        return (
                        <div key={index} className={`bg-gradient-to-r ${isCompleted ? 'from-green-500/20 to-emerald-500/20' : 'from-blue-500/20 to-purple-500/20'} p-4 rounded-xl border border-white/10 hover:scale-105 transition-all duration-300 relative`}>
                          {isCompleted && (
                            <div className="absolute top-2 right-2 text-2xl">✅</div>
                          )}
                          <h3 className="font-semibold text-white mb-2">{rec.title}</h3>
                          <p className="text-white/80 text-sm">{rec.description}</p>
                          {rec.reason && (
                            <p className="text-white/60 text-xs mt-2">💡 {rec.reason}</p>
                          )}
                          <div className="flex gap-2 mt-3">
                            <button 
                              onClick={() => handleStartLearning(rec)}
                              className="flex-1 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                            >
                              {isCompleted ? 'Review' : 'Start Learning'}
                            </button>
                            {!isCompleted && (
                              <button 
                                onClick={() => handleCompleteTopic(rec)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                              >
                                ✓ Complete
                              </button>
                            )}
                          </div>
                        </div>
                        );
                      })}
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
                <p className="text-white/80 mb-4">Complete 3 topics today!</p>
                <div className="bg-white/20 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-pink-500 h-2 rounded-full" style={{width: `${(completedTopics.length / 3) * 100}%`}}></div>
                </div>
                <p className="text-white/60 text-sm">{completedTopics.length}/3 completed</p>
                <div className="mt-4 text-yellow-400 font-bold">Reward: 500 XP + 🏆 Badge</div>
              </div>
            </div>
            
            {/* Achievements Showcase */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-4">🏆 Recent Achievements</h3>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
                  <div className="text-3xl">🥇</div>
                  <div>
                    <div className="text-white font-semibold text-sm">First Steps</div>
                    <div className="text-white/60 text-xs">Added your first topic</div>
                  </div>
                </div>
                {completedTopics.length > 0 && (
                  <div className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
                    <div className="text-3xl">⚡</div>
                    <div>
                      <div className="text-white font-semibold text-sm">Quick Learner</div>
                      <div className="text-white/60 text-xs">Completed {completedTopics.length} topic{completedTopics.length > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                )}
                {completedTopics.length >= 3 && (
                  <div className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
                    <div className="text-3xl">🔥</div>
                    <div>
                      <div className="text-white font-semibold text-sm">On Fire!</div>
                      <div className="text-white/60 text-xs">3-day streak achieved</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reward Animation */}
      {showRewardAnimation && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full shadow-2xl font-bold text-lg">
            {rewardMessage}
          </div>
        </div>
      )}

      {/* Topic Input Modal */}
      {showTopicInput && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-white mb-4">What do you want to learn?</h2>
            <p className="text-white/70 text-sm mb-4">Enter a topic and it will be added to your personalized recommendations</p>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Enter a topic (e.g., Python Programming, Data Science)"
              className="w-full px-4 py-3 bg-white/90 rounded-lg mb-4 text-gray-900"
              onKeyPress={(e) => e.key === 'Enter' && customTopic && handleAddTopic()}
            />
            <div className="flex gap-3">
              <button
                onClick={handleAddTopic}
                disabled={!customTopic}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Add Topic
              </button>
              <button
                onClick={() => { setShowTopicInput(false); setCustomTopic(''); }}
                className="flex-1 bg-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Content Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{selectedCourse.title}</h2>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 text-white">
              <div className="prose prose-invert max-w-none">
                {courseContent.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) return <h1 key={index} className="text-3xl font-bold mb-4">{line.substring(2)}</h1>;
                  if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
                  if (line.startsWith('- ')) return <li key={index} className="ml-6 mb-2">{line.substring(2)}</li>;
                  if (line.match(/^\d+\./)) return <li key={index} className="ml-6 mb-2">{line}</li>;
                  if (line.includes('**')) {
                    const parts = line.split('**');
                    return <p key={index} className="mb-3">{parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}</p>;
                  }
                  return line ? <p key={index} className="mb-3">{line}</p> : <br key={index} />;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;