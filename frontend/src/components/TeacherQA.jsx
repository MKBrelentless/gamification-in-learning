import React, { useState, useEffect } from 'react';
import api from '../services/api';

function TeacherQA() {
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    fetchPendingQuestions();
  }, []);

  const fetchPendingQuestions = async () => {
    try {
      const response = await api.get('/qa/pending-questions');
      setPendingQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitResponse = async (questionId) => {
    const response = responses[questionId];
    if (!response?.trim()) return;

    setLoading(prev => ({ ...prev, [questionId]: true }));
    try {
      await api.post(`/qa/questions/${questionId}/respond`, {
        response
      });

      setPendingQuestions(prev => prev.filter(q => q.id !== questionId));
      setResponses(prev => ({ ...prev, [questionId]: '' }));
      alert('Response sent successfully!');
    } catch (error) {
      alert('Error sending response');
    } finally {
      setLoading(prev => ({ ...prev, [questionId]: false }));
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Student Questions</h2>
      
      {pendingQuestions.length === 0 ? (
        <div className="text-center text-white/60 py-8">
          <div className="text-4xl mb-4">✅</div>
          <p>No pending questions. Great job staying on top of student inquiries!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingQuestions.map((question) => (
            <div key={question.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {question.student?.full_name?.charAt(0) || 'S'}
                    </div>
                    <div>
                      <p className="text-white font-medium">{question.student?.full_name}</p>
                      <p className="text-white/60 text-sm">{question.student?.email}</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4 mb-3">
                    <p className="text-blue-400 font-medium text-sm mb-2">Question:</p>
                    <p className="text-white">{question.question}</p>
                  </div>
                  
                  {question.topic_request && (
                    <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg p-4 mb-4">
                      <p className="text-purple-400 font-medium text-sm mb-2">Topic Request:</p>
                      <p className="text-white">{question.topic_request}</p>
                    </div>
                  )}
                </div>
                
                <div className="text-white/50 text-xs">
                  {new Date(question.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-white/80 font-medium">Your Response:</label>
                <textarea
                  value={responses[question.id] || ''}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  placeholder="Type your response to help this student..."
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                  rows={3}
                />
                
                <button
                  onClick={() => handleSubmitResponse(question.id)}
                  disabled={loading[question.id] || !responses[question.id]?.trim()}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 transition-all duration-300"
                >
                  {loading[question.id] ? 'Sending...' : 'Send Response'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherQA;