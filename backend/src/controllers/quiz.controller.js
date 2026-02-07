const { Point } = require('../models/Simple');

const submitQuiz = async (req, res) => {
  try {
    const { answers, timeSpent } = req.body;
    const quizId = req.params.id;
    
    // Mock scoring
    const correctAnswers = ['option_a', 'option_b'];
    let score = 0;
    
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        score++;
      }
    });
    
    const totalQuestions = correctAnswers.length;
    const pointsEarned = score * 10;
    
    // Award points
    if (pointsEarned > 0) {
      await Point.create({
        user_id: req.user.id,
        points_earned: pointsEarned,
        reason: 'Quiz completion'
      });
    }

    res.json({
      score,
      totalQuestions,
      pointsEarned,
      percentage: Math.round((score / totalQuestions) * 100)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createQuiz = async (req, res) => {
  res.status(201).json({ message: 'Quiz created' });
};

const getQuizzes = async (req, res) => {
  const mockQuizzes = [
    {
      id: 1,
      title: 'JavaScript Basics',
      description: 'Test your knowledge of JavaScript fundamentals',
      difficulty: 'easy',
      timeLimit: 15
    },
    {
      id: 2,
      title: 'React Components',
      description: 'Understanding React component lifecycle',
      difficulty: 'medium',
      timeLimit: 20
    }
  ];
  
  res.json(mockQuizzes);
};

const getQuiz = async (req, res) => {
  const mockQuiz = {
    id: req.params.id,
    title: 'JavaScript Basics',
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question_text: 'What is the correct way to declare a variable in JavaScript?',
        option_a: 'var myVar = 5;',
        option_b: 'variable myVar = 5;',
        option_c: 'v myVar = 5;',
        option_d: 'declare myVar = 5;',
        correct_answer: 'option_a'
      },
      {
        id: 2,
        question_text: 'Which method is used to add an element to the end of an array?',
        option_a: 'append()',
        option_b: 'push()',
        option_c: 'add()',
        option_d: 'insert()',
        correct_answer: 'option_b'
      }
    ]
  };
  
  res.json(mockQuiz);
};

const getUserQuizResults = async (req, res) => {
  res.json([]);
};

module.exports = { createQuiz, getQuizzes, getQuiz, submitQuiz, getUserQuizResults };