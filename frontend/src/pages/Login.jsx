import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = isLogin 
        ? await authAPI.login(formData)
        : await authAPI.register({ ...formData, full_name: formData.name, role: 'student' });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      const userRole = response.data.user.role;
      navigate(`/${userRole}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/20 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back!' : 'Join the Adventure!'}
          </h2>
          <p className="text-white/70">
            {isLogin ? 'Ready to level up your knowledge?' : 'Start your learning journey today'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <div className="absolute left-4 top-4 text-white/60">👤</div>
            </div>
          )}
          
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <div className="absolute left-4 top-4 text-white/60">📧</div>
          </div>
          
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <div className="absolute left-4 top-4 text-white/60">🔒</div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              <span>{isLogin ? '🚀 Launch In' : '✨ Create Account'}</span>
            )}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-white/70">
            {isLogin ? "New to our platform?" : "Already have an account?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-300 font-semibold hover:text-purple-200 transition-colors mt-2 hover:underline"
          >
            {isLogin ? '✨ Create Account' : '🚀 Sign In'}
          </button>
        </div>
        
        {/* Demo credentials hint */}
        <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-white/60 text-sm text-center mb-2">💡 Demo Credentials:</p>
          <div className="text-white/50 text-xs space-y-1">
            <div>Student: student@demo.com / password</div>
            <div>Teacher: teacher@demo.com / password</div>
            <div>Admin: admin@demo.com / password</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;