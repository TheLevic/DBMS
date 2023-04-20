const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const addStudentRouter = require("./routers/addStudentRouter");
const addJobRouter = require("./routers/addJobRouter");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/addstudent", addStudentRouter);
app.use("/api/addjob", addJobRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
