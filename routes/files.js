const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage: storage,
  limit: { fileSize: 1000000 * 500 },
}).single("myfile");

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    //   Validate request
    console.log(req.file);
    if (!req.file) {
      return res.json({ error: "No files are provided" });
    }

    if (err) {
      return res.status(500).send({ error: err.message });
    }

    //   Store into Database
    const file = new File({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });
  //   Response-> Link;
});

module.exports = router;
