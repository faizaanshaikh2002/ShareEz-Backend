const File = require("../models/file");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;
  console.log(uuid, emailTo, emailFrom);
  if (!uuid) {
    return res.status(422).send({ error: "All fields are required" });
  }

  const file = await File.findOne({ uuid: uuid });
  // console.log(file);

  // Validate Request
  if (file.sender) {
    return res.status(422).send({ error: "Email already sent." });
  }

  // Get data from the database
  file.sender = emailFrom;
  file.receiver = emailTo;
  const data = await file.save();

  // Send email
  const sendMail = require("../services/emailService");
  sendMail({
    from: emailFrom,
    to: emailTo,
    subject: "ShareEz file sharing",
    text: `${emailFrom} shared a file with you`,
    html: require("../services/emailTemplate")({
      emailFrom: emailFrom,
      downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
      size: parseInt(file.size / 1000) + "KB",
      expires: "24 Hours",
    }),
  });

  console.log("Mail sent");
  return res.send({ success: true });
  // res.json("Email page");
  // console.log("success");
});

module.exports = router;
