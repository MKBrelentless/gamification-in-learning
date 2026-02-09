# Gamification Learning Platform

A comprehensive e-learning platform with gamification features, AI-powered recommendations, and analytics dashboard. Built with modern web technologies and microservices architecture.

## 🏗️ System Architecture

The system consists of three main services deployed on Supabase:

1. **Frontend** - React app deployed on Supabase (Static hosting)
2. **Backend** - Node.js/Express API deployed on Supabase (Edge Functions)
3. **Database** - PostgreSQL hosted on Supabase
4. **AI Service** - FastAPI deployed as Supabase Edge Function

## 🚀 Quick Start

1. Create a Supabase project
2. Set up database and authentication
3. Deploy backend as Edge Functions
4. Deploy frontend to Supabase hosting
5. Configure environment variables
6. Access your deployed application

## 🛠️ Tech Stack

### Frontend
- React 18.2
- React Router DOM
- Axios
- React Query
- Recharts (data visualization)
- Tailwind CSS
- Heroicons

### Backend
- Node.js with Express
- PostgreSQL with Sequelize ORM
- JWT authentication
- bcryptjs for password hashing
- CORS enabled

### AI Service
- FastAPI
- Uvicorn server
- Pydantic for data validation
- Pre-trained ML models for:
  - Performance prediction
  - Learner profiling
  - Content recommendation

## ✨ Features

- **Role-based access control** (Admin, Teacher, Student)
- **Gamification elements** (badges, points, leaderboard)
- **Quiz system** with automated grading
- **Q&A forum** for student-teacher interaction
- **Analytics dashboard** with performance tracking
- **AI-powered recommendations** for personalized learning
- **Progress tracking** with visual charts

## 📋 Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- PostgreSQL database
- npm or yarn package manager
- pip (Python package manager)

## 🗄️ Database Setup

### Option 1: Supabase (Recommended for Deployment)

1. Go to [Supabase](https://supabase.com) and create a new project
2. Get your database credentials from Settings > Database
3. Update `backend/.env` with your Supabase credentials:

```env
DB_NAME=postgres
DB_USER=postgres.your_project_ref
DB_PASSWORD=your_supabase_password
DB_HOST=aws-0-us-west-1.pooler.supabase.com
DB_PORT=6543
PORT=3001
JWT_SECRET=your_jwt_secret_key
```

### Option 2: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database named `gamification`:
```sql
CREATE DATABASE gamification;
```

3. Update `backend/.env` for local setup:
```env
DB_NAME=gamification
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
PORT=3001
JWT_SECRET=your_jwt_secret_key
```

## 🚀 Deployment on Supabase

### 1. Database Setup
Your Supabase project automatically includes a PostgreSQL database.

### 2. Backend Deployment (Edge Functions)
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Initialize Supabase in your project
supabase init

# Deploy Edge Functions
supabase functions deploy
```

### 3. Frontend Deployment
```bash
# Build the React app
cd frontend
npm run build

# Deploy to Supabase hosting
supabase hosting deploy
```

### 4. Environment Variables
Set up environment variables in Supabase Dashboard > Settings > Environment Variables

## 💻 Local Development

### 1. Backend Setup
```bash
cd backend
npm install
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. AI Service Setup
```bash
cd ai-service
pip install -r requirements.txt
```

## 🏃‍♂️ Running the Application

### Option 1: Run Each Service Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Application runs on http://localhost:3000

**Terminal 3 - AI Service:**
```bash
cd ai-service
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Or on Windows:
```bash
cd ai-service
start.bat
```
AI Service runs on http://localhost:8000

### Option 2: Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

## 👥 Seeding Demo Users

After first setup, seed the database with demo users:

```bash
cd backend
npm run seed
```

**Demo Credentials:**
- Admin: `admin@demo.com` / `password`
- Teacher: `teacher@demo.com` / `password`
- Student: `student@demo.com` / `password`

## 🔗 API Endpoints

### Backend (Port 3001)
- `/api/auth` - Authentication (login, register)
- `/api/users` - User management
- `/api/quiz` - Quiz operations
- `/api/gamification` - Badges, points, leaderboard
- `/api/analytics` - Performance analytics
- `/api/recommendations` - Content recommendations
- `/api/content` - Learning content management
- `/api/qa` - Q&A forum
- `/api/health` - Health check

### AI Service (Port 8000)
- `/predict` - Performance prediction
- `/profile` - Learner profile analysis
- `/recommend` - AI-powered recommendations
- `/health` - Health check
- `/docs` - Interactive API documentation (Swagger UI)

## 📁 Project Structure

```
gamification/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API service layer
│   │   └── App.jsx     # Main app component
│   └── package.json
│
├── backend/            # Node.js backend
│   ├── src/
│   │   ├── config/     # Database configuration
│   │   ├── controllers/# Request handlers
│   │   ├── middleware/ # Auth & role middleware
│   │   ├── models/     # Sequelize models
│   │   ├── routes/     # API routes
│   │   ├── services/   # Business logic
│   │   └── utils/      # App setup & server
│   ├── seed-users.js   # Database seeding script
│   └── package.json
│
└── ai-service/         # Python AI service
    ├── app/
    │   ├── inference/  # ML inference modules
    │   ├── models/     # Pre-trained models (.pkl)
    │   ├── routes/     # FastAPI routes
    │   ├── schemas/    # Pydantic schemas
    │   ├── training/   # Model training scripts
    │   └── main.py     # FastAPI app
    ├── requirements.txt
    └── start.bat       # Windows startup script
```

## 👤 User Roles & Permissions

### Student
- View and take quizzes
- Track personal progress
- View badges and leaderboard
- Ask questions in Q&A forum
- Access recommended content

### Teacher
- Create and manage quizzes
- Create learning content/topics
- Answer student questions
- View class analytics
- Monitor student progress

### Admin
- Full system access
- User management
- System-wide analytics
- Content moderation

## 💻 Development Notes

- Backend uses Sequelize ORM with non-destructive sync (no automatic table drops)
- Frontend uses React Router for navigation
- AI service includes pre-trained models in `ai-service/app/models/`
- CORS is configured to allow frontend-backend communication
- JWT tokens are used for authentication

## 🔧 Troubleshooting

**Database connection issues:**
- Verify PostgreSQL is running
- Check credentials in `backend/.env`
- Ensure database `gamification` exists

**Port conflicts:**
- Frontend: Change port in package.json or set PORT environment variable
- Backend: Update PORT in `.env`
- AI Service: Modify port in `start.bat` or uvicorn command

**AI Service errors:**
- Ensure all Python dependencies are installed
- Check that model files exist in `ai-service/app/models/`
- Verify Python version is 3.8+

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcryptjs
- CORS protection
- Input validation and sanitization

## 📊 Analytics & Reporting

- Real-time performance dashboards
- Student progress tracking
- Quiz completion analytics
- Engagement metrics
- AI-powered insights

## 🤖 AI Features

- **Performance Prediction**: Predict student performance based on historical data
- **Learner Profiling**: Analyze learning patterns and preferences
- **Content Recommendation**: Personalized content suggestions
- **Adaptive Learning**: Dynamic difficulty adjustment

## 🎮 Gamification Elements

- **Points System**: Earn points for completing activities
- **Badges**: Achievement-based recognition system
- **Leaderboards**: Competitive rankings
- **Progress Tracking**: Visual progress indicators
- **Streaks**: Consecutive activity rewards

## 🌐 Environment Variables

### Backend (.env)
```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
DB_NAME=postgres
DB_USER=postgres.your_project_ref
DB_PASSWORD=your_supabase_password
DB_HOST=aws-0-us-west-1.pooler.supabase.com
DB_PORT=6543
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

### Frontend (.env)
```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
REACT_APP_API_URL=https://your-project.supabase.co/functions/v1
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📈 Performance Optimization

- React Query for efficient data fetching
- Database indexing for faster queries
- Lazy loading for components
- Image optimization
- API response caching

## 🔄 CI/CD Pipeline

- Automated testing on pull requests
- Code quality checks with ESLint
- Automated deployment to staging/production
- Database migration scripts

## 📚 Additional Resources

- [API Documentation](http://localhost:8000/docs) - Interactive Swagger UI
- [Database Schema](./docs/database-schema.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

Proprietary - All rights reserved
