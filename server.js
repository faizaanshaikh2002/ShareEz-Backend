require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3002;
const app = express();

// mongo Connection
connectDB();

// Routes
app.use("/api/files", require("./routes/files"));
app.get("/", (req, res) => {
  res.json({ message: "Server Up and running" });
});

app.listen(PORT, () => {
  console.log(`Server UP and running at port ${PORT}`);
});
