const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Items = require("../../models/items");
var adminsInfo = require("../../middleware/admin-info");

router.post("/add", adminsInfo, async (req, res) => {
  const { name, category, origin, rating, img, restaurant, price, time } =
    req.body;
  let adminId = req.admin.id;

  try {
    const items = new Items.create({
      name,
      category,
      origin,
      rating,
      img,
      restaurant,
      restaurantId: adminId,
      price,
      time,
    });

    res.send(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
