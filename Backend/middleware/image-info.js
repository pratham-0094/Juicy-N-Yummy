const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: "mongodb+srv://root:adminroot@cluster.djali.mongodb.net/Juicy-N-Yummy",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-food-${file.originalname}`;
      return filename;
    }

    return {
      BucketName: "fs",
      filename: `${Date.now()}-food-${file.originalname}`,
    };
  },
});

var uploadFiles = multer({ storage: storage }).single("food");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;