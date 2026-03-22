const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  const shortCode = Math.random().toString(36).substring(2, 8);

  const newUrl = new Url({
    originalUrl,
    shortCode
  });

  await newUrl.save();

  res.json({
    shortUrl: `http://localhost:5000/${shortCode}`
  });
});

// Get all URLs
router.get("/all", async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (error) {
    console.error("ERROR IN /all:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;