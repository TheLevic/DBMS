const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getApplicationsByMajor, getApplicationsByJob, getApplicationsByStudent, getApplicationsByMulti1, getApplicationsByMulti2, getApplicationsByMulti3, getApplicationsByMulti4} = require("../db");
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
    if (major != "empty" && job != "empty" && student == "empty") {
      const applications = await getApplicationsByMulti1(major, job);
      return res.status(200).send(applications);
    }
    if (major != "empty" && job == "empty" && student != "empty") {
      const applications = await getApplicationsByMulti2(major, student);
      return res.status(200).send(applications);
    }
    if (major == "empty" && job != "empty" && student != "empty") {
      const applications = await getApplicationsByMulti3(job, student);
      return res.status(200).send(applications);
    }
    if (major != "empty" && job != "empty" && student != "empty") {
      const applications = await getApplicationsByMulti4(major, job, student);
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