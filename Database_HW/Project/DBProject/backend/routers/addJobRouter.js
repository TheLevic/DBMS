const express = require("express");
const multer = require("multer");
const router = express.Router();
const { insertJobToDB } = require("../db");

const upload = multer();

let job = {
  JobId: -1,
  CompanyName: "",
  JobTitle: "",
  Salary: -1,
  DesiredMajor: ""
};

router.post("/", upload.none(), (req, res) => {
  if (
    //req.body.JobID &&
    req.body.Name &&
    req.body.Title &&
    req.body.Salary &&
    req.body.DesiredMajor
  ) {
    try {
      //job.JobID = req.body.JobID;
      job.CompanyName = req.body.Name;
      job.JobTitle = req.body.Title;
      job.Salary = req.body.Salary;
      job.DesiredMajor = req.body.DesiredMajor;
      if (insertJobToDB(job)) {
        return res.status(200).send("Job added successfully");
      } else {
        return res.status(400).send("Error. Job not added.");
      }
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  } else {
    return res.status(400).send("Please enter all the fields");
  }
});

module.exports = router;
