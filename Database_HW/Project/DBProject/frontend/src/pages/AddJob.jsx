import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddJob() {
  //Using state to store the values of the form inputs
  const [Name, setName] = React.useState("");
  const [DesiredMajor, setDesiredMajor] = React.useState("");
  const [Title, setTitle] = React.useState("");
  const [Salary, setSalary] = React.useState(0);

  const nav = useNavigate();

  //These are our handlers for the form inputs

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
        if (res.status === 200) {
          toast.success("Job Added Successfully");
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
        if (err.response.data == "Please enter all the fields") {
          toast.error("Please enter all fields");
        } else {
          toast.error("Something went wrong, please try again");
        }
      });
  };

  return (
    <div className="flex flex-col space-y-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="Name" className="block font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={Name}
            onChange={handleNameChange}
            className="w-full py-2 px-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Title" className="block font-bold mb-2">
            Job Title:
          </label>
          <input
            type="text"
            name="Title"
            id="Title"
            value={Title}
            onChange={handleTitleChange}
            className="w-full py-2 px-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Salary" className="block font-bold mb-2">
            Salary:
          </label>
          <input
            type="number"
            name="Salary"
            id="Salary"
            value={Salary}
            onChange={handleSalaryChange}
            className="w-full py-2 px-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="DesiredMajor" className="block font-bold mb-2">
            Desired Major:
          </label>
          <input
            type="text"
            name="DesiredMajor"
            id="DesiredMajor"
            value={DesiredMajor}
            onChange={handleDesiredMajorChange}
            className="w-full py-2 px-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddJob;
