import React from "react";
import axios from "axios";

function AddStudent() {
  //Using state to store the values of the form inputs
  const [Name, setName] = React.useState("");
  const [Major, setMajor] = React.useState("");

  //These are our handlers for the form inputs
  let handleNameChange = (e) => {
    setName(e.target.value);
  };

  let handleMajorChange = (e) => {
    setMajor(e.target.value);
  };

  /*
   * This is our handler for the form submit event
   * We are using axios to send a POST request to our API to add a new student to the database
   */
  let handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Major", Major);

    axios
      .post("/api/addstudent", formData, {
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
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={Name}
          onChange={handleNameChange}
          className="text-black bg-blue-200 rounded-md p-2 m-2"
        />

        <label htmlFor="Major">Major</label>
        <input
          className="bg-blue-200 rounded-md p-2 m-2"
          type="text"
          name="Major"
          id="Major"
          value={Major}
          onChange={handleMajorChange}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
