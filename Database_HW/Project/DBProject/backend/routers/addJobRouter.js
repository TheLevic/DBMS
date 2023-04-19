const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();

router.post("/", upload.none(), (req, res) => {
  if (
    req.body.JobId &&
    req.body.CompanyName &&
    req.body.JobTitle &&
    req.body.Salary &&
    req.body.DesiredMajor
  ) {
    try {
      const JobId = req.body.JobId;
      const CompanyName = req.body.CompanyName;
      const JobTitle = req.body.JobTitle;
      const Salary = req.body.Salary;
      const DesiredMajor = req.body.DesiredMajor;
      console.log(JobId, CompanyName, JobTitle, Salary, DesiredMajor);
      return res.status(200).send("OK");
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  } else {
    return res.status(400).send("Oh");
  }
});

module.exports = router;
