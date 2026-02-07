from pydantic import BaseModel
from typing import List, Dict, Any

class ProfileRequest(BaseModel):
    userId: str
    quizHistory: List[Dict[str, Any]]
    activityData: List[Dict[str, Any]]

class LearnerProfile(BaseModel):
    learning_style: str
    difficulty_preference: str
    engagement_level: str
    strengths: List[str]
    areas_for_improvement: List[str]
    recommended_pace: str