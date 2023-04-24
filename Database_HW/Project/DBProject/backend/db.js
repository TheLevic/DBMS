//Require mysql2/promise to use async/await
mysql = require("mysql2/promise");

require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Method to insert student into the database
let insertStudentToDB = async (student) => {
  try {
    let query = "INSERT INTO STUDENTS (STUDENTNAME, MAJOR) VALUES (?,?)";
    await pool.query(query, [student.name, student.major]);
    return true;
  } catch (error) {
    return false;
  }
};

let insertJobToDB = async (job) => {
  try {
    let query =
      "INSERT INTO JOBS (COMPANYNAME, JOBTITLE, SALARY, DESIREDMAJOR) VALUES (?,?,?,?)";
    await pool.query(query, [
      job.CompanyName,
      job.JobTitle,
      job.Salary,
      job.DesiredMajor,
    ]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

let getAllStudents = async () => {
  try {
    query = "SELECT STUDENTNAME FROM STUDENTS";
    [rows] = await pool.query(query);
    const students = rows.map((row) => row.STUDENTNAME);
    return students;
  } catch (error) {
    console.log("error");
  }
};

let getListOfStudents = async () => {
  try {
    query = "SELECT * FROM STUDENTS";
    let [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.log("error");
  }
};

let getListOfJobs = async () => {
  try {
    query = "SELECT * FROM JOBS";
    let [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.log("error");
  }
};

let getAllJobs = async () => {
  try {
    query = "SELECT JOBTITLE FROM JOBS";
    [rows] = await pool.query(query);
    const jobs = rows.map((row) => row.JOBTITLE);
    return jobs;
  } catch (error) {
    console.log("error");
  }
};

let getAllApplications = async () => {
  try {
    query =
      "SELECT STUDENTS.STUDENTNAME, STUDENTS.MAJOR, JOBS.SALARY, JOBS.COMPANYNAME FROM APPLICATIONS INNER JOIN STUDENTS ON APPLICATIONS.STUDENTID = STUDENTS.STUDENTID INNER JOIN JOBS ON APPLICATIONS.JOBID = JOBS.JOBID";
    [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

let getAllMajors = async () => {
  try {
    query = "SELECT DISTINCT MAJOR FROM STUDENTS";
    let [rows] = await pool.query(query);
    const majors = rows.map((row) => row.MAJOR);
    return majors;
  } catch (error) {
    console.log("error");
  }
};

let getAllDesiredMajors = async () => {
  try {
    query = "SELECT DISTINCT DESIREDMAJOR FROM JOBS";
    let [rows] = await pool.query(query);
    const majors = rows.map((row) => row.DESIREDMAJOR);
    return majors;
  } catch (error) {}
};

let getStudentsByMajor = async (major) => {
  try {
    query = "SELECT STUDENTNAME FROM STUDENTS WHERE MAJOR = ?";
    let [students] = await pool.query(query, [major]);
    //Map students to only return the names
    students = students.map((student) => student.STUDENTNAME);
    return students;
  } catch (error) {
    return false;
  }
};

let getJobsByMajor = async (major) => {
  try {
    query = "SELECT JOBTITLE FROM JOBS WHERE DESIREDMAJOR = ?";
    let [jobs] = await pool.query(query, [major]);
    //Map students to only return the names
    jobs = jobs.map((job) => job.JOBTITLE);
    return jobs;
  } catch (error) {
    return false;
  }
};

let addApplication = async (studentid, jobid) => {
  try {
    query = "INSERT INTO APPLICATIONS (STUDENTID, JOBID) VALUES (?,?)";
    await pool.query(query, [studentid, jobid]);
    return true;
  } catch (error) {
    return false;
  }
};

let getApplicationsByMajor = async (major) => {
  try {
    query =
      "SELECT STUDENTS.STUDENTNAME, STUDENTS.MAJOR, JOBS.SALARY, JOBS.COMPANYNAME FROM APPLICATIONS INNER JOIN STUDENTS ON APPLICATIONS.STUDENTID = STUDENTS.STUDENTID INNER JOIN JOBS ON APPLICATIONS.JOBID = JOBS.JOBID WHERE STUDENTS.MAJOR=?";
    [rows] = await pool.query(query, [major]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  insertStudentToDB,
  insertJobToDB,
  getAllMajors,
  getStudentsByMajor,
  getJobsByMajor,
  getAllDesiredMajors,
  getAllStudents,
  getAllJobs,
  getAllApplications,
  getListOfStudents,
  getListOfJobs,
  addApplication,
  getApplicationsByMajor
};
