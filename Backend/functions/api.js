const connectToMongo = require('../db');
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

connectToMongo();
const app = express()
const router = express.Router()

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());

// Users Routes
router.use("/auth", require("../routes/users/auth"));
router.use("/restaurant", require("../routes/users/data"));

// Admin Routes
router.use("/admin/auth", require("../routes/admin/auth"));
router.use("/admin/restaurant", require("../routes/admin/data"));

app.use("/.netlify/functions/api",router);
module.exports.handler = serverless(app);