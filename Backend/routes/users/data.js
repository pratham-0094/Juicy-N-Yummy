const express = require("express");
const mongoose = require("mongoose");
const { userInfo } = require("os");
const router = express.Router();

const Items = require("../../models/items");
const Review = require("../../models/review");

// Route 1 :- Get all item
router.get("/get", async (req, res) => {
  try {
    let items = await Items.find({});

    if (!items) {
      return res.status(404).send("No Item Found");
    }

    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2 :- Get item
router.get("/get/:id", async (req, res) => {
  try {
    let restaurantId = mongoose.Types.ObjectId(req.params.id);
    let items = await Items.find({ restaurantId: restaurantId });
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 3 :- Get item by region
router.get("/region/:name", async (req, res) => {
  try {
    let items = await Items.find({ origin: req.params.name });
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4 :- Get item by category
router.get("/category/:name", async (req, res) => {
  try {
    let items = await Items.find({ category: req.params.name });
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 5 :- Create review
router.post("/review", userInfo, async (req, res) => {
  let success = false;
  let userId = req.users.id;
  let { user, description, restaurant, rating } = req.body;

  try {
    let review = await Review.create({
      user,
      description,
      userId,
      restaurant,
      rating,
    });

    let success = true;
    res.json({ success });
  } catch (error) {
    console.error(error.message);
    res.json({ success, msg: "Internal Server Error" });
  }
});

// Route 6 :- Delete review
router.delete("/review/:id", userInfo, async (req, res) => {
  let user_Id = req.user.id;

  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).send("Not Found");
    }

    if (review.userId.toString() !== user_Id) {
      return res.status(401).send("Not Allowed");
    }

    review = await Review.findByIdAndDelete(req.params.id);
    res.json({ Success: "review has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
