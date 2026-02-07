const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'gamification',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'relentless',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected successfully');
    
    // Import all models to ensure they're registered
    require('../models/index');
    
    // Sync all models without dropping tables
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };