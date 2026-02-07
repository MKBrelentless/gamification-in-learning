import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/api';
import Navbar from '../components/Navbar';

function AdminDashboard() {
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
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-200 border-t-slate-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-slate-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-400 to-zinc-400 bg-clip-text text-transparent">
              System Control Hub 🔧
            </h1>
            <p className="text-xl opacity-90">Managing the digital learning ecosystem</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-3xl font-bold text-slate-400">{analytics.overview?.totalUsers || 0}</div>
                <div className="text-white/80">Total Users</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-2">🧠</div>
                <div className="text-3xl font-bold text-zinc-400">{analytics.overview?.totalQuizzes || 0}</div>
                <div className="text-white/80">Total Quizzes</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-3xl font-bold text-gray-400">{analytics.overview?.averageSystemScore || 0}%</div>
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
            {['overview', 'users', 'system', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 capitalize ${
                  activeTab === tab 
                    ? 'bg-white text-slate-900 shadow-lg' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* System Management */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6">🔧 System Management</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="bg-gradient-to-r from-slate-600 to-gray-600 text-white p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-3xl mb-2">👥</div>
                      <div className="font-semibold">Manage Users</div>
                      <div className="text-sm opacity-80">User roles & permissions</div>
                    </button>
                    <button className="bg-gradient-to-r from-gray-600 to-zinc-600 text-white p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-3xl mb-2">📚</div>
                      <div className="font-semibold">Manage Courses</div>
                      <div className="text-sm opacity-80">Content oversight</div>
                    </button>
                    <button className="bg-gradient-to-r from-zinc-600 to-slate-600 text-white p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-3xl mb-2">⚙️</div>
                      <div className="font-semibold">System Settings</div>
                      <div className="text-sm opacity-80">Platform configuration</div>
                    </button>
                    <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-3xl mb-2">📈</div>
                      <div className="font-semibold">View Logs</div>
                      <div className="text-sm opacity-80">System monitoring</div>
                    </button>
                  </div>
                </div>
                
                {/* System Health */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6">🟢 System Health</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { metric: 'Server Uptime', value: '99.9%', status: 'excellent', color: 'emerald' },
                      { metric: 'Response Time', value: '120ms', status: 'good', color: 'green' },
                      { metric: 'Database Load', value: '45%', status: 'normal', color: 'blue' },
                      { metric: 'Memory Usage', value: '67%', status: 'warning', color: 'yellow' }
                    ].map((health, index) => (
                      <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white/80">{health.metric}</span>
                          <span className={`text-${health.color}-400 font-bold`}>{health.value}</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div className={`bg-${health.color}-400 h-2 rounded-full`} style={{width: health.value}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'users' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">🏆 Top Performers</h2>
                <div className="space-y-4">
                  {analytics.topPerformers?.map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-600/20 to-gray-600/20 rounded-xl border border-white/10 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-slate-400 to-gray-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{user.username}</div>
                          <div className="text-white/70 text-sm">Level {Math.floor(user.totalPoints / 1000) + 1} • Student</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-400 font-bold text-lg">{user.totalPoints}</div>
                        <div className="text-white/60 text-sm">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'system' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">🔍 System Monitoring</h2>
                <div className="space-y-6">
                  {[
                    { title: 'Active Sessions', count: 156, change: '+12%', icon: '👥' },
                    { title: 'Quiz Completions', count: 89, change: '+8%', icon: '✅' },
                    { title: 'New Registrations', count: 23, change: '+15%', icon: '🎆' },
                    { title: 'Error Rate', count: '0.2%', change: '-5%', icon: '⚠️' }
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{stat.icon}</div>
                        <div>
                          <div className="text-white font-semibold">{stat.title}</div>
                          <div className="text-white/70 text-sm">Last 24 hours</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-400 font-bold text-xl">{stat.count}</div>
                        <div className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'analytics' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">📈 Platform Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'User Growth', value: '+24%', period: 'This month', trend: 'up' },
                    { title: 'Engagement Rate', value: '78%', period: 'Average', trend: 'up' },
                    { title: 'Course Completion', value: '65%', period: 'Overall', trend: 'stable' },
                    { title: 'Satisfaction Score', value: '4.7/5', period: 'User rating', trend: 'up' }
                  ].map((metric, index) => (
                    <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <div className="text-white font-semibold mb-2">{metric.title}</div>
                      <div className="text-3xl font-bold text-slate-400 mb-1">{metric.value}</div>
                      <div className="text-white/60 text-sm">{metric.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Alerts */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-4">🚨 System Alerts</h3>
              <div className="space-y-3">
                {[
                  { type: 'info', message: 'Database backup completed', time: '2h ago' },
                  { type: 'warning', message: 'High memory usage detected', time: '4h ago' },
                  { type: 'success', message: 'Security scan passed', time: '6h ago' },
                  { type: 'info', message: 'New user milestone reached', time: '8h ago' }
                ].map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'warning' ? 'bg-yellow-400' :
                      alert.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-white text-sm">{alert.message}</div>
                      <div className="text-white/60 text-xs">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-slate-600/20 to-gray-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-4">⚡ Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-white/10 text-white p-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  🔄 Restart Services
                </button>
                <button className="w-full bg-white/10 text-white p-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  📊 Generate Report
                </button>
                <button className="w-full bg-white/10 text-white p-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  🔒 Security Scan
                </button>
                <button className="w-full bg-white/10 text-white p-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  💾 Backup Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;