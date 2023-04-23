const express = require("express");
const router = express.Router();
const { getListOfJobs } = require("../db");

router.get("/", async (req, res) => {
  try {
    const jobs = await getListOfJobs();
    if (jobs.length > 0) {
      console.log(jobs);
      return res.status(200).send(jobs);
    } else {
      console.log("HEre");
      return res.status(404).send("No jobs found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
