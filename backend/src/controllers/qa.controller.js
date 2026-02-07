const { StudentQuestion, TeacherTopic, TopicQuestion, StudentResponse } = require('../models/QA');
const { User } = require('../models/Simple');

// Student asks question
const askQuestion = async (req, res) => {
  try {
    const { question, topic_request } = req.body;
    const student_id = req.user.id;

    const newQuestion = await StudentQuestion.create({
      student_id,
      question,
      topic_request
    });

    res.status(201).json({
      message: 'Question submitted successfully! Please wait for teacher response.',
      question: newQuestion
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting question', error: error.message });
  }
};

// Get student's questions
const getMyQuestions = async (req, res) => {
  try {
    const student_id = req.user.id;
    
    const questions = await StudentQuestion.findAll({
      where: { student_id },
      order: [['createdAt', 'DESC']]
    });

    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
};

// Teacher gets all pending questions
const getPendingQuestions = async (req, res) => {
  try {
    const questions = await StudentQuestion.findAll({
      where: { status: 'pending' },
      order: [['createdAt', 'ASC']]
    });

    // Get student info for each question
    const questionsWithStudents = await Promise.all(
      questions.map(async (q) => {
        const student = await User.findByPk(q.student_id, {
          attributes: ['full_name', 'email']
        });
        return { ...q.toJSON(), student };
      })
    );

    res.json({ questions: questionsWithStudents });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
};

// Teacher responds to question
const respondToQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { response } = req.body;
    const teacher_id = req.user.id;

    await StudentQuestion.update({
      teacher_response: response,
      responded_by: teacher_id,
      status: 'answered'
    }, {
      where: { id: questionId }
    });

    res.json({ message: 'Response sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending response', error: error.message });
  }
};

// Teacher creates topic
const createTopic = async (req, res) => {
  try {
    const { title, description, difficulty, questions } = req.body;
    const teacher_id = req.user.id;

    const topic = await TeacherTopic.create({
      teacher_id,
      title,
      description,
      difficulty,
      status: 'published'
    });

    // Add questions to topic
    if (questions && questions.length > 0) {
      const topicQuestions = questions.map(q => ({
        topic_id: topic.id,
        question: q.question,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        correct_answer: q.correct_answer
      }));

      await TopicQuestion.bulkCreate(topicQuestions);
    }

    res.status(201).json({ message: 'Topic created successfully!', topic });
  } catch (error) {
    res.status(500).json({ message: 'Error creating topic', error: error.message });
  }
};

// Get all published topics for students
const getTopics = async (req, res) => {
  try {
    const topics = await TeacherTopic.findAll({
      where: { status: 'published' },
      order: [['createdAt', 'DESC']]
    });

    // Get teacher info and questions for each topic
    const topicsWithDetails = await Promise.all(
      topics.map(async (topic) => {
        const teacher = await User.findByPk(topic.teacher_id, {
          attributes: ['full_name']
        });
        const questions = await TopicQuestion.findAll({
          where: { topic_id: topic.id }
        });
        return { ...topic.toJSON(), teacher, questions };
      })
    );

    res.json({ topics: topicsWithDetails });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topics', error: error.message });
  }
};

// Student submits topic responses
const submitTopicResponse = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { responses } = req.body;
    const student_id = req.user.id;

    const questions = await TopicQuestion.findAll({ where: { topic_id: topicId } });
    
    const responseData = responses.map((response, index) => ({
      student_id,
      topic_id: topicId,
      question_id: questions[index].id,
      selected_answer: response,
      is_correct: response === questions[index].correct_answer
    }));

    await StudentResponse.bulkCreate(responseData);

    const correctCount = responseData.filter(r => r.is_correct).length;
    const score = Math.round((correctCount / questions.length) * 100);

    res.json({ 
      message: 'Responses submitted successfully!',
      score,
      correct: correctCount,
      total: questions.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting responses', error: error.message });
  }
};

module.exports = {
  askQuestion,
  getMyQuestions,
  getPendingQuestions,
  respondToQuestion,
  createTopic,
  getTopics,
  submitTopicResponse
};