const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addApplication } = require("../db.js");

let upload = multer();
//Need to implement this router to accept AddApplication requests
router.post("/", upload.none(), async (req, res) => {
  if (req.body.StudentId && req.body.JobId) {
    //Going to need to add the application to the database
    let commmited = await addApplication(req.body.StudentId, req.body.JobId);
    if (commmited) {
      return res.status(200).send("Application added successfully");
    } else {
      return res.status(500).send("Application failed to add");
    }
  } else {
    return res.status(400).send("Missing StudentId or JobId");
  }
});

module.exports = router;
