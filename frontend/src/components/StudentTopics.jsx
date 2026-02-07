import React, { useState, useEffect } from 'react';
import api from '../services/api';

function StudentTopics() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await api.get('/qa/topics');
      setTopics(response.data.topics);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setResponses({});
    setShowResults(false);
    setResults(null);
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setResponses(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = async () => {
    if (Object.keys(responses).length !== selectedTopic.questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setLoading(true);
    try {
      const responseArray = selectedTopic.questions.map((_, index) => responses[index]);
      
      const result = await api.post(`/qa/topics/${selectedTopic.id}/respond`, {
        responses: responseArray
      });

      setResults(result.data);
      setShowResults(true);
    } catch (error) {
      alert('Error submitting responses');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-blue-400 bg-blue-500/20';
    }
  };

  if (showResults) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-white mb-4">Topic Completed!</h2>
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 mb-6">
          <div className="text-4xl font-bold text-green-400 mb-2">{results.score}%</div>
          <div className="text-white/80">You got {results.correct} out of {results.total} questions correct!</div>
        </div>
        <button
          onClick={() => setSelectedTopic(null)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
        >
          Back to Topics
        </button>
      </div>
    );
  }

  if (selectedTopic) {
    return (
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{selectedTopic.title}</h2>
              <p className="text-white/80 mb-3">{selectedTopic.description}</p>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedTopic.difficulty)}`}>
                  {selectedTopic.difficulty.toUpperCase()}
                </span>
                <span className="text-white/60">By {selectedTopic.teacher?.full_name}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedTopic(null)}
              className="text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {selectedTopic.questions.map((question, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-white">Question {index + 1}</h3>
            </div>
            
            <p className="text-white/90 text-lg mb-6">{question.question}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {['option_a', 'option_b', 'option_c', 'option_d'].map((option, optionIndex) => {
                const optionLabels = ['A', 'B', 'C', 'D'];
                const isSelected = responses[index] === option;
                
                return (
                  <label key={option} className={`cursor-pointer transition-all duration-300 ${
                    isSelected ? 'transform scale-105' : 'hover:scale-102'
                  }`}>
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400'
                        : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                          isSelected
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/20 text-white/70'
                        }`}>
                          {optionLabels[optionIndex]}
                        </div>
                        <span className="text-white">{question[option]}</span>
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

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={loading || Object.keys(responses).length !== selectedTopic.questions.length}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 transition-all duration-300 text-lg"
          >
            {loading ? 'Submitting...' : 'Submit Responses'}
          </button>
          <p className="text-white/60 text-sm mt-2">
            {Object.keys(responses).length} of {selectedTopic.questions.length} questions answered
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Available Topics</h2>
      
      {topics.length === 0 ? (
        <div className="text-center text-white/60 py-8">
          <div className="text-4xl mb-4">📖</div>
          <p>No topics available yet. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:scale-105 transition-all duration-300 cursor-pointer"
                 onClick={() => handleTopicSelect(topic)}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-white">{topic.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                  {topic.difficulty}
                </span>
              </div>
              
              <p className="text-white/80 mb-4 line-clamp-2">{topic.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-sm">{topic.teacher?.full_name}</span>
                <span className="text-purple-400 text-sm">{topic.questions?.length || 0} questions</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentTopics;