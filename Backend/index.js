const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// Users Routes
app.use("/file", require("./routes/users/image"));
app.use("/auth", require("./routes/users/auth"));
app.use("/restaurant", require("./routes/users/data"));

// Admin Routes
app.use("/admin/file", require("./routes/admin/image"));
app.use("/admin/auth", require("./routes/admin/auth"));
app.use("/admin/restaurant", require("./routes/admin/data"));

app.listen(port, () => {
  console.log(`LISTENING ON PORT http://localhost:${port}`);
});
