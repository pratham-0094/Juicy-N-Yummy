const mongoose = require("mongoose");
const mongoURI = "";

const connectToMongo = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));
};

module.exports = connectToMongo;
