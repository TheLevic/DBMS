import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function GetStudents() {
  const [listOfMajors, setListOfMajors] = useState([]);
  const [listOfStudents, setListOfStudents] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(listOfMajors[0]);

  useEffect(() => {
    axios.get("/api/getmajors").then((response) => {
      if (response.status === 200 && response.data) {
        setListOfMajors(response.data);
        setSelectedMajor(response.data[0]);
      } else {
        toast.error("Could not get majors");
      }
    });
  }, []);

  let handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("Major", selectedMajor);
    axios
      .post("/api/getstudentsbymajor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data) {
          setListOfStudents(response.data);
        } else {
          toast.error("Could not get students");
        }
      });
  };

  return (
    <div>
      <h1 className="font-bold font-sans text-3xl">
        List all students with a specific major
      </h1>
      <form className="border-2 border-black" onSubmit={handleSubmit}>
        <label htmlFor="major">Select major</label>
        <select
          className="p-4 m-2"
          value={selectedMajor}
          onChange={(event) => {
            setSelectedMajor(event.target.value);
          }}
        >
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
      {listOfStudents.length > 0 && (
        <div>
          <h2>Students with {selectedMajor} major:</h2>
          <ul>
            {listOfStudents.map((student, index) => (
              <li key={index}>{student}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetStudents;
