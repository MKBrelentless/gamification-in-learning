require('dotenv').config();
const { sequelize } = require('./src/config/db');
const { Mission, DailyQuest } = require('./src/models/Enhanced');

async function seedEnhancedGamification() {
  try {
    await sequelize.authenticate();
    console.log('✓ Connected to database');

    // Seed Missions with Stories
    const missions = [
      {
        title: 'The Chemistry Crisis',
        story: 'A mysterious chemical reaction has gone wrong in the lab! You are the only scientist who can save the day by mastering chemical equations.',
        description: 'Complete 5 chemistry quizzes to stabilize the reaction',
        difficulty: 'easy',
        points_reward: 150,
        badge_reward: 'Chemistry Hero',
        status: 'active'
      },
      {
        title: 'Math Monster Invasion',
        story: 'Math Monsters have invaded the kingdom! Only by solving complex equations can you defeat them and restore peace.',
        description: 'Solve 10 advanced math problems to defeat the monsters',
        difficulty: 'medium',
        points_reward: 250,
        badge_reward: 'Monster Slayer',
        time_limit: 30,
        status: 'active'
      },
      {
        title: 'The Final Boss: Physics Phenomenon',
        story: 'The ultimate challenge awaits! A physics phenomenon threatens the universe. Master all physics concepts to save existence itself.',
        description: 'Complete the comprehensive physics test with 90% accuracy',
        difficulty: 'boss',
        points_reward: 500,
        badge_reward: 'Physics Master',
        time_limit: 60,
        status: 'active'
      },
      {
        title: 'Biology Quest: Save the Ecosystem',
        story: 'The ecosystem is collapsing! As a biologist, you must understand cellular processes to restore balance to nature.',
        description: 'Complete biology topics and answer 15 questions correctly',
        difficulty: 'medium',
        points_reward: 200,
        badge_reward: 'Eco Warrior',
        status: 'active'
      }
    ];

    await Mission.bulkCreate(missions);
    console.log('✓ Missions seeded');

    // Seed Daily Quests
    const today = new Date().toISOString().split('T')[0];
    const quests = [
      {
        title: 'Morning Brain Boost',
        description: 'Complete 3 quizzes to start your day strong!',
        quest_type: 'quiz',
        target_count: 3,
        points_reward: 50,
        date: today
      },
      {
        title: 'Knowledge Seeker',
        description: 'Explore 2 new topics today',
        quest_type: 'topic',
        target_count: 2,
        points_reward: 40,
        date: today
      },
      {
        title: 'Curious Mind',
        description: 'Ask 1 question in the Q&A forum',
        quest_type: 'question',
        target_count: 1,
        points_reward: 30,
        date: today
      },
      {
        title: 'Streak Master',
        description: 'Maintain your learning streak!',
        quest_type: 'streak',
        target_count: 1,
        points_reward: 25,
        date: today
      }
    ];

    await DailyQuest.bulkCreate(quests);
    console.log('✓ Daily quests seeded');

    console.log('\n🎮 Enhanced gamification features ready!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedEnhancedGamification();
