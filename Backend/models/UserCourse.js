const mongoose = require("mongoose");

const UserCourseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Platform course
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

    // Custom course
    title: {
      type: String,
    },

    url: {
      type: String,
    },

    type: {
      type: String,
      enum: ["platform", "custom"],
      required: true,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    streak: {
      type: Number,
      default: 0,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Unique only for platform courses
UserCourseSchema.index(
  { user: 1, course: 1 },
  { unique: true, partialFilterExpression: { type: "platform" } }
);

module.exports = mongoose.model("UserCourse", UserCourseSchema);