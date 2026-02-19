const { generateQuizQuestions } = require('../services/quiz-generator.service');
const { TopicQuestion } = require('../models/QA');

// Auto-generate quiz questions
const autoGenerateQuiz = async (req, res) => {
  try {
    const { subject, count, difficulty, topicId } = req.body;
    
    const questions = generateQuizQuestions(
      subject || 'mathematics',
      count || 10,
      difficulty || 'medium'
    );

    // If topicId provided, save to database
    if (topicId) {
      const dbQuestions = questions.map(q => ({
        topic_id: topicId,
        ...q
      }));
      await TopicQuestion.bulkCreate(dbQuestions);
    }

    res.json({
      message: `Generated ${questions.length} questions successfully!`,
      questions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating quiz', error: error.message });
  }
};

// Get available subjects
const getAvailableSubjects = (req, res) => {
  res.json({
    subjects: [
      { id: 'mathematics', name: 'Mathematics', topics: ['arithmetic', 'algebra', 'geometry', 'calculus'] },
      { id: 'science', name: 'Science', topics: ['physics', 'chemistry', 'biology'] },
      { id: 'programming', name: 'Programming', topics: ['javascript', 'python', 'algorithms'] }
    ]
  });
};

module.exports = {
  autoGenerateQuiz,
  getAvailableSubjects
};
