import React from "react";
import axios from "axios";

function AddApplication() {
    //Using state to store the values of the form inputs
    const [StudentID, setStudentID] = React.useState(0);
    const [JobID, setJobID] = React.useState(0);
  
    //These are our handlers for the form inputs
    let handleStudentIDChange = (e) => {
      setStudentID(e.target.value);
    };

    let handleJobIDChange = (e) => {
      setJobID(e.target.value);
    };
  
 
    /*
     * This is our handler for the form submit event
     * We are using axios to send a POST request to our API to add a new student to the database
     */
    let handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("StudentID", StudentID);
      formData.append("JobID", JobID);
  
      axios
        .post("/api/addapplication", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
  
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="StudentID">StudentID</label>
        <input
          type="number"
          name="StudentID"
          id="StudentID"
          value={StudentID}
          onChange={handleStudentIDChange}
          className="text-black bg-blue-200 rounded-md p-2"
        />
        <label htmlFor="JobID">JobID</label>
        <input
          type="number"
          name="JobID"
          id="JobID"
          value={JobID}
          onChange={handleJobIDChange}
          className="text-black bg-blue-200 rounded-md p-2"
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddApplication;
