import React from 'react';
import { useNavigate } from 'react-router-dom';

function QuizCard({ quiz }) {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quiz/${quiz.id}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'from-green-400 to-emerald-500';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'hard': return 'from-red-400 to-pink-500';
      default: return 'from-blue-400 to-purple-500';
    }
  };

  const getDifficultyEmoji = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return '🌱';
      case 'medium': return '⚡';
      case 'hard': return '🔥';
      default: return '🎯';
    }
  };

  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20">
      {/* Floating difficulty badge */}
      <div className={`absolute -top-3 -right-3 bg-gradient-to-r ${getDifficultyColor(quiz.difficulty)} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
        {getDifficultyEmoji(quiz.difficulty)} {quiz.difficulty || 'Medium'}
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          {quiz.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{quiz.description}</p>
      </div>
      
      <div className="flex justify-between items-center mb-6 text-sm">
        {quiz.timeLimit && (
          <div className="flex items-center space-x-1 text-gray-500">
            <span>⏱️</span>
            <span>{quiz.timeLimit} min</span>
          </div>
        )}
        <div className="flex items-center space-x-1 text-gray-500">
          <span>📊</span>
          <span>{Math.floor(Math.random() * 50) + 10} questions</span>
        </div>
      </div>
      
      <button
        onClick={handleStartQuiz}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        🚀 Start Quiz
      </button>
      
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-4 right-4 w-1 h-1 bg-pink-400 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
}

export default QuizCard;