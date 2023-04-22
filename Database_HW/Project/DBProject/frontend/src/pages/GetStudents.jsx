import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function GetStudents() {
  const [listOfMajors, setListOfMajors] = useState([]);

  useEffect(() => {
    axios.get("/api/getmajors").then((response) => {
      if (response.status === 200 && response.data) {
        setListOfMajors(response.data);
      } else {
        toast.error("Could not get majors");
      }
    });
  }, []);

  let handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1 className="font-bold font-sans text-3xl">
        List all students with a specific major
      </h1>
      <form className="border-2 border-black" onSubmit={handleSubmit}>
        {/* I want to  */}
        <label htmlFor="major">Select major</label>
        <select className="p-4 m-2">
          {listOfMajors.map((major, index) => (
            <option
              key={index}
              className="p-2 text-black bg-blue-200"
              value={major}
            >
              {major}
            </option>
          ))}
        </select>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default GetStudents;
