// Quiz question templates by subject
const quizTemplates = {
  mathematics: [
    { type: 'arithmetic', difficulty: 'easy' },
    { type: 'algebra', difficulty: 'medium' },
    { type: 'geometry', difficulty: 'medium' },
    { type: 'calculus', difficulty: 'hard' }
  ],
  science: [
    { type: 'physics', difficulty: 'medium' },
    { type: 'chemistry', difficulty: 'medium' },
    { type: 'biology', difficulty: 'easy' }
  ],
  programming: [
    { type: 'javascript', difficulty: 'easy' },
    { type: 'python', difficulty: 'medium' },
    { type: 'algorithms', difficulty: 'hard' }
  ]
};

// Question generators
const generators = {
  arithmetic: () => {
    const a = Math.floor(Math.random() * 50) + 1;
    const b = Math.floor(Math.random() * 50) + 1;
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    const answer = eval(`${a}${op}${b}`);
    
    return {
      question: `What is ${a} ${op} ${b}?`,
      options: generateOptions(answer, 'number'),
      correct_answer: answer
    };
  },

  algebra: () => {
    const x = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const c = x + b;
    
    return {
      question: `Solve for x: x + ${b} = ${c}`,
      options: generateOptions(x, 'number'),
      correct_answer: x
    };
  },

  physics: () => {
    const questions = [
      {
        question: 'What is the SI unit of force?',
        options: ['Newton', 'Joule', 'Watt', 'Pascal'],
        correct_answer: 'Newton'
      },
      {
        question: 'What is the speed of light in vacuum?',
        options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10⁷ m/s', '3 × 10⁹ m/s'],
        correct_answer: '3 × 10⁸ m/s'
      },
      {
        question: 'What is Newton\'s first law of motion?',
        options: [
          'An object at rest stays at rest unless acted upon by force',
          'F = ma',
          'Every action has equal and opposite reaction',
          'Energy cannot be created or destroyed'
        ],
        correct_answer: 'An object at rest stays at rest unless acted upon by force'
      }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  },

  chemistry: () => {
    const questions = [
      {
        question: 'What is the chemical symbol for Gold?',
        options: ['Au', 'Ag', 'Go', 'Gd'],
        correct_answer: 'Au'
      },
      {
        question: 'What is the pH of pure water?',
        options: ['7', '0', '14', '1'],
        correct_answer: '7'
      },
      {
        question: 'How many electrons does Carbon have?',
        options: ['6', '4', '8', '12'],
        correct_answer: '6'
      }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  },

  biology: () => {
    const questions = [
      {
        question: 'What is the powerhouse of the cell?',
        options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Chloroplast'],
        correct_answer: 'Mitochondria'
      },
      {
        question: 'What is the process by which plants make food?',
        options: ['Photosynthesis', 'Respiration', 'Digestion', 'Fermentation'],
        correct_answer: 'Photosynthesis'
      },
      {
        question: 'How many chromosomes do humans have?',
        options: ['46', '23', '48', '44'],
        correct_answer: '46'
      }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  },

  javascript: () => {
    const questions = [
      {
        question: 'What keyword is used to declare a constant in JavaScript?',
        options: ['const', 'let', 'var', 'constant'],
        correct_answer: 'const'
      },
      {
        question: 'Which method adds an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correct_answer: 'push()'
      },
      {
        question: 'What does JSON stand for?',
        options: ['JavaScript Object Notation', 'Java Standard Object Notation', 'JavaScript Online Notation', 'Java Syntax Object Notation'],
        correct_answer: 'JavaScript Object Notation'
      }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  },

  python: () => {
    const questions = [
      {
        question: 'Which keyword is used to define a function in Python?',
        options: ['def', 'function', 'func', 'define'],
        correct_answer: 'def'
      },
      {
        question: 'What is the correct file extension for Python files?',
        options: ['.py', '.python', '.pt', '.pyt'],
        correct_answer: '.py'
      },
      {
        question: 'Which data type is mutable in Python?',
        options: ['List', 'Tuple', 'String', 'Integer'],
        correct_answer: 'List'
      }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  }
};

// Generate similar but incorrect options
function generateOptions(correctAnswer, type) {
  const options = [correctAnswer];
  
  if (type === 'number') {
    const num = Number(correctAnswer);
    options.push(num + Math.floor(Math.random() * 5) + 1);
    options.push(num - Math.floor(Math.random() * 5) - 1);
    options.push(num + Math.floor(Math.random() * 10) + 5);
  }
  
  // Shuffle options
  return options.sort(() => Math.random() - 0.5).map((opt, idx) => ({
    [`option_${String.fromCharCode(97 + idx)}`]: String(opt),
    correct: opt === correctAnswer
  }));
}

// Generate quiz questions
const generateQuizQuestions = (subject, count = 10, difficulty = 'medium') => {
  const questions = [];
  const templates = quizTemplates[subject] || quizTemplates.mathematics;
  
  for (let i = 0; i < count; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const generator = generators[template.type];
    
    if (generator) {
      const q = generator();
      const opts = Array.isArray(q.options) ? q.options : q.options;
      
      questions.push({
        question: q.question,
        option_a: opts[0],
        option_b: opts[1],
        option_c: opts[2],
        option_d: opts[3],
        correct_answer: `option_${String.fromCharCode(97 + opts.indexOf(q.correct_answer))}`,
        difficulty: template.difficulty
      });
    }
  }
  
  return questions;
};

module.exports = { generateQuizQuestions };
