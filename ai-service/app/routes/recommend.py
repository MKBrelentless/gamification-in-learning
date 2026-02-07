from fastapi import APIRouter
from app.schemas import RecommendationRequest, RecommendationResponse, Recommendation
from app.utils import generate_recommendations
import random

router = APIRouter()

@router.post("/", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    """Get personalized content recommendations"""
    
    # Generate recommendations using helper function
    recommendation_data = generate_recommendations(request.level, request.totalPoints)
    
    # Convert to Pydantic models
    recommendations = [
        Recommendation(**rec) for rec in recommendation_data
    ]
    
    # Shuffle and limit recommendations
    random.shuffle(recommendations)
    return RecommendationResponse(recommendations=recommendations[:4])