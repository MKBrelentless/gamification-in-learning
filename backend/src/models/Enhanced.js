const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Story-driven Missions
const Mission = sequelize.define('Mission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  story: { type: DataTypes.TEXT, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  difficulty: { type: DataTypes.ENUM('easy', 'medium', 'hard', 'boss'), defaultValue: 'medium' },
  points_reward: { type: DataTypes.INTEGER, defaultValue: 100 },
  badge_reward: { type: DataTypes.STRING, allowNull: true },
  time_limit: { type: DataTypes.INTEGER, allowNull: true }, // in minutes
  status: { type: DataTypes.ENUM('active', 'completed', 'locked'), defaultValue: 'locked' }
}, { tableName: 'missions', timestamps: true });

// Student Mission Progress
const StudentMission = sequelize.define('StudentMission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  student_id: { type: DataTypes.INTEGER, allowNull: false },
  mission_id: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('in_progress', 'completed', 'failed'), defaultValue: 'in_progress' },
  score: { type: DataTypes.INTEGER, defaultValue: 0 },
  attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
  started_at: { type: DataTypes.DATE, allowNull: true },
  completed_at: { type: DataTypes.DATE, allowNull: true }
}, { tableName: 'student_missions', timestamps: true });

// Daily Quests
const DailyQuest = sequelize.define('DailyQuest', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  quest_type: { type: DataTypes.ENUM('quiz', 'topic', 'question', 'streak'), allowNull: false },
  target_count: { type: DataTypes.INTEGER, defaultValue: 1 },
  points_reward: { type: DataTypes.INTEGER, defaultValue: 50 },
  date: { type: DataTypes.DATEONLY, allowNull: false }
}, { tableName: 'daily_quests', timestamps: true });

// Student Quest Progress
const StudentQuest = sequelize.define('StudentQuest', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  student_id: { type: DataTypes.INTEGER, allowNull: false },
  quest_id: { type: DataTypes.INTEGER, allowNull: false },
  progress: { type: DataTypes.INTEGER, defaultValue: 0 },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  completed_at: { type: DataTypes.DATE, allowNull: true }
}, { tableName: 'student_quests', timestamps: true });

// Streaks
const Streak = sequelize.define('Streak', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  student_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  current_streak: { type: DataTypes.INTEGER, defaultValue: 0 },
  longest_streak: { type: DataTypes.INTEGER, defaultValue: 0 },
  last_activity_date: { type: DataTypes.DATEONLY, allowNull: true }
}, { tableName: 'streaks', timestamps: true });

// Team Challenges
const TeamChallenge = sequelize.define('TeamChallenge', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  challenge_type: { type: DataTypes.ENUM('quiz', 'collaborative', 'competition'), allowNull: false },
  target_score: { type: DataTypes.INTEGER, allowNull: false },
  start_date: { type: DataTypes.DATE, allowNull: false },
  end_date: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.ENUM('upcoming', 'active', 'completed'), defaultValue: 'upcoming' }
}, { tableName: 'team_challenges', timestamps: true });

// Team Members
const TeamMember = sequelize.define('TeamMember', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  challenge_id: { type: DataTypes.INTEGER, allowNull: false },
  student_id: { type: DataTypes.INTEGER, allowNull: false },
  contribution_score: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'team_members', timestamps: true });

// Peer Rewards
const PeerReward = sequelize.define('PeerReward', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  from_student_id: { type: DataTypes.INTEGER, allowNull: false },
  to_student_id: { type: DataTypes.INTEGER, allowNull: false },
  reward_type: { type: DataTypes.ENUM('helpful', 'creative', 'supportive', 'leader'), allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: true },
  points: { type: DataTypes.INTEGER, defaultValue: 10 }
}, { tableName: 'peer_rewards', timestamps: true });

module.exports = {
  Mission,
  StudentMission,
  DailyQuest,
  StudentQuest,
  Streak,
  TeamChallenge,
  TeamMember,
  PeerReward
};
