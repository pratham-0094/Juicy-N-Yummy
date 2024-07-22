const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();

connectToMongo();
const app = express();
const port = process.env.PORT | 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Users Routes
app.use("/auth", require("./routes/users/auth"));
app.use("/restaurant", require("./routes/users/data"));

// Admin Routes
app.use("/admin/auth", require("./routes/admin/auth"));
app.use("/admin/restaurant", require("./routes/admin/data"));

app.listen(port, () => {
  console.log(`LISTENING ON PORT http://localhost:${port}`);
});
