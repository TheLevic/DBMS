import React from "react";
import axios from "axios";

function AddJob() {
    //Using state to store the values of the form inputs
    const [Name, setName] = React.useState("");
    const [JobID, setJobID] = React.useState(0);
    const [DesiredMajor, setDesiredMajor] = React.useState("");
    const [Title, setTitle] = React.useState("");
    const [Salary, setSalary] = React.useState(0);
  
    //These are our handlers for the form inputs
    let handleJobIDChange = (e) => {
      setJobID(e.target.value);
    };
  
    let handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    let handleDesiredMajorChange = (e) => {
      setDesiredMajor(e.target.value);
    };

    let handleTitleChange = (e) => {
      setTitle(e.target.value);
    };

    let handleSalaryChange = (e) => {
      setSalary(e.target.value);
    };
  
    /*
     * This is our handler for the form submit event
     * We are using axios to send a POST request to our API to add a new job to the database
     */
    let handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("JobID", JobID);
      formData.append("Name", Name);
      formData.append("DesiredMajor", DesiredMajor);
      formData.append("Title", Title);
      formData.append("Salary", Salary);
  
      axios
        .post("/api/addjob", formData, {
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
        <label htmlFor="JobID">JobID</label>
        <input
          type="number"
          name="JobID"
          id="JobID"
          value={JobID}
          onChange={handleJobIDChange}
          className="text-black bg-blue-200 rounded-md p-2"
        />
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={Name}
          onChange={handleNameChange}
          className="text-black bg-blue-200 rounded-md p-2"
        />

        <label htmlFor="Title">Job Title</label>
        <input
          className="bg-blue-200 rounded-md p-2"
          type="text"
          name="Title"
          id="Title"
          value={Title}
          onChange={handleTitleChange}
        />

        <label htmlFor="Salary">Salary</label>
        <input
          type="number"
          name="Salary"
          id="Salary"
          value={Salary}
          onChange={handleSalaryChange}
          className="text-black bg-blue-200 rounded-md p-2"
        />

        <label htmlFor="DesiredMajor">Desired Major</label>
        <input
          className="bg-blue-200 rounded-md p-2"
          type="text"
          name="DesiredMajor"
          id="DesiredMajor"
          value={DesiredMajor}
          onChange={handleDesiredMajorChange}
        />



        <button type="submit" className="btn">
          Submit
        </button>
      </form>
  </div>
  );
}

export default AddJob;
