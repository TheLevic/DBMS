const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getStudentsByMajor } = require("../db");
const upload = multer();

router.post("/", upload.none(), async (req, res) => {
  try {
    const major = req.body.Major;
    const students = await getStudentsByMajor(major);
    return res.status(200).send(students);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
