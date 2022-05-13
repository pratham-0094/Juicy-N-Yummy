const mongoose = require("mongoose");
const { Schema } = mongoose;

const Image = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

const image = mongoose.model("Image", Image);
module.exports = image;
