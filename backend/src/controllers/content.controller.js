const createCourse = async (req, res) => {
  try {
    res.status(201).json({ message: 'Course created', id: 1 });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const mockCourses = [
      { id: 1, title: 'JavaScript Fundamentals', description: 'Learn JS basics' },
      { id: 2, title: 'React Development', description: 'Build React apps' }
    ];
    res.json(mockCourses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const mockCourse = {
      id: req.params.id,
      title: 'JavaScript Fundamentals',
      description: 'Learn JS basics'
    };
    res.json(mockCourse);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createLesson = async (req, res) => {
  try {
    res.status(201).json({ message: 'Lesson created', id: 1 });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getLesson = async (req, res) => {
  try {
    const mockLesson = {
      id: req.params.id,
      title: 'Introduction to Variables',
      content: 'Variables are containers for data'
    };
    res.json(mockLesson);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createCourse, getCourses, getCourse, createLesson, getLesson };