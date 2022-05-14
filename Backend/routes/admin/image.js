const express = require("express");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const upload = require("../../middleware/image-info");
const router = express.Router();

let gfs;
const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("foodItems");
});

// Route 1 :- Upload image
router.post("/upload", upload.single("food"), async (req, res) => {
  if (req.file === undefined) {
    return res.send("you must select a file");
  }
  const imgUri = `http://localhost:5000/food/${req.file.filename}`;
  return res.send(imgUri);
});

// Route 2 :- Get image
router.get("/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("Not found");
  }
});

// Route 3 :- Delete image
router.delete("/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("Success");
  } catch (error) {
    console.log(error);
    res.send("An error occured")
  }
});

module.exports = router;
