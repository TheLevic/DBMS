const express = require("express");
const multer = require("multer");
const router = express.Router();
const { insertStudentToDB } = require("../db");

const upload = multer();

let student = {
  id: -1,
  name: "",
  major: "",
};

router.post("/", upload.none(), (req, res) => {
  if (req.body.Name && req.body.Major) {
    try {
      student.name = req.body.Name;
      student.major = req.body.Major;
      if (insertStudentToDB(student)) {
        return res.status(200).send("Student added successfully");
      } else {
        return res.status(400).send("Error. Student not added.");
      }
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  } else {
    return res.status(400).send("Bad Request");
  }
});

module.exports = router;
