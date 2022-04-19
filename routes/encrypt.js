const router = require("express").Router();
const multer = require("multer");
const HummusRecipe = require("hummus-recipe");
const path = require("path");
let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "encrypt/"),
  filename: (req, file, cb) => {
    const uniqueName = `${file.originalname}`;
    cb(null, uniqueName);
  },
});

let upload = multer({ storage: storage }).single("file");

function encryptPdf(filename, password) {
  const pdfDoc = new HummusRecipe(
    `./encrypt/${filename}`,
    `./encrypt/encrypted-${filename}`
  );

  pdfDoc
    .encrypt({
      userPassword: password,
      ownerPassword: password,
      userProtectionFlag: 4,
    })
    .endPDF();
}

router.post("/", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    encryptPdf(req.file.filename, req.body.password);
    return res.download(`./encrypt/encrypted-${req.file.filename}`);
  });
});

module.exports = router;
