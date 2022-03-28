const router = require("express").Router();
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "encrypt/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

let upload = multer({ storage: storage }).single("file");

router.post("/", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log(req.body.password);
    return res.status(200).send(req.file);
  });
});

module.exports = router;
