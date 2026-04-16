const Activity = require("../models/activity.model");

// This runs when we want to save user activity
const logActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    //Get what user did (like ‘watched video’;
    const { action } = req.body;

    //Get today’s date in simple format (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    //Check if this user already has activity for today
    let activity = await Activity.findOne({
      user: userId,
      date: today,
    });
    //If no record exists → create new one with count = 1
    if (!activity) {
      activity = new Activity({
        user: userId,
        date: today,
        count: 1,
        actions: [action], 
      });
    } else {
      activity.count += 1;
      activity.actions.push(action); 
    }

    await activity.save();

    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging activity" });
  }
};

//If already exists → increase count and add new action
const getActivity = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await Activity.find({ user: userId });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching activity" });
  }
};

module.exports = { logActivity, getActivity };