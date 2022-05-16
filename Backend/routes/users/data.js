const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Items = require("../../models/items");

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

module.exports = router;
