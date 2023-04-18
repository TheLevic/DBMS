import { useState } from "react";
import React from "react";

function addStudent() {
  const [student, setStudent] = useState("");

  let handleStudentInput = (event) => {
    event.preventDefault();
    setStudent(event.target.value);
  };

  return (
    <div>
      <h1>Add a student to the database</h1>
      <label htmlFor="student">Add Student</label>
      <input
        type="text"
        name="student"
        id="student"
        value={student}
        onChange={handleStudentInput}
      />
      <p>{student}</p>
    </div>
  );
}

export default AddStudent;
