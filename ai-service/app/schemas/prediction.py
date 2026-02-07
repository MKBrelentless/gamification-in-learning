from pydantic import BaseModel
from typing import List, Dict, Any

class PredictionRequest(BaseModel):
    userId: str
    quizId: str
    userStats: Dict[str, Any]

class PredictionResponse(BaseModel):
    predicted_score: float
    confidence: float
    suggestions: List[str]