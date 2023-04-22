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

module.exports = { insertStudentToDB, getAllMajors };
