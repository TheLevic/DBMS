const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  if (req.body.StudentID && req.body.Name && req.body.Major) {
    try {
      const studentID = req.body.StudentID;
      const studentName = req.body.Name;
      const studentMajor = req.body.Major;
      console.log(studentID, studentName, studentMajor);
      res.status(200).send("OK");
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  } else {
    return res.status(400).send("Bad Request");
  }
});

module.exports = router;
