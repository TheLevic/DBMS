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
        setListOfMajors(["All", ...response.data]);
        setSelectedMajor("All");
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
    <div className="container mx-auto my-8">
      <h1 className="font-bold text-4xl mb-4">
        List all students with a specific major
      </h1>
      <form
        className="border-2 border-gray-300 p-4 rounded-md"
        onSubmit={handleSubmit}
      >
        <label htmlFor="major" className="block font-bold mb-2">
          Select major:
        </label>
        <select
          className="border-2 border-gray-300 p-2 rounded-md mb-4"
          value={selectedMajor}
          onChange={(event) => {
            setSelectedMajor(event.target.value);
          }}
        >
          {listOfMajors.map((major, index) => (
            <option key={index} value={major}>
              {major}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      {listOfStudents.length > 0 && (
        <div className="mt-8">
          <h2 className="font-bold text-xl mb-4">
            Students with {selectedMajor} major:
          </h2>
          <ul className="list-disc list-inside">
            {listOfStudents.map((student, index) => (
              <li key={index} className="mb-2">
                {student}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetStudents;
