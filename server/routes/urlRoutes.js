const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

// 🔹 SHORTEN URL
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const shortCode = Math.random().toString(36).substring(2, 8);

    const newUrl = new Url({
      originalUrl,
      shortCode,
    });

    await newUrl.save();

    const BASE = process.env.BASE_URL || "http://localhost:8000";

    res.json({
      shortUrl: `${BASE}/${shortCode}`,
    });

  } catch (error) {
    console.error("ERROR IN /shorten:", error);
    res.status(500).json({ error: error.message });
  }
});


// 🔹 GET ALL URLS
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