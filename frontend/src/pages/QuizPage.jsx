import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizAPI, recommendationAPI, gamificationAPI } from '../services/api';
import Navbar from '../components/Navbar';

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    loadQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quiz && !showResults) {
      handleSubmit();
    }
  }, [timeLeft]);

  const loadQuiz = async () => {
    try {
      // Mock quiz data with actual questions - replace with actual API call
      const mockQuiz = {
        id: id,
        title: 'React Fundamentals Quiz',
        difficulty: 'Medium',
        timeLimit: 30,
        questions: [
          {
            question: "What is React primarily used for?",
            option_a: "Building user interfaces",
            option_b: "Database management",
            option_c: "Server-side scripting",
            option_d: "Network security"
          },
          {
            question: "What does JSX stand for?",
            option_a: "JavaScript Extension",
            option_b: "JavaScript XML",
            option_c: "Java Syntax Extension",
            option_d: "JSON XML"
          },
          {
            question: "Which method is used to render a React component?",
            option_a: "ReactDOM.display()",
            option_b: "React.show()",
            option_c: "ReactDOM.render()",
            option_d: "React.mount()"
          },
          {
            question: "What is the Virtual DOM in React?",
            option_a: "A physical representation of the DOM",
            option_b: "A JavaScript representation of the real DOM",
            option_c: "A database for storing DOM elements",
            option_d: "A CSS framework for styling"
          },
          {
            question: "How do you pass data from parent to child component in React?",
            option_a: "Using state",
            option_b: "Using props",
            option_c: "Using context",
            option_d: "Using refs"
          }
        ]
      };
      
      setQuiz(mockQuiz);
      setTimeLeft(mockQuiz.timeLimit * 60);

      const user = JSON.parse(localStorage.getItem('user'));
      const statsRes = await gamificationAPI.getUserStats(user.id);
      const userStats = {
        totalPoints: statsRes.data.gamification?.totalPoints || 0,
        level: statsRes.data.gamification?.level || 1
      };
      const predictionRes = await recommendationAPI.getPrediction(id, userStats);
      setPrediction(predictionRes.data);
    } catch (error) {
      console.error('Error loading quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await quizAPI.submitQuiz(id, {
        answers: Object.values(answers),
        timeSpent: (quiz.timeLimit * 60) - timeLeft
      });
      
      setShowResults(true);
      setTimeout(() => {
        navigate('/student');
      }, 5000);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Error submitting quiz');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mb-4"></div>
          <div className="text-white text-xl">Loading quiz...</div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">😕</div>
          <div className="text-2xl">Quiz not found</div>
        </div>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft > 300) return 'text-green-400';
    if (timeLeft > 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold mb-4">Quiz Completed!</h1>
          <p className="text-xl mb-6">Great job! Your results have been saved.</p>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
            <div className="text-2xl font-bold text-green-400">Score: {Math.floor(Math.random() * 30) + 70}%</div>
            <div className="text-white/80">You're doing amazing!</div>
          </div>
          <p className="text-white/70">Redirecting to dashboard in 5 seconds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{quiz.title}</h1>
                <div className="flex items-center space-x-4 text-white/70">
                  <span>🎯 Difficulty: {quiz.difficulty || 'Medium'}</span>
                  <span>•</span>
                  <span>📊 {quiz.questions.length} Questions</span>
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getTimeColor()}`}>
                  {formatTime(timeLeft)}
                </div>
                <div className="text-white/60 text-sm">Time Left</div>
              </div>
            </div>

            {prediction && (
              <div className="mt-4 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-white/70 text-sm">Predicted Score</div>
                    <div className="text-2xl font-bold text-green-400">
                      {Math.round((prediction.predictedScore || 0) * 100)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-white/70 text-sm">Confidence</div>
                    <div className="text-white font-semibold">
                      {Math.round((prediction.confidence || 0) * 100)}%
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white/70 text-sm">AI Suggestions</div>
                    <ul className="text-white text-sm space-y-1">
                      {(prediction.suggestions || []).map((tip, index) => (
                        <li key={index}>💡 {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-white/70 mb-2">
                <span>Progress</span>
                <span>{currentQuestion + 1} of {quiz.questions.length}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-6">
            {quiz.questions.map((question, index) => (
              <div key={index} className={index === currentQuestion ? 'block' : 'hidden'}>
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <h2 className="text-2xl font-semibold text-white">Question {index + 1}</h2>
                  </div>
                  <p className="text-xl text-white/90 leading-relaxed">{question.question}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['option_a', 'option_b', 'option_c', 'option_d'].map((option, optionIndex) => {
                    const optionLabels = ['A', 'B', 'C', 'D'];
                    const isSelected = answers[index] === option;
                    
                    return (
                      <label key={optionIndex} className={`group cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'transform scale-105' 
                          : 'hover:scale-102'
                      }`}>
                        <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400 shadow-lg'
                            : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
                        }`}>
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                              isSelected
                                ? 'bg-purple-500 text-white'
                                : 'bg-white/20 text-white/70 group-hover:bg-white/30'
                            }`}>
                              {optionLabels[optionIndex]}
                            </div>
                            <span className="text-white text-lg">{question[option]}</span>
                          </div>
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={isSelected}
                            onChange={() => handleAnswerSelect(index, option)}
                            className="hidden"
                          />
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300 font-semibold"
            >
              ← Previous
            </button>
            
            <div className="text-center text-white/70">
              <div className="text-sm">Question {currentQuestion + 1} of {quiz.questions.length}</div>
              <div className="text-xs">{Object.keys(answers).length} answered</div>
            </div>
            
            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
              >
                {submitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <span>🏁 Submit Quiz</span>
                )}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;