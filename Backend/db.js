const mongoose = require("mongoose");
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));
};

module.exports = connectToMongo;
