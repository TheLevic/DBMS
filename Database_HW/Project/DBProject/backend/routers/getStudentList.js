const express = require("express");
const router = express.Router();
const { getAllStudents } = require("../db");

router.get("/", async (req, res) => {
    try {
      const students = await getAllStudents();
      if (students.length > 0) {
        return res.status(200).send(students);
      } else {
        return res.status(404).send("No students found");
      }
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;