import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  //Using state to store the values of the form inputs
  const [Name, setName] = React.useState("");
  const [Major, setMajor] = React.useState("");

  const nav = useNavigate();

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
        if (res.status === 200) {
          toast.success("Student Added Successfully");
          nav("/");
        } else if (res.status === 400) {
          toast.error("Error. Please try again");
        } else if (res.status === 500) {
          toast.error("Server Error. Please try again later.");
        } else {
          toast.error("Error. ");
        }
      })
      .catch((err) => {
        toast.error("Error. Make sure all fields are filled out correctly.");
      });
  };

  return (
    <div className="bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="Name" className="font-bold text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={Name}
          onChange={handleNameChange}
          className="px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
        />

        <label htmlFor="Major" className="font-bold text-gray-700">
          Major
        </label>
        <input
          className="px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
          type="text"
          name="Major"
          id="Major"
          value={Major}
          onChange={handleMajorChange}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
