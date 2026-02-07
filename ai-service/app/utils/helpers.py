import random
from typing import List, Dict, Any

def calculate_score_prediction(user_stats: Dict[str, Any]) -> tuple[float, float]:
    """Calculate predicted score and confidence based on user stats"""
    total_points = user_stats.get('totalPoints', 0)
    level = user_stats.get('level', 1)
    
    # Basic prediction logic
    base_score = min(0.9, (total_points / 1000) + (level * 0.1))
    predicted_score = max(0.3, base_score + random.uniform(-0.1, 0.1))
    confidence = 0.8 if total_points > 100 else 0.6
    
    return round(predicted_score, 2), round(confidence, 2)

def analyze_learning_pattern(quiz_history: List[Dict[str, Any]]) -> Dict[str, str]:
    """Analyze learning patterns from quiz history"""
    total_quizzes = len(quiz_history)
    avg_score = sum(quiz.get('score', 0) for quiz in quiz_history) / max(total_quizzes, 1)
    
    # Determine learning characteristics
    if avg_score > 0.8:
        learning_style = "visual"
        difficulty_preference = "challenging"
    elif avg_score > 0.6:
        learning_style = "kinesthetic"
        difficulty_preference = "moderate"
    else:
        learning_style = "auditory"
        difficulty_preference = "easy"
    
    # Engagement level
    if total_quizzes > 10:
        engagement_level = "high"
        recommended_pace = "fast"
    elif total_quizzes > 5:
        engagement_level = "medium"
        recommended_pace = "average"
    else:
        engagement_level = "low"
        recommended_pace = "slow"
    
    return {
        "learning_style": learning_style,
        "difficulty_preference": difficulty_preference,
        "engagement_level": engagement_level,
        "recommended_pace": recommended_pace
    }

def generate_recommendations(level: int, total_points: int) -> List[Dict[str, str]]:
    """Generate content recommendations based on user level and points"""
    recommendations = []
    
    # Level-based recommendations
    if level <= 2:
        recommendations.extend([
            {
                "type": "quiz",
                "title": "JavaScript Basics Quiz",
                "description": "Test your understanding of variables and functions",
                "difficulty": "easy",
                "reason": "Perfect for your current level"
            },
            {
                "type": "lesson",
                "title": "Introduction to Programming",
                "description": "Learn the fundamentals of programming",
                "difficulty": "beginner",
                "reason": "Build a strong foundation"
            }
        ])
    elif level <= 5:
        recommendations.extend([
            {
                "type": "quiz",
                "title": "React Components Quiz",
                "description": "Advanced component patterns and hooks",
                "difficulty": "medium",
                "reason": "Challenge yourself with intermediate topics"
            },
            {
                "type": "lesson",
                "title": "State Management",
                "description": "Learn about Redux and Context API",
                "difficulty": "intermediate",
                "reason": "Next step in your learning journey"
            }
        ])
    else:
        recommendations.extend([
            {
                "type": "quiz",
                "title": "System Design Quiz",
                "description": "Architecture and scalability concepts",
                "difficulty": "hard",
                "reason": "Advanced topics for experienced learners"
            },
            {
                "type": "lesson",
                "title": "Microservices Architecture",
                "description": "Building scalable distributed systems",
                "difficulty": "advanced",
                "reason": "Master advanced concepts"
            }
        ])
    
    # Points-based recommendations
    if total_points < 100:
        recommendations.append({
            "type": "quiz",
            "title": "Quick Practice Quiz",
            "description": "Earn points with this short quiz",
            "difficulty": "easy",
            "reason": "Boost your points quickly"
        })
    
    return recommendations