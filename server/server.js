const urlRoutes = require("./routes/urlRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/url", urlRoutes);

mongoose.connect("mongodb+srv://bhavbshah23_db_user:eoVu2V4XJ9pEfolD@cluster0.wgzmsx2.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running");
});

const Url = require("./models/Url");

app.get("/:shortCode", async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.shortCode });

  if (url) {
    url.clicks++;
    await url.save();

    return res.redirect(url.originalUrl);
  } else {
    return res.status(404).send("URL not found");
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});