const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();

const Users = require("../../models/users");
const Admin = require("../../models/admin");
var usersInfo = require("../../middleware/users-info");

require('dotenv').config();

// Route 1 :- Create user
router.post("/signup", async (req, res) => {
  try {
    let success = false;
    let { name, email, phone_no, password } = req.body;

    // Check whether the user with this email exists already
    let users = await Users.findOne({ phone_no: phone_no });
    if (users) {
      let success = false;
      return res.json({
        success,
        error: "Sorry a user with email or contact already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    // Create a new user
    users = await Users.create({
      name,
      email,
      phone_no,
      password: secPass,
    });

    const data = {
      users: {
        id: users.id,
      },
    };
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    success = true;
    // res.json(user)
    res.json({ success, authtoken });
  } catch (error) {
    console.error(error.message);
    res.json({ success, msg: "Internal Server Error" });
  }
});

// Route 2 :- Authenticate a user
router.post("/login", async (req, res) => {
  try {
    let success = false;
    const { phone_no } = req.body;

    //Check the credential
    let users = await Users.findOne({ phone_no });
    if (!users) {
      success = false;
      return res.json({
        success,
        error: "Please try to login with correct credentials",
      });
    }

    const data = {
      users: {
        id: users.id,
      },
    };

    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.error(error.message);
    res.json({ success, msg: "Internal Server Error" });
  }
});

// Route 3 :- Get user details
router.get("/getuser", usersInfo, async (req, res) => {
  try {
    let userId = req.users.id;
    const users = await Users.findById(userId).select("-password");
    res.send(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4 :- Edit user details
router.put("/edit", usersInfo, async (req, res) => {
  try {
    let success = false;
    let { name, email, phone_no } = req.body;
    const user = {
      name,
      email,
      phone_no,
    };
    let userId = req.users.id;
    const users = await Users.findByIdAndUpdate(
      userId,
      { $set: user },
      { new: true }
    );
    success = true;
    res.json({ success });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 5 :- Get admin details
router.get("/getadmin/:id", async (req, res) => {
  try {
    let adminId = req.params.id;
    const admin = await Admin.findById(adminId).select("-password");
    res.send(admin);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
