import React, { useState, useEffect } from 'react';
import api from '../services/api';

function StudentQA() {
  const [question, setQuestion] = useState('');
  const [topicRequest, setTopicRequest] = useState('');
  const [myQuestions, setMyQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMyQuestions();
  }, []);

  const fetchMyQuestions = async () => {
    try {
      const response = await api.get('/qa/my-questions');
      setMyQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      await api.post('/qa/questions', {
        question,
        topic_request: topicRequest
      });

      setQuestion('');
      setTopicRequest('');
      fetchMyQuestions();
      alert('Question submitted! Please wait for teacher response.');
    } catch (error) {
      alert('Error submitting question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">Ask a Question</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2">Your Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to know?"
              className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              rows={4}
              required
            />
          </div>
          
          <div>
            <label className="block text-white/80 mb-2">Topic Request (Optional)</label>
            <input
              type="text"
              value={topicRequest}
              onChange={(e) => setTopicRequest(e.target.value)}
              placeholder="Request a specific topic to be taught"
              className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all duration-300"
          >
            {loading ? 'Sending...' : 'Send Question'}
          </button>
        </form>
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">My Questions</h2>
        
        {myQuestions.length === 0 ? (
          <div className="text-center text-white/60 py-8">
            <p>No questions asked yet. Ask your first question above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {myQuestions.map((q) => (
              <div key={q.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="text-white font-medium mb-2">{q.question}</p>
                    {q.topic_request && (
                      <p className="text-purple-300 text-sm mb-2">
                        Topic Request: {q.topic_request}
                      </p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    q.status === 'answered' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {q.status === 'answered' ? 'Answered' : 'Pending'}
                  </span>
                </div>
                
                {q.teacher_response && (
                  <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-3 mt-3">
                    <p className="text-green-400 font-medium text-sm mb-1">Teacher Response:</p>
                    <p className="text-white/90">{q.teacher_response}</p>
                  </div>
                )}
                
                <div className="text-white/50 text-xs mt-2">
                  Asked on {new Date(q.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentQA;