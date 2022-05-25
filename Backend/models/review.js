const mongoose = require("mongoose");
const { Schema } = mongoose;

const Review = new Schema({
  user: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  rating: {
    type: Number,
    required: true,
  },
});

const review = mongoose.model("Review", Review);
module.exports = review;
