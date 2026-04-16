const Recommendation = require("../models/Recommendation");

// GET /api/recommendations/:courseId
const getRecommendationsByCourse = async (req, res) => {
  try {
    const recommendations = await Recommendation.find({
      course: req.params.courseId,
    });

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /api/recommendations
const getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find().populate("course");
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getRecommendationsByCourse,
  getAllRecommendations,
};

