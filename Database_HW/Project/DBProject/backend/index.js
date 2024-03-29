const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const addStudentRouter = require("./routers/addStudentRouter");
const addJobRouter = require("./routers/addJobRouter");
const getMajorsRouter = require("./routers/getMajorsRouter");
const getDesiredMajorsRouter = require("./routers/getDesiredMajorsRouter");
const getStudentByMajorRouter = require("./routers/getStudentByMajorRouter");
const getStudentListRouter = require("./routers/getStudentList");
const getJobByMajorRouter = require("./routers/getJobByMajorRouter");
const getJobListRouter = require("./routers/getJobList");
const getApplicationListRouter = require("./routers/getApplicationList");
const getListOfStudentInfo = require("./routers/getListOfStudentInfoRouter");
const getListOfJobInfoRouter = require("./routers/getListOfJobInfoRouter");
const addApplicationRouter = require("./routers/addApplicationRouter");
const getApplicationsRouter = require("./routers/getApplicationsRouter");

app.use("/api/addstudent", addStudentRouter);
app.use("/api/addjob", addJobRouter);
app.use("/api/addapplication", addApplicationRouter);
app.use("/api/getmajors", getMajorsRouter);
app.use("/api/getdesiredmajors", getDesiredMajorsRouter);
app.use("/api/getstudentsbymajor", getStudentByMajorRouter);
app.use("/api/getjobsbymajor", getJobByMajorRouter);
app.use("/api/getstudentlist", getStudentListRouter);
app.use("/api/getjoblist", getJobListRouter);
app.use("/api/getapplicationlist", getApplicationListRouter);
app.use("/api/getlistofstudentinfo", getListOfStudentInfo);
app.use("/api/getlistofjobinfo", getListOfJobInfoRouter);
app.use("/api/getapplications", getApplicationsRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
