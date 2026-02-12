require('dotenv').config();
const { sequelize } = require('./src/config/db');

async function fixDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✓ Connected to database');

    // Drop existing tables with enum issues
    await sequelize.query('DROP TABLE IF EXISTS student_responses CASCADE;');
    await sequelize.query('DROP TABLE IF EXISTS topic_questions CASCADE;');
    await sequelize.query('DROP TABLE IF EXISTS teacher_topics CASCADE;');
    await sequelize.query('DROP TABLE IF EXISTS student_questions CASCADE;');
    
    // Drop enum types
    await sequelize.query('DROP TYPE IF EXISTS enum_student_questions_status CASCADE;');
    await sequelize.query('DROP TYPE IF EXISTS enum_teacher_topics_difficulty CASCADE;');
    await sequelize.query('DROP TYPE IF EXISTS enum_teacher_topics_status CASCADE;');
    await sequelize.query('DROP TYPE IF EXISTS enum_topic_questions_correct_answer CASCADE;');
    await sequelize.query('DROP TYPE IF EXISTS enum_student_responses_selected_answer CASCADE;');
    
    console.log('✓ Dropped old QA tables and enums');

    // Import models to recreate tables
    require('./src/models/index');
    
    // Sync database
    await sequelize.sync();
    console.log('✓ Database tables recreated successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixDatabase();
