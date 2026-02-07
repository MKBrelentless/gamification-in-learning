from typing import Dict, List
from collections import Counter

class ProfilePredictor:
    def __init__(self):
        self.learning_styles = ['visual', 'auditory', 'kinesthetic', 'reading']
        self.difficulty_levels = ['easy', 'medium', 'hard']
    
    def analyze_learning_pattern(self, user_data: Dict) -> Dict:
        """Analyze user's learning patterns and preferences"""
        quiz_history = user_data.get('quizHistory', [])
        activity_data = user_data.get('activityData', [])
        
        # Analyze performance patterns
        performance_analysis = self._analyze_performance(quiz_history)
        
        # Analyze engagement patterns
        engagement_analysis = self._analyze_engagement(activity_data)
        
        # Predict learning style
        learning_style = self._predict_learning_style(quiz_history, activity_data)
        
        # Determine optimal difficulty
        preferred_difficulty = self._determine_difficulty_preference(quiz_history)
        
        return {
            'learning_style': learning_style,
            'difficulty_preference': preferred_difficulty,
            'engagement_level': engagement_analysis['level'],
            'strengths': performance_analysis['strengths'],
            'areas_for_improvement': performance_analysis['weaknesses'],
            'recommended_pace': engagement_analysis['recommended_pace'],
            'confidence': 0.8
        }
    
    def _analyze_performance(self, quiz_history: List[Dict]) -> Dict:
        """Analyze quiz performance patterns"""
        if not quiz_history:
            return {
                'strengths': ['getting started'],
                'weaknesses': ['needs more practice']
            }
        
        scores = [quiz.get('score', 0) for quiz in quiz_history]
        avg_score = sum(scores) / len(scores) if scores else 0
        
        strengths = []
        weaknesses = []
        
        if avg_score > 0.8:
            strengths.extend(['problem-solving', 'quick learning', 'attention to detail'])
        elif avg_score > 0.6:
            strengths.extend(['consistent effort', 'good understanding'])
            weaknesses.append('needs practice with difficult concepts')
        else:
            strengths.append('persistence')
            weaknesses.extend(['fundamental concepts', 'time management'])
        
        return {
            'strengths': strengths,
            'weaknesses': weaknesses,
            'avg_score': avg_score
        }
    
    def _analyze_engagement(self, activity_data: List[Dict]) -> Dict:
        """Analyze user engagement patterns"""
        if not activity_data:
            return {
                'level': 'low',
                'recommended_pace': 'slow'
            }
        
        total_activities = len(activity_data)
        
        if total_activities > 20:
            level = 'high'
            pace = 'fast'
        elif total_activities > 10:
            level = 'medium'
            pace = 'average'
        else:
            level = 'low'
            pace = 'slow'
        
        return {
            'level': level,
            'recommended_pace': pace
        }
    
    def _predict_learning_style(self, quiz_history: List[Dict], activity_data: List[Dict]) -> str:
        """Predict user's learning style based on behavior"""
        # Simple heuristic based on performance and activity patterns
        if not quiz_history:
            return 'visual'  # Default
        
        avg_score = sum([quiz.get('score', 0) for quiz in quiz_history]) / len(quiz_history)
        total_time = sum([activity.get('duration', 0) for activity in activity_data])
        
        if avg_score > 0.8 and total_time < 1000:  # High score, less time
            return 'visual'
        elif avg_score > 0.6:
            return 'kinesthetic'
        else:
            return 'auditory'
    
    def _determine_difficulty_preference(self, quiz_history: List[Dict]) -> str:
        """Determine user's preferred difficulty level"""
        if not quiz_history:
            return 'easy'
        
        # Analyze performance by difficulty
        difficulty_scores = {}
        for quiz in quiz_history:
            difficulty = quiz.get('difficulty', 'medium')
            score = quiz.get('score', 0)
            
            if difficulty not in difficulty_scores:
                difficulty_scores[difficulty] = []
            difficulty_scores[difficulty].append(score)
        
        # Find difficulty with best average performance
        best_difficulty = 'medium'
        best_avg = 0
        
        for difficulty, scores in difficulty_scores.items():
            avg = sum(scores) / len(scores)
            if avg > best_avg:
                best_avg = avg
                best_difficulty = difficulty
        
        return best_difficulty