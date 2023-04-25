const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getApplicationsByMajor, getApplicationsByJob, getApplicationsByStudent } = require("../db");
const upload = multer();

router.post("/", upload.none(), async (req, res) => {
  try {
    const major = req.body.major;
    const job = req.body.job;
    const student = req.body.student;
    if (major != "empty" && job == "empty" && student == "empty") {
      const applications = await getApplicationsByMajor(major);
      return res.status(200).send(applications);
    }
    if (major == "empty" && job != "empty" && student == "empty") {
      const applications = await getApplicationsByJob(job);
      return res.status(200).send(applications);
    }
    if (major == "empty" && job == "empty" && student != "empty") {
      const applications = await getApplicationsByStudent(student);
      return res.status(200).send(applications);
    }
    //const students = await getStudentsByMajor(major);
    //return res.status(200).send("no dice");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;