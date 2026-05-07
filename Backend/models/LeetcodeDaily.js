// models/LeetcodeDaily.js

const mongoose = require("mongoose");

const leetcodeDailySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date, // "YYYY-MM-DD" (LOCAL DATE)
    required: true,
  },
  solved: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("LeetcodeDaily", leetcodeDailySchema);