const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Student Questions model
const StudentQuestion = sequelize.define('StudentQuestion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  topic_request: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'answered'),
    defaultValue: 'pending'
  },
  teacher_response: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  responded_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'student_questions',
  timestamps: true
});

// Teacher Topics model
const TeacherTopic = sequelize.define('TeacherTopic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft'
  }
}, {
  tableName: 'teacher_topics',
  timestamps: true
});

// Topic Questions model
const TopicQuestion = sequelize.define('TopicQuestion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  topic_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  option_a: {
    type: DataTypes.STRING,
    allowNull: false
  },
  option_b: {
    type: DataTypes.STRING,
    allowNull: false
  },
  option_c: {
    type: DataTypes.STRING,
    allowNull: false
  },
  option_d: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correct_answer: {
    type: DataTypes.ENUM('option_a', 'option_b', 'option_c', 'option_d'),
    allowNull: false
  }
}, {
  tableName: 'topic_questions',
  timestamps: true
});

// Student Responses model
const StudentResponse = sequelize.define('StudentResponse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  topic_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  selected_answer: {
    type: DataTypes.ENUM('option_a', 'option_b', 'option_c', 'option_d'),
    allowNull: false
  },
  is_correct: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'student_responses',
  timestamps: true
});

module.exports = { StudentQuestion, TeacherTopic, TopicQuestion, StudentResponse };