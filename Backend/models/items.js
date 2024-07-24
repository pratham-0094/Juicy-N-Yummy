const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Items = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  img: {
    type: Schema.Types.ObjectId,
    ref: "Asset",
    required: true,
  },
  restaurant: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});
Items.plugin(mongoosePaginate);

const items = mongoose.model("Items", Items);
module.exports = items;
