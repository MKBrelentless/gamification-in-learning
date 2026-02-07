import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import ProgressChart from '../components/ProgressChart';

function AnalyticsPage() {
  const [userAnalytics, setUserAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserAnalytics();
  }, []);

  const loadUserAnalytics = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await analyticsAPI.getUserAnalytics(user.id);
      setUserAnalytics(response.data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading analytics...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Quizzes Completed</h3>
            <p className="text-3xl font-bold text-blue-500">
              {userAnalytics.quizPerformance?.totalQuizzes || 0}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Average Score</h3>
            <p className="text-3xl font-bold text-green-500">
              {userAnalytics.quizPerformance?.averageScore || 0}%
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Points</h3>
            <p className="text-3xl font-bold text-purple-500">
              {userAnalytics.pointsHistory?.reduce((sum, point) => sum + point.points_earned, 0) || 0}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Recent Quiz Results</h2>
            <div className="space-y-3">
              {userAnalytics.quizPerformance?.recentResults?.map((result, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">{result.quiz?.title || 'Quiz'}</span>
                  <span className={`font-semibold ${result.score >= result.totalQuestions * 0.7 ? 'text-green-500' : 'text-red-500'}`}>
                    {result.score}/{result.totalQuestions}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Points History</h2>
            <ProgressChart data={userAnalytics.pointsHistory || []} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {userAnalytics.recentActivity?.map((activity, index) => (
              <div key={index} className="flex justify-between items-center p-3 border-b">
                <span className="font-medium">{activity.action.replace('_', ' ').toUpperCase()}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;