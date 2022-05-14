const express = require("express");
const mongoose = require("mongoose");
// const Grid = require("gridfs-stream");
const router = express.Router();

const upload = require("../../middleware/image-info");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const url = "mongodb+srv://root:adminroot@cluster.djali.mongodb.net/";
const baseUrl = "http://localhost:5000/admin/file/get/";
const mongoClient = new MongoClient(url);

// Route 1 :- Get all images
router.get("/get", async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db("Juicy-N-Yummy");
    const images = database.collection("fs" + ".files");
    const cursor = images.find({});

    // if ((await cursor.bufferedCount()) === 0) {
    //   return res.status(500).send({
    //     message: "No files found!",
    //   });
    // }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

// Route 2 :- Get image
router.get("/get/:filename", async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db("Juicy-N-Yummy");
    const bucket = new GridFSBucket(database, {
      bucketName: "fs",
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.filename);
    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;
