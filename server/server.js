const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://bhavbshah23_db_user:eoVu2V4XJ9pEfolD@cluster0.wgzmsx2.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});