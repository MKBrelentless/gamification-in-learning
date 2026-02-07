require('dotenv').config();
const { User } = require('./src/models/Simple');
const { sequelize } = require('./src/config/db');
const bcrypt = require('bcryptjs');

async function seedUsers() {
  try {
    await sequelize.sync();
    
    // Create demo users
    const demoUsers = [
      {
        full_name: 'Demo Student',
        email: 'student@demo.com',
        password: 'password',
        role: 'student'
      },
      {
        full_name: 'Demo Teacher',
        email: 'teacher@demo.com',
        password: 'password',
        role: 'teacher'
      },
      {
        full_name: 'Demo Admin',
        email: 'admin@demo.com',
        password: 'password',
        role: 'admin'
      }
    ];

    for (const userData of demoUsers) {
      const existingUser = await User.findOne({ where: { email: userData.email } });

      if (!existingUser) {
        await User.create({
          full_name: userData.full_name,
          email: userData.email,
          password_hash: userData.password,
          role: userData.role
        });
        console.log(`Created user: ${userData.email}`);
      } else {
        const hashedPassword = await bcrypt.hash(userData.password, 12);
        await User.update({
          password_hash: hashedPassword,
          role: userData.role
        }, {
          where: { email: userData.email }
        });
        console.log(`Updated user: ${userData.email}`);
      }
    }
    
    console.log('Demo users seeded successfully!');
    console.log('Login credentials:');
    console.log('Admin: admin@demo.com / password');
    console.log('Teacher: teacher@demo.com / password');
    console.log('Student: student@demo.com / password');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers();