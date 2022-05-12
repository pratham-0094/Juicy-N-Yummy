const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())


// app.get("/", (req, res) => {
//   res.send("hello world");
// });

//create user using /auth using post
// app.use("/auth", require("./routes/auth"));
// app.use("/data", require("./routes/data"));


app.listen(port, () => {
  console.log(`LISTENING ON PORT http://localhost:${port}`);
});
