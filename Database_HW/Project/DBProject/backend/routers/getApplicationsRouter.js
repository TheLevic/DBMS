const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getApplicationsByMajor } = require("../db");
const upload = multer();

router.post("/", upload.none(), async (req, res) => {
  try {
    const major = req.body.Major;
    const job = req.body.Job;
    const student = req.body.Student;
    if (req.body.Major != "") {
      const applications = await getApplicationsByMajor();
      return res.status(200).send(applications);
    }
    //const students = await getStudentsByMajor(major);
    return res.status(200).send(students);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;