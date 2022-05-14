const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Admin = require("../../models/admin");
var adminsInfo = require("../../middleware/admin-info");

const JWT_SECRET = "Juicy-N-Yummy";

// Route 1 :- Create admin
router.post("/signup", async (req, res) => {
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

  try {
    // Check whether the user with this email exists already
    let admin = await Admin.findOne({ phone_no: phone_no });
    if (admin) {
      let success = false;
      return res
        .status(400)
        .json({ error: "Sorry a user with email or contact already exists" });
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
    const authtoken = jwt.sign(data, JWT_SECRET);
    let success = true;
    // res.json(user)
    res.json({ success, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2 :- Authenticate a admin
router.post("/login", async (req, res) => {
  let success = false;
  const { phone_no } = req.body;

  try {
    //Check the credential
    let admin = await Admin.findOne({ phone_no });
    if (!admin) {
      success = false;
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }

    const data = {
      admin: {
        id: admin.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 3 :- Get user details
router.post("/getadmin", adminsInfo, async (req, res) => {
  try {
    let adminId = req.admin.id;
    const admin = await Admin.findById(adminId).select("-password");
    res.send(admin);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4 :- Edit user details
router.put("/edit", adminsInfo, async (req, res) => {
  let success = false;
  let { name, email, phone_no, password } = req.body;
  const user = {
    name: name,
    email: email,
    phone_no: phone_no,
    password: password,
  };
  try {
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

module.exports = router;
