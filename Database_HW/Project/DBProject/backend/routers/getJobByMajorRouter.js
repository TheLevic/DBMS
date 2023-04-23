const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getJobsByMajor } = require("../db");
const upload = multer();

router.post("/", upload.none(), async (req, res) => {
  try {
    const major = req.body.Major;
    const jobs = await getJobsByMajor(major);
    return res.status(200).send(jobs);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;