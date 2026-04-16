const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String, // YYYY-MM-DD
  },
  count: {
    type: Number,
    default: 1,
  },
  actions: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Activity", activitySchema);