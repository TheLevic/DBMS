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

let getAllMajors = async () => {
  try {
    query = "SELECT DISTINCT MAJOR FROM STUDENTS";
    let [rows] = await pool.query(query);
    const majors = rows.map((row) => row.MAJOR);
    return majors;
  } catch (error) {
    console.log(error);
  }
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

module.exports = { insertStudentToDB, getAllMajors, getStudentsByMajor };
