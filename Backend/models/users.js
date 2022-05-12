const mongoose = require("mongoose");
const { Schema } = mongoose;

const Users = new Schema({
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
});

const users = mongoose.model("Users", Users);
module.exports = users;
