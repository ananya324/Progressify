const UserCourse = require("../models/UserCourse");
const Course = require("../models/Course");

const saveCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    const courseExists = await Course.findById(courseId);

    if (!courseExists) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const savedCourse = await UserCourse.create({
      user: userId,
      course: courseId,
      type: "platform",
    });

    res.status(201).json(savedCourse);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Course already saved",
      });
    }

    if (process.env.NODE_ENV === "development") {
      console.error("saveCourse error:", error.message);
    }

    res.status(500).json({
      message: "Failed to save course",
    });
  }
};

const getMyCourse = async (req, res) => {
  try {
    const courses = await UserCourse.find({
      user: req.user._id,
    }).populate("course");

    res.json(courses);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("getMyCourse error:", error.message);
    }

    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { progress } = req.body;

    const userCourse = await UserCourse.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!userCourse) {
      return res.status(404).json({
        message: "Course not saved yet",
      });
    }

    userCourse.progress = progress;
    userCourse.lastUpdated = Date.now();

    await userCourse.save();

    res.json(userCourse);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("updateProgress error:", error.message);
    }

    res.status(500).json({
      message: "Failed to update progress",
    });
  }
};

const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const deleted = await UserCourse.findOneAndDelete({
      _id: courseId,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({
      message: "Course removed successfully",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("removeCourse error:", error.message);
    }

    res.status(500).json({
      message: "Failed to remove course",
    });
  }
};

const addCustomCourse = async (req, res) => {
  try {
    const { title, url } = req.body;

    if (!title || !url) {
      return res.status(400).json({
        message: "Title and URL are required",
      });
    }

    const newCourse = await UserCourse.create({
      user: req.user._id,
      title,
      url,
      type: "custom",
    });

    res.status(201).json(newCourse);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("addCustomCourse error:", error.message);
    }

    res.status(500).json({
      message: "Failed to add custom course",
    });
  }
};

module.exports = {
  saveCourse,
  getMyCourse,
  updateProgress,
  removeCourse,
  addCustomCourse,
};