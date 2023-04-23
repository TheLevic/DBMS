const express = require("express");
const router = express.Router();
const { getAllDesiredMajors } = require("../db");

router.get("/", async (req, res) => {
  try {
    const majors = await getAllDesiredMajors();
    if (majors.length > 0) {
      return res.status(200).send(majors);
    } else {
      return res.status(404).send("No majors found");
    }
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;