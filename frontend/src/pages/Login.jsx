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
    <div className="min-h-screen flex">
      {/* Left Side - Cover Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/img.png')" }}
        >
          <div className="absolute inset-0"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-start pt-32 items-center text-white p-12">
          <div className="backdrop-blur-md bg-blue-600/30 rounded-2xl p-6 max-w-xl">
            <h1 className="text-4xl font-bold mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>Gamification Learning Platform</h1>
            <p className="text-lg text-center mb-6" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.8)'}}>
              Transform your learning experience with AI-powered recommendations and engaging gamification
            </p>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-3xl mb-1">🎯</div>
                <div>Interactive Quizzes</div>
              </div>
              <div>
                <div className="text-3xl mb-1">🏆</div>
                <div>Earn Badges</div>
              </div>
              <div>
                <div className="text-3xl mb-1">📊</div>
                <div>Track Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-blue-900/95 backdrop-blur-sm p-8">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-blue-100">
                {isLogin ? 'Sign in to continue your learning journey' : 'Start your learning adventure today'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white/90 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-900"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white/90 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-900"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/90 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-900"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>
            
            <div className="text-center mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-200 hover:text-white font-medium"
              >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>
            </div>
            
            {/* Demo credentials */}
            <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
              <p className="text-sm font-medium text-white mb-2">Demo Credentials:</p>
              <div className="text-xs text-blue-100 space-y-1">
                <div>👨🎓 Student: student@demo.com / password</div>
                <div>👨🏫 Teacher: teacher@demo.com / password</div>
                <div>👨💼 Admin: admin@demo.com / password</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
