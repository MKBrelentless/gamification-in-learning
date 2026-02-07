from typing import Dict, List
import random

class ContentRecommender:
    def __init__(self):
        self.content_database = self._initialize_content()
    
    def _initialize_content(self) -> List[Dict]:
        """Initialize content database"""
        return [
            {
                'id': 1,
                'type': 'quiz',
                'title': 'JavaScript Fundamentals',
                'difficulty': 'easy',
                'topics': ['variables', 'functions', 'loops'],
                'estimated_time': 15
            },
            {
                'id': 2,
                'type': 'quiz',
                'title': 'React Basics',
                'difficulty': 'medium',
                'topics': ['components', 'props', 'state'],
                'estimated_time': 20
            },
            {
                'id': 3,
                'type': 'lesson',
                'title': 'Advanced JavaScript',
                'difficulty': 'hard',
                'topics': ['closures', 'promises', 'async'],
                'estimated_time': 45
            },
            {
                'id': 4,
                'type': 'quiz',
                'title': 'Database Design',
                'difficulty': 'medium',
                'topics': ['sql', 'normalization', 'indexes'],
                'estimated_time': 25
            }
        ]
    
    def recommend(self, user_profile: Dict, num_recommendations: int = 3) -> List[Dict]:
        """Generate content recommendations"""
        level = user_profile.get('level', 1)
        total_points = user_profile.get('totalPoints', 0)
        preferences = user_profile.get('preferences', {})
        
        # Filter content based on user level
        suitable_content = []
        for content in self.content_database:
            if self._is_suitable(content, level, total_points):
                suitable_content.append(content)
        
        # Score and rank content
        scored_content = []
        for content in suitable_content:
            score = self._calculate_score(content, user_profile)
            scored_content.append((content, score))
        
        # Sort by score and return top recommendations
        scored_content.sort(key=lambda x: x[1], reverse=True)
        recommendations = [content for content, score in scored_content[:num_recommendations]]
        
        return recommendations
    
    def _is_suitable(self, content: Dict, level: int, points: int) -> bool:
        """Check if content is suitable for user level"""
        difficulty = content['difficulty']
        
        if level <= 2 and difficulty in ['easy']:
            return True
        elif 2 < level <= 5 and difficulty in ['easy', 'medium']:
            return True
        elif level > 5:
            return True
        
        return False
    
    def _calculate_score(self, content: Dict, user_profile: Dict) -> float:
        """Calculate recommendation score for content"""
        score = 0.5  # Base score
        
        level = user_profile.get('level', 1)
        difficulty = content['difficulty']
        
        # Difficulty matching
        if level <= 2 and difficulty == 'easy':
            score += 0.3
        elif 2 < level <= 5 and difficulty == 'medium':
            score += 0.3
        elif level > 5 and difficulty == 'hard':
            score += 0.3
        
        # Content type preference
        if content['type'] == 'quiz':
            score += 0.1  # Slight preference for interactive content
        
        # Add some randomness
        score += random.uniform(-0.1, 0.1)
        
        return score