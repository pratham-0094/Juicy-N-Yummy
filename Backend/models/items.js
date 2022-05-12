const { Schema, default: mongoose } = require("mongoose");

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
  password: {
    type: String,
    required: true,
  },
});

const items = mongoose.model("Items", Items);
module.exports = items;
