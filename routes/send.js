const router = require("express").Router();

router.post("/", (req, res) => {
  res.json("Email page");
  console.log("success");
});

module.exports = router;
