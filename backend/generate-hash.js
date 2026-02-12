const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'password';
  const hash = await bcrypt.hash(password, 12);
  console.log('Password hash for "password":');
  console.log(hash);
  
  // Test the hash
  const isValid = await bcrypt.compare(password, hash);
  console.log('\nHash validation:', isValid ? '✅ Valid' : '❌ Invalid');
}

generateHash();
