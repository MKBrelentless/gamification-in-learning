const { Mission, StudentMission, DailyQuest, StudentQuest, Streak, TeamChallenge, TeamMember, PeerReward } = require('../models/Enhanced');
const { User, Point } = require('../models/Simple');

// Get active missions with story
const getMissions = async (req, res) => {
  try {
    const student_id = req.user.id;
    const missions = await Mission.findAll({ where: { status: 'active' } });
    
    const missionsWithProgress = await Promise.all(
      missions.map(async (mission) => {
        const progress = await StudentMission.findOne({
          where: { student_id, mission_id: mission.id }
        });
        return { ...mission.toJSON(), progress };
      })
    );

    res.json({ missions: missionsWithProgress });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching missions', error: error.message });
  }
};

// Start a mission
const startMission = async (req, res) => {
  try {
    const { missionId } = req.params;
    const student_id = req.user.id;

    const studentMission = await StudentMission.create({
      student_id,
      mission_id: missionId,
      status: 'in_progress',
      started_at: new Date()
    });

    res.json({ message: 'Mission started! Good luck, hero!', mission: studentMission });
  } catch (error) {
    res.status(500).json({ message: 'Error starting mission', error: error.message });
  }
};

// Complete a mission
const completeMission = async (req, res) => {
  try {
    const { missionId } = req.params;
    const { score } = req.body;
    const student_id = req.user.id;

    const mission = await Mission.findByPk(missionId);
    await StudentMission.update(
      { status: 'completed', score, completed_at: new Date() },
      { where: { student_id, mission_id: missionId } }
    );

    // Award points
    await Point.create({
      user_id: student_id,
      points_earned: mission.points_reward,
      reason: `Completed mission: ${mission.title}`
    });

    // Update streak
    await updateStreak(student_id);

    res.json({ 
      message: '🎉 Mission Complete! You are a true hero!',
      points_earned: mission.points_reward
    });
  } catch (error) {
    res.status(500).json({ message: 'Error completing mission', error: error.message });
  }
};

// Get daily quests
const getDailyQuests = async (req, res) => {
  try {
    const student_id = req.user.id;
    const today = new Date().toISOString().split('T')[0];
    
    const quests = await DailyQuest.findAll({ where: { date: today } });
    
    const questsWithProgress = await Promise.all(
      quests.map(async (quest) => {
        const progress = await StudentQuest.findOne({
          where: { student_id, quest_id: quest.id }
        }) || { progress: 0, completed: false };
        return { ...quest.toJSON(), ...progress.toJSON() };
      })
    );

    res.json({ quests: questsWithProgress });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quests', error: error.message });
  }
};

// Update quest progress
const updateQuestProgress = async (req, res) => {
  try {
    const { questId } = req.params;
    const student_id = req.user.id;

    const quest = await DailyQuest.findByPk(questId);
    let studentQuest = await StudentQuest.findOne({
      where: { student_id, quest_id: questId }
    });

    if (!studentQuest) {
      studentQuest = await StudentQuest.create({
        student_id,
        quest_id: questId,
        progress: 1
      });
    } else {
      studentQuest.progress += 1;
      await studentQuest.save();
    }

    // Check if quest completed
    if (studentQuest.progress >= quest.target_count && !studentQuest.completed) {
      studentQuest.completed = true;
      studentQuest.completed_at = new Date();
      await studentQuest.save();

      await Point.create({
        user_id: student_id,
        points_earned: quest.points_reward,
        reason: `Completed daily quest: ${quest.title}`
      });

      return res.json({ 
        message: '✨ Daily Quest Complete!',
        points_earned: quest.points_reward,
        completed: true
      });
    }

    res.json({ progress: studentQuest.progress, target: quest.target_count });
  } catch (error) {
    res.status(500).json({ message: 'Error updating quest', error: error.message });
  }
};

// Get streak
const getStreak = async (req, res) => {
  try {
    const student_id = req.user.id;
    let streak = await Streak.findOne({ where: { student_id } });
    
    if (!streak) {
      streak = await Streak.create({ student_id });
    }

    res.json({ streak });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching streak', error: error.message });
  }
};

// Update streak (helper function)
const updateStreak = async (student_id) => {
  const today = new Date().toISOString().split('T')[0];
  let streak = await Streak.findOne({ where: { student_id } });

  if (!streak) {
    streak = await Streak.create({
      student_id,
      current_streak: 1,
      longest_streak: 1,
      last_activity_date: today
    });
  } else {
    const lastDate = new Date(streak.last_activity_date);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak.current_streak += 1;
      if (streak.current_streak > streak.longest_streak) {
        streak.longest_streak = streak.current_streak;
      }
    } else if (diffDays > 1) {
      streak.current_streak = 1;
    }

    streak.last_activity_date = today;
    await streak.save();
  }

  return streak;
};

// Get team challenges
const getTeamChallenges = async (req, res) => {
  try {
    const challenges = await TeamChallenge.findAll({
      where: { status: 'active' }
    });

    res.json({ challenges });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching challenges', error: error.message });
  }
};

// Join team challenge
const joinTeamChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const student_id = req.user.id;

    await TeamMember.create({
      challenge_id: challengeId,
      student_id
    });

    res.json({ message: 'Joined team challenge! Let\'s work together!' });
  } catch (error) {
    res.status(500).json({ message: 'Error joining challenge', error: error.message });
  }
};

// Send peer reward
const sendPeerReward = async (req, res) => {
  try {
    const { toStudentId, rewardType, message } = req.body;
    const from_student_id = req.user.id;

    await PeerReward.create({
      from_student_id,
      to_student_id: toStudentId,
      reward_type: rewardType,
      message,
      points: 10
    });

    await Point.create({
      user_id: toStudentId,
      points_earned: 10,
      reason: `Peer reward: ${rewardType}`
    });

    res.json({ message: 'Reward sent! You made someone\'s day!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending reward', error: error.message });
  }
};

module.exports = {
  getMissions,
  startMission,
  completeMission,
  getDailyQuests,
  updateQuestProgress,
  getStreak,
  getTeamChallenges,
  joinTeamChallenge,
  sendPeerReward
};
