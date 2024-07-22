const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");

const Items = require("../../models/items");
const Review = require("../../models/review");
var adminsInfo = require("../../middleware/admin-info");
const { deleteImageFromDatabase, saveImageToDatabase } = require("../../middleware/upload-asset");

const uploadAsset = multer().fields([{ name: 'img', maxCount: 1 }]);

// Route 1: Create item
router.post("/add", adminsInfo, uploadAsset, async (req, res) => {
  let img = null;
  try {
    const { name, category, origin, rating, restaurant, price, time } = req.body;
    let adminId = req.admin.id;
    
    if (req.files && req.files['img']) {
      const imgFile = req.files['img'][0];
      if (!imgFile) {
        return res.status(400).send('Invalid img image');
      }
      img = await saveImageToDatabase(imgFile, 'poster');
    }
    
    const parsedRating = parseInt(rating, 10);
    
    const items = await Items.create({
      name,
      category,
      origin,
      rating: parsedRating,
      img,
      restaurant,
      restaurantId: adminId,
      price,
      time,
    });

    res.send(items);
  } catch (error) {
    console.error(error.message);
    if (img) {
      await deleteImageFromDatabase(img); // Reference 'img' instead of 'poster'
    }
    res.status(500).send("Internal Server Error");
  }
});

// Route 2 :- Delete item
router.delete("/delete/:id", adminsInfo, async (req, res) => {
  try {
    let adminId = req.admin.id;

    let items = await Items.findById(req.params.id);

    if (!items) {
      return res.status(404).send("Not Found");
    }

    if (items.restaurantId.toString() !== adminId) {
      return res.status(401).send("Not Allowed");
    }
    if (items.img) {
      await deleteImageFromDatabase(items.img);
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
  try {
    let adminId = req.admin.id;
    let items = await Items.find({ restaurantId: adminId }).populate('img');
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4 :- Delete review
router.delete("/review/delete/:id", adminsInfo, async (req, res) => {
  try {
    let adminId = req.admin.id;

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
