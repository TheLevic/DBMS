//Require mysql2/promise to use async/await
mysql = require("mysql2/promise");

require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

let getAllStudents = async () => {
  try {
    let [rows] = await pool.query("SELECT * FROM STUDENTS");
    console.log(rows);
    return;
  } catch (error) {
    console.log(error);
  }
};

getAllStudents();
