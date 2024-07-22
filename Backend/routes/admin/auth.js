const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();

const Admin = require("../../models/admin");
var adminsInfo = require("../../middleware/admin-info");

require('dotenv').config();

// Route 1 :- Create admin
router.post("/signup", async (req, res) => {
  try {
    let success = false;
    let {
      name,
      email,
      phone_no,
      password,
      restaurant,
      address,
      distict,
      state,
      landmark,
    } = req.body;

    // Check whether the user with this email exists already
    let admin = await Admin.findOne({ phone_no: phone_no });
    if (admin) {
      let success = false;
      return res.json({
        success,
        error: "Sorry a user with email or contact already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    // Create a new user
    admin = await Admin.create({
      name,
      email,
      phone_no,
      password: secPass,
      restaurant,
      address,
      distict,
      state,
      landmark,
    });

    const data = {
      admin: {
        id: admin.id,
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

// Route 2 :- Authenticate a admin
router.post("/login", async (req, res) => {
  try {
    let success = false;
    const { phone_no } = req.body;

    //Check the credential
    let admin = await Admin.findOne({ phone_no });
    if (!admin) {
      success = false;
      return res.json({
        success,
        error: "Please try to login with correct credentials",
      });
    }

    const data = {
      admin: {
        id: admin.id,
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

// Route 3 :- Get admin details
router.get("/getadmin", adminsInfo, async (req, res) => {
  try {
    let adminId = req.admin.id;
    const admin = await Admin.findById(adminId).select("-password");
    res.send(admin);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4 :- Edit admin details
router.put("/edit", adminsInfo, async (req, res) => {
  try {
    let success = false;
    let { name, email, phone_no, duration, status } = req.body;
    const admin = {
      name,
      email,
      phone_no,
      duration,
      status,
    };
    let adminId = req.admin.id;
    const admins = await Admin.findByIdAndUpdate(
      adminId,
      { $set: admin },
      { new: true }
    );
    success = true;
    res.json({ success });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 5 :- Add category
router.put("/category", adminsInfo, async (req, res) => {
  try {
    let success = false;
    let { category } = req.body;
    const admin = {
      category,
    };
    let adminId = req.admin.id;
    const admins = await Admin.findByIdAndUpdate(
      adminId,
      { $set: admin },
      { new: true }
    );
    success = true;
    res.json({ success });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
