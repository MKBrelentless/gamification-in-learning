from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class RecommendationRequest(BaseModel):
    userId: str
    totalPoints: int
    level: int
    preferences: Optional[Dict[str, Any]] = None

class Recommendation(BaseModel):
    type: str
    title: str
    description: str
    difficulty: str
    reason: str

class RecommendationResponse(BaseModel):
    recommendations: List[Recommendation]