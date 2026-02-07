import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function LessonPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Mock lesson data - replace with actual API call
    setTimeout(() => {
      setLesson({
        id: id,
        title: 'Introduction to React',
        content: `
          <h2>What is React?</h2>
          <p>React is a JavaScript library for building user interfaces. It was developed by Facebook and is now maintained by Facebook and the community.</p>
          
          <h3>Key Features:</h3>
          <ul>
            <li>Component-based architecture</li>
            <li>Virtual DOM for better performance</li>
            <li>Unidirectional data flow</li>
            <li>JSX syntax</li>
          </ul>
          
          <h3>Getting Started:</h3>
          <p>To create a new React app, you can use Create React App:</p>
          <pre><code>npx create-react-app my-app</code></pre>
          
          <h3>Your First Component:</h3>
          <pre><code>
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
          </code></pre>
        `,
        course: { title: 'React Fundamentals' },
        difficulty_level: 'beginner',
        duration: '15 min read',
        points: 50
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    // Simulate reading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsCompleted(true);
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [lesson]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <div className="text-white text-xl">Loading lesson...</div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">📚</div>
          <div className="text-2xl">Lesson not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <Navbar />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Lesson Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl">
                  📚
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{lesson.title}</h1>
                  <div className="flex items-center space-x-4 text-white/70">
                    <span>🏆 {lesson.course.title}</span>
                    <span>•</span>
                    <span>🎯 {lesson.difficulty_level}</span>
                    <span>•</span>
                    <span>⏱️ {lesson.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{lesson.points}</div>
                <div className="text-white/60 text-sm">Points</div>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-white/70 mb-2">
                <span>Reading Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            {isCompleted && (
              <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 mt-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <div className="text-green-400 font-semibold">Lesson Completed!</div>
                    <div className="text-white/70 text-sm">You've earned {lesson.points} points</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Lesson Content */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <div className="prose prose-lg prose-invert max-w-none">
              <style jsx>{`
                .prose h2 {
                  color: #60a5fa;
                  font-size: 2rem;
                  font-weight: bold;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                }
                .prose h3 {
                  color: #a78bfa;
                  font-size: 1.5rem;
                  font-weight: 600;
                  margin-top: 1.5rem;
                  margin-bottom: 0.75rem;
                }
                .prose p {
                  color: rgba(255, 255, 255, 0.9);
                  line-height: 1.7;
                  margin-bottom: 1rem;
                }
                .prose ul {
                  color: rgba(255, 255, 255, 0.8);
                }
                .prose li {
                  margin-bottom: 0.5rem;
                }
                .prose pre {
                  background: rgba(0, 0, 0, 0.3);
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  border-radius: 12px;
                  padding: 1.5rem;
                  margin: 1rem 0;
                }
                .prose code {
                  color: #fbbf24;
                  font-family: 'Monaco', 'Menlo', monospace;
                }
              `}</style>
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            </div>
          </div>
          
          {/* Interactive Elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Key Takeaways */}
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4">🎯 Key Takeaways</h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>React is a component-based library</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Virtual DOM improves performance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>JSX makes writing components easier</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Unidirectional data flow</span>
                </li>
              </ul>
            </div>
            
            {/* Quick Quiz */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4">⚡ Quick Check</h3>
              <p className="text-white/80 mb-4">Test your understanding with a quick question:</p>
              <div className="bg-white/10 p-4 rounded-xl mb-4">
                <p className="text-white font-medium mb-3">What does JSX stand for?</p>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/80">
                    A) JavaScript XML
                  </button>
                  <button className="w-full text-left p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/80">
                    B) Java Syntax Extension
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button className="flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 font-semibold">
              <span>←</span>
              <span>Previous Lesson</span>
            </button>
            
            <div className="text-center text-white/70">
              <div className="text-sm">Lesson 1 of 12</div>
              <div className="text-xs">React Fundamentals Course</div>
            </div>
            
            <button className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105">
              <span>Next Lesson</span>
              <span>→</span>
            </button>
          </div>
          
          {/* Floating Action Button */}
          <div className="fixed bottom-8 right-8">
            <button className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center text-2xl">
              📝
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonPage;