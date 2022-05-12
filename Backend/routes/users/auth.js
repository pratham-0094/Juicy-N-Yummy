const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Users = require("../../models/users");
var info = require("../../middleware/users-info");

const JWT_SECRET = "Juicy-N-Yummy";

// Route 1 :- Create user
router.post("/signup", async (req, res) => {
  let success = false;
  try {
    let { name, email, phone_no, password } = req.body;

    // Check whether the user with this email exists already
    let users = await Users.findOne({ email: email });
    if (users) {
      let success = false;
      return res
        .status(400)
        .json({ error: "Sorry a user with email or contact already exists" });
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

    const authtoken = jwt.sign(data, JWT_SECRET);
    let success = true;
    // res.json(user)
    res.json({ success, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2 :- Authenticate a user


module.exports = router;
