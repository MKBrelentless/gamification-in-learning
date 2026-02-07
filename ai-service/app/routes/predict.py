from fastapi import APIRouter
from app.schemas import PredictionRequest, PredictionResponse
from app.utils import calculate_score_prediction

router = APIRouter()

@router.post("/", response_model=PredictionResponse)
async def predict_performance(request: PredictionRequest):
    """Predict user performance on a quiz"""
    
    predicted_score, confidence = calculate_score_prediction(request.userStats)
    
    suggestions = []
    if predicted_score < 0.6:
        suggestions.extend([
            "Review the lesson materials before taking the quiz",
            "Practice with similar questions"
        ])
    elif predicted_score < 0.8:
        suggestions.append("You're doing well! Focus on difficult topics")
    else:
        suggestions.append("Great job! You're ready for this quiz")
    
    return PredictionResponse(
        predicted_score=predicted_score,
        confidence=confidence,
        suggestions=suggestions
    )