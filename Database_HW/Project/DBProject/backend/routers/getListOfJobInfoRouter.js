const express = require("express");
const router = express.Router();
const { getListOfJobs } = require("../db");

router.get("/", async (req, res) => {
  try {
    const jobs = await getListOfJobs();
    if (jobs.length > 0) {
      return res.status(200).send(jobs);
    } else {
      return res.status(404).send("No jobs found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
