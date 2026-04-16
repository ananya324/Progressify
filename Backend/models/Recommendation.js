const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    source: {
      type: String,
      enum: ["twitter", "reddit", "blog"],
      required: true,
    },

    author: {
      type: String, // harkirat, randomRedditor123
    },

    text: {
      type: String, // "This course changed my backend understanding"
      required: true,
    },

    link: {
      type: String, // link to tweet / reddit post
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recommendation", recommendationSchema);
