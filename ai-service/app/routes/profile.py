from fastapi import APIRouter
from app.schemas import ProfileRequest, LearnerProfile
from app.utils import analyze_learning_pattern

router = APIRouter()

@router.post("/analyze", response_model=LearnerProfile)
async def analyze_learner_profile(request: ProfileRequest):
    """Analyze learner behavior and create profile"""
    
    # Analyze learning patterns
    patterns = analyze_learning_pattern(request.quizHistory)
    
    # Calculate average score for strengths/improvements
    total_quizzes = len(request.quizHistory)
    avg_score = sum(quiz.get('score', 0) for quiz in request.quizHistory) / max(total_quizzes, 1)
    
    # Determine strengths and areas for improvement
    strengths = ["problem-solving", "logical thinking"] if avg_score > 0.7 else ["persistence", "effort"]
    areas_for_improvement = ["time management"] if avg_score < 0.6 else ["advanced concepts"]
    
    return LearnerProfile(
        learning_style=patterns["learning_style"],
        difficulty_preference=patterns["difficulty_preference"],
        engagement_level=patterns["engagement_level"],
        strengths=strengths,
        areas_for_improvement=areas_for_improvement,
        recommended_pace=patterns["recommended_pace"]
    )