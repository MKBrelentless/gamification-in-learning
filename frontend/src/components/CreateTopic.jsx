import React, { useState } from 'react';
import axios from 'axios';

function CreateTopic() {
  const [topic, setTopic] = useState({
    title: '',
    description: '',
    difficulty: 'medium'
  });
  const [questions, setQuestions] = useState([{
    question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: 'option_a'
  }]);
  const [loading, setLoading] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: 'option_a'
    }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.title || !topic.description || questions.some(q => !q.question)) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/qa/topics', {
        ...topic,
        questions
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Topic created successfully!');
      setTopic({ title: '', description: '', difficulty: 'medium' });
      setQuestions([{
        question: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: 'option_a'
      }]);
    } catch (error) {
      alert('Error creating topic');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Create New Topic</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 mb-2">Topic Title *</label>
            <input
              type="text"
              value={topic.title}
              onChange={(e) => setTopic({...topic, title: e.target.value})}
              placeholder="e.g., Introduction to JavaScript"
              className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-white/80 mb-2">Difficulty</label>
            <select
              value={topic.difficulty}
              onChange={(e) => setTopic({...topic, difficulty: e.target.value})}
              className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-white/80 mb-2">Description *</label>
          <textarea
            value={topic.description}
            onChange={(e) => setTopic({...topic, description: e.target.value})}
            placeholder="Describe what students will learn..."
            className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
            rows={3}
            required
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Questions</h3>
            <button
              type="button"
              onClick={addQuestion}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Add Question
            </button>
          </div>
          
          {questions.map((q, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-white font-medium">Question {index + 1}</h4>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                  placeholder="Enter your question..."
                  className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['option_a', 'option_b', 'option_c', 'option_d'].map((option, optionIndex) => (
                    <div key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`correct_${index}`}
                        checked={q.correct_answer === option}
                        onChange={() => updateQuestion(index, 'correct_answer', option)}
                        className="text-emerald-500"
                      />
                      <input
                        type="text"
                        value={q[option]}
                        onChange={(e) => updateQuestion(index, option, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                        className="flex-1 p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 transition-all duration-300 text-lg"
        >
          {loading ? 'Creating Topic...' : 'Create Topic'}
        </button>
      </form>
    </div>
  );
}

export default CreateTopic;