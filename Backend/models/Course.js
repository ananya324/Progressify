const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    topic: {
      type: String, // webdev, dsa, ai
      required: true,
    },

    platform: {
      type: String, // YouTube, Udemy, 100xDevs
      required: true,
    },

    isFree: {
      type: Boolean,
      required: true,
    },

    price: {
      type: Number,
      default: 0,
    },

    link: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
