const mongoose = require("mongoose");
const { Schema } = mongoose;

const Items = new Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: number,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  price: {
    type: number,
    required: true,
  },
  time: {
    type: number,
    required: true,
  },
});

const items = mongoose.model("Items", Items);
module.exports = items;
