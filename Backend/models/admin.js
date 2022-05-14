const mongoose = require("mongoose");
const { Schema } = mongoose;

const Admin = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone_no: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  restaurant: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distict: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Array,
    default: [9, 21],
  },
  category: {
    type: Array,
  },
});

const admin = mongoose.model("Admin", Admin);
module.exports = admin;
