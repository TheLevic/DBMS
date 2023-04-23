const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();

router.post("/", upload.none(), (req, res) => {
  if (
    req.body.JobID &&
    req.body.Name &&
    req.body.Title &&
    req.body.Salary &&
    req.body.DesiredMajor
  ) {
    try {
      const JobId = req.body.JobID;
      const CompanyName = req.body.Name;
      const DesiredMajor = req.body.DesiredMajor;
      const JobTitle = req.body.Title;
      const Salary = req.body.Salary;
      return res.status(200).send("OK");
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  } else {
    return res.status(400).send("Please enter all the fields");
  }
});

module.exports = router;
