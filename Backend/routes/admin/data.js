const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Items = require("../../models/items");
const Review = require("../../models/review");
var adminsInfo = require("../../middleware/admin-info");

// Route 1 :- Create item
router.post("/add", adminsInfo, async (req, res) => {
  const { name, category, origin, rating, img, restaurant, price, time } =
    req.body;
  let adminId = req.admin.id;

  try {
    const items = await Items.create({
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

// Route 2 :- Delete item
router.delete("/delete/:id", adminsInfo, async (req, res) => {
  let adminId = req.admin.id;

  try {
    let items = await Items.findById(req.params.id);

    if (!items) {
      return res.status(404).send("Not Found");
    }

    if (items.restaurantId.toString() !== adminId) {
      return res.status(401).send("Not Allowed");
    }

    items = await Items.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 3 :- Get item
router.get("/get", adminsInfo, async (req, res) => {
  let adminId = req.admin.id;
  try {
    let items = await Items.find({ restaurantId: adminId });
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4 :- Delete review
router.delete("/review/delete/:id", adminsInfo, async (req, res) => {
  let adminId = req.admin.id;

  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).send("Not Found");
    }

    if (review.restaurant.toString() !== adminId) {
      return res.status(401).send("Not Allowed");
    }

    review = await Review.findByIdAndDelete(req.params.id);
    res.json({ Success: "review has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 5 :- Get all review
router.get("/review/:id", async (req, res) => {
  try {
    let review = await Review.find({ restaurantId: req.params.id });
    res.json(review);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
