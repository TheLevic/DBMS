const express = require("express");
const router = express.Router();
const { getAllApplications } = require("../db");

router.get("/", async (req, res) => {
    try {
      const applications = await getAllApplications();
      if (applications.length > 0) {
        return res.status(200).send(applications);
      } else {
        return res.status(404).send("No applications found");
      }
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;