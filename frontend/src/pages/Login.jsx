import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStep, setResetStep] = useState(1);
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.forgotPassword({ email: resetEmail });
      setResetToken(response.data.resetToken);
      setResetStep(2);
      alert('Reset token generated! Copy it and proceed to reset.');
    } catch (error) {
      alert(error.response?.data?.message || 'Error sending reset request');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.resetPassword({ token: resetToken, newPassword });
      alert('Password reset successful! Please login.');
      setShowForgotPassword(false);
      setResetStep(1);
      setResetEmail('');
      setResetToken('');
      setNewPassword('');
    } catch (error) {
      alert(error.response?.data?.message || 'Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundImage: "url('/images/pic.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {!showForm ? (
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold text-white mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>Gamification Learning Platform</h1>
          <p className="text-2xl text-white mb-8" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.8)'}}>Transform your learning experience</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-full hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Get Started 🚀
          </button>
        </div>
      ) : showForgotPassword ? (
        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-2" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>Gamification</h1>
            <p className="text-white/80" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.8)'}}>Learning Platform</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🔐</div>
              <h2 className="text-2xl font-bold text-white mb-1">Reset Password</h2>
              <p className="text-blue-100 text-sm">Step {resetStep} of 2</p>
            </div>
            
            {resetStep === 1 ? (
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Get Reset Token'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Reset Token</label>
                  <input
                    type="text"
                    placeholder="Paste your token here"
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}
            
            <button
              onClick={() => { setShowForgotPassword(false); setResetStep(1); }}
              className="w-full mt-4 text-blue-200 hover:text-white text-sm"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-2" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>Gamification</h1>
            <p className="text-white/80" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.8)'}}>Learning Platform</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🚀</div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-blue-100 text-sm">
                {isLogin ? 'Sign in to continue learning' : 'Start your learning journey'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-white mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 transition-all"
              >
                {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>
            
            <div className="text-center mt-4">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-300 hover:text-white font-medium text-sm"
              >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>
              {isLogin && (
                <button
                  onClick={() => setShowForgotPassword(true)}
                  className="block w-full mt-2 text-blue-300 hover:text-white font-medium text-sm"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            
            <div className="mt-6 p-3 bg-white/10 rounded-lg border border-white/20">
              <p className="text-xs font-medium text-white mb-2">Demo Credentials:</p>
              <div className="text-xs text-blue-200 space-y-1">
                <div>👨🎓 Student: student@demo.com / password</div>
                <div>👨🏫 Teacher: teacher@demo.com / password</div>
                <div>👨💼 Admin: admin@demo.com / password</div>
              </div>
            </div>
            
            <button
              onClick={() => setShowForm(false)}
              className="w-full mt-4 text-blue-200 hover:text-white text-sm"
            >
              ← Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
