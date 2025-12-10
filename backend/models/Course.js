const moongose = require("mongoose");

const Course = new moongose.Schema({
  coursename: {
    type: String,
  },
  coursedescription: {
    type: String,
  },
  instructor: {
    type: moongose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  whatwillyoulearn: {
    type: String,
  },
  coursecontent: [
    {
      type: moongose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingandreview: [
    {
      type: moongose.Schema.Types.ObjectId,
      ref: "Ratingandreview",
    },
  ],
  price: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  tag: {
    type: String,
    ref: "Tag",
  },
  category: {
    type: moongose.Schema.Types.ObjectId,
    ref: "Category",
  },
  studentenrolled: [
    {
      type: moongose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  instruction: {
    type: [String],
  },

  status: {
    type: String,
    enum: ["Draft", "Published"],
  },
});

module.exports = moongose.model("Course", Course);
