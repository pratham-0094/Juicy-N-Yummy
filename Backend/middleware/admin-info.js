var jwt = require("jsonwebtoken");
require('dotenv').config();

const adminInfo = (req, res, next) => {
  // Get the adminId from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = data.admin;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = adminInfo;
