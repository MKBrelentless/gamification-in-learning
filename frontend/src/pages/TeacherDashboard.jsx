import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import TeacherQA from '../components/TeacherQA';
import CreateTopic from '../components/CreateTopic';

function TeacherDashboard() {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await analyticsAPI.getSystemAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Teacher Command Center 🎓
            </h1>
            <p className="text-xl opacity-90">Empowering minds, tracking progress</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-2">🎓</div>
                <div className="text-3xl font-bold text-emerald-400">{analytics.overview?.totalUsers || 0}</div>
                <div className="text-white/80">Total Students</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-2">🧠</div>
                <div className="text-3xl font-bold text-cyan-400">{analytics.overview?.totalQuizzes || 0}</div>
                <div className="text-white/80">Quiz Attempts</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-3xl font-bold text-teal-400">{analytics.overview?.averageSystemScore || 0}%</div>
                <div className="text-white/80">Average Score</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <div className="text-3xl font-bold text-yellow-400">24</div>
                <div className="text-white/80">Active Today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
            {['overview', 'students', 'content', 'questions', 'create-topic'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 capitalize ${
                  activeTab === tab 
                    ? 'bg-white text-emerald-900 shadow-lg' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {tab === 'questions' ? 'Q&A' : tab === 'create-topic' ? 'Create Topic' : tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Quick Actions */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6">⚡ Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-3xl mb-2">🧠</div>
                      <div className="font-semibold">Create Quiz</div>
                      <div className="text-sm opacity-80">Build new assessments</div>
                    </button>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-3xl mb-2">📚</div>
                      <div className="font-semibold">New Course</div>
                      <div className="text-sm opacity-80">Design curriculum</div>
                    </button>
                    <button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-3xl mb-2">📈</div>
                      <div className="font-semibold">Analytics</div>
                      <div className="text-sm opacity-80">View detailed reports</div>
                    </button>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6">🕰️ Recent Activity</h2>
                  <div className="space-y-4">
                    {[
                      { action: 'Quiz "React Basics" completed by 15 students', time: '2 hours ago', icon: '🎉' },
                      { action: 'New student enrolled in JavaScript course', time: '4 hours ago', icon: '🎓' },
                      { action: 'Course "Advanced React" published', time: '1 day ago', icon: '🚀' },
                      { action: 'Student feedback received', time: '2 days ago', icon: '💬' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="text-2xl">{activity.icon}</div>
                        <div className="flex-1">
                          <div className="text-white font-medium">{activity.action}</div>
                          <div className="text-white/60 text-sm">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'students' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">🎆 Top Performers</h2>
                <div className="space-y-4">
                  {analytics.topPerformers?.map((student, index) => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-white/10 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{student.username}</div>
                          <div className="text-white/70 text-sm">Level {Math.floor(student.totalPoints / 1000) + 1}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-400 font-bold text-lg">{student.totalPoints}</div>
                        <div className="text-white/60 text-sm">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'content' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">📚 Content Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'React Fundamentals', students: 45, completion: 78, icon: '⚛️' },
                    { title: 'JavaScript Basics', students: 62, completion: 85, icon: '📜' },
                    { title: 'Node.js Backend', students: 28, completion: 65, icon: '🚀' },
                    { title: 'Database Design', students: 33, completion: 72, icon: '🗺️' }
                  ].map((course, index) => (
                    <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-2xl">{course.icon}</div>
                        <div className="text-white font-semibold">{course.title}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">Students: {course.students}</span>
                          <span className="text-white/70">{course.completion}% avg</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full" style={{width: `${course.completion}%`}}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'questions' && (
              <TeacherQA />
            )}
            
            {activeTab === 'create-topic' && (
              <CreateTopic />
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Class Schedule */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-4">📅 Today's Schedule</h3>
              <div className="space-y-3">
                {[
                  { time: '09:00', class: 'React Basics', students: 25 },
                  { time: '11:00', class: 'JavaScript Advanced', students: 18 },
                  { time: '14:00', class: 'Node.js Workshop', students: 12 },
                  { time: '16:00', class: 'Office Hours', students: 8 }
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-white font-medium">{schedule.time}</div>
                      <div className="text-white/70 text-sm">{schedule.class}</div>
                    </div>
                    <div className="text-emerald-400 text-sm">{schedule.students} students</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-4">📈 This Week</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Quizzes Created</span>
                  <span className="text-emerald-400 font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Students Helped</span>
                  <span className="text-emerald-400 font-bold">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Avg Response Time</span>
                  <span className="text-emerald-400 font-bold">2.3h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Satisfaction</span>
                  <span className="text-emerald-400 font-bold">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;