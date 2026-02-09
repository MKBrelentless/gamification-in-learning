// Test login endpoint
const axios = require('axios');

const testLogin = async () => {
  try {
    const response = await axios.post('https://gamification-in-learning-5.onrender.com/api/auth/login', {
      email: 'student@demo.com',
      password: 'password'
    });
    console.log('✅ Login successful!');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('❌ Login failed!');
    console.error('Status:', error.response?.status);
    console.error('Error:', error.response?.data);
  }
};

testLogin();
