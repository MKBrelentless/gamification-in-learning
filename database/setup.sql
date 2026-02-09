-- Gamification Database Schema
-- Run this in Supabase SQL Editor

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Points table
CREATE TABLE IF NOT EXISTS points (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  points_earned INTEGER NOT NULL,
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Questions table
CREATE TABLE IF NOT EXISTS student_questions (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  topic_request VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'answered')),
  teacher_response TEXT,
  responded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teacher Topics table
CREATE TABLE IF NOT EXISTS teacher_topics (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Topic Questions table
CREATE TABLE IF NOT EXISTS topic_questions (
  id SERIAL PRIMARY KEY,
  topic_id INTEGER NOT NULL REFERENCES teacher_topics(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_answer VARCHAR(20) NOT NULL CHECK (correct_answer IN ('option_a', 'option_b', 'option_c', 'option_d')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Responses table
CREATE TABLE IF NOT EXISTS student_responses (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id INTEGER NOT NULL REFERENCES teacher_topics(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL REFERENCES topic_questions(id) ON DELETE CASCADE,
  selected_answer VARCHAR(20) NOT NULL CHECK (selected_answer IN ('option_a', 'option_b', 'option_c', 'option_d')),
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_points_user_id ON points(user_id);
CREATE INDEX IF NOT EXISTS idx_student_questions_student_id ON student_questions(student_id);
CREATE INDEX IF NOT EXISTS idx_teacher_topics_teacher_id ON teacher_topics(teacher_id);
CREATE INDEX IF NOT EXISTS idx_topic_questions_topic_id ON topic_questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_student_responses_student_id ON student_responses(student_id);
CREATE INDEX IF NOT EXISTS idx_student_responses_topic_id ON student_responses(topic_id);

-- Insert demo users (passwords are hashed for 'password')
INSERT INTO users (full_name, email, password_hash, role) VALUES
  ('Admin User', 'admin@demo.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIiIUWMzUu', 'admin'),
  ('Teacher Demo', 'teacher@demo.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIiIUWMzUu', 'teacher'),
  ('Student Demo', 'student@demo.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIiIUWMzUu', 'student')
ON CONFLICT (email) DO NOTHING;

-- Insert sample points
INSERT INTO points (user_id, points_earned, reason) VALUES
  (3, 100, 'Completed first quiz'),
  (3, 50, 'Daily login bonus')
ON CONFLICT DO NOTHING;

-- Insert sample teacher topic
INSERT INTO teacher_topics (teacher_id, title, description, difficulty, status) VALUES
  (2, 'Introduction to Programming', 'Learn the basics of programming with Python', 'easy', 'published')
ON CONFLICT DO NOTHING;

-- Insert sample questions for the topic
INSERT INTO topic_questions (topic_id, question, option_a, option_b, option_c, option_d, correct_answer) VALUES
  (1, 'What is a variable in programming?', 'A container for storing data', 'A type of loop', 'A function', 'A class', 'option_a'),
  (1, 'Which symbol is used for comments in Python?', '//', '#', '/* */', '--', 'option_b')
ON CONFLICT DO NOTHING;

SELECT 'Database setup complete!' AS status;
