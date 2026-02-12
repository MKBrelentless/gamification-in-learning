require('dotenv').config();
const { sequelize } = require('./src/config/db');
const models = require('./src/models/index');

async function verifyDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection successful');

    // Force sync all models
    await sequelize.sync({ alter: true });
    console.log('✓ All models synchronized');

    // List all tables
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('\n📋 Database Tables:');
    results.forEach(row => console.log(`  - ${row.table_name}`));

    console.log('\n✓ Database verification complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database verification failed:', error.message);
    process.exit(1);
  }
}

verifyDatabase();
