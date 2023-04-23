const express = require("express");
const router = express.Router();
const { getListOfStudents } = require("../db");

router.get("/", async (req, res) => {
  try {
    const students = await getListOfStudents();
    if (students.length > 0) {
      return res.status(200).send(students);
    } else {
      console.log("HEre");
      return res.status(404).send("No students found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
