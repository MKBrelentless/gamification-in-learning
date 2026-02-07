import React, { useState, useEffect } from 'react';
import { gamificationAPI } from '../services/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const response = await gamificationAPI.getLeaderboard();
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankEmoji = (index) => {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '🎯';
    }
  };

  const getRankGradient = (index) => {
    switch(index) {
      case 0: return 'from-yellow-400 to-yellow-600';
      case 1: return 'from-gray-300 to-gray-500';
      case 2: return 'from-orange-400 to-orange-600';
      default: return 'from-purple-400 to-purple-600';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/20 rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-white/10 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">🏆 Champions</h2>
        <p className="text-white/70">Top performers this week</p>
      </div>
      
      <div className="space-y-3">
        {leaderboard.map((user, index) => (
          <div 
            key={user.id} 
            className={`relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 ${
              index < 3 
                ? `bg-gradient-to-r ${getRankGradient(index)} shadow-lg` 
                : 'bg-white/10 backdrop-blur-sm border border-white/20'
            }`}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  index < 3 ? 'bg-white/20' : 'bg-white/10'
                } font-bold text-lg`}>
                  <span className="text-2xl">{getRankEmoji(index)}</span>
                </div>
                
                <div>
                  <div className={`font-bold ${
                    index < 3 ? 'text-white' : 'text-white'
                  }`}>
                    {user.username || user.full_name}
                  </div>
                  <div className={`text-sm ${
                    index < 3 ? 'text-white/80' : 'text-white/60'
                  }`}>
                    {user.totalPoints} points
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  index < 3 ? 'text-white/90' : 'text-white/70'
                }`}>
                  #{index + 1}
                </div>
                {index < 3 && (
                  <div className="text-xs text-white/70">
                    ⭐ Elite
                  </div>
                )}
              </div>
            </div>
            
            {/* Animated background for top 3 */}
            {index < 3 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
      
      {/* View All Button */}
      <button className="w-full mt-4 bg-white/10 backdrop-blur-sm text-white py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 font-medium">
        👀 View Full Rankings
      </button>
    </div>
  );
}

export default Leaderboard;