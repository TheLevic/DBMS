const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const addStudentRouter = require("./routers/addStudentRouter");
const addJobRouter = require("./routers/addJobRouter");
const getMajorsRouter = require("./routers/getMajorsRouter");
const getStudentByMajorRouter = require("./routers/getStudentByMajorRouter");

app.use("/api/addstudent", addStudentRouter);
app.use("/api/addjob", addJobRouter);
app.use("/api/getmajors", getMajorsRouter);
app.use("/api/getstudentsbymajor", getStudentByMajorRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
