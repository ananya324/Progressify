const Course = require("../models/Course");

// GET /api/courses?topic=webdev
const getAllCourses = async (req, res) => {
  try {
    const { topic } = req.query;

    const filter = topic ? { topic } : {};
    const courses = await Course.find(filter);

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
};
