const cors = require("cors");
require("dotenv").config();
const express = require("express");
// const { engine, path } = require("express/lib/application");
const connectDB = require("./config/db");
const path = require("path");
const PORT = process.env.PORT || 3002;
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// mongo Connection
connectDB();

// Template engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Routes
app.use("/api/files", require("./routes/files")); //Upload file route
app.use("/files", require("./routes/show")); //Download page route
app.use("/files/download", require("./routes/download")); //Download link route
app.use("/api/files/send", require("./routes/send")); //Route for sending email

app.get("/", (req, res) => {
  res.json({ message: "Server Up and running" });
});

app.listen(PORT, () => {
  console.log(`Server UP and running at port ${PORT}`);
});
