import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function GetJobs() {
  const [listOfMajors, setListOfMajors] = useState([]);
  const [listOfJobs, setListOfJobs] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(listOfMajors[0]);
  const nav = useNavigate();

  let goHome = () => {
    nav("/");
  };

  useEffect(() => {
    axios.get("/api/getdesiredmajors").then((response) => {
      if (response.status === 200 && response.data) {
        setListOfMajors(["All", ...response.data]);
        setSelectedMajor("All");
        //setListOfMajors(response.data);
        //setSelectedMajor(response.data[0]);
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
      .post("/api/getjobsbymajor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data) {
          setListOfJobs(response.data);
        } else {
          toast.error("Could not get jobs");
        }
      });
  };
  return (
    <div className="container mx-auto my-8">
      <h1 className="font-bold text-4xl mb-4">
        List all jobs for a specific major
      </h1>
      <form
        className="border-2 border-gray-300 p-4 rounded-md"
        onSubmit={handleSubmit}
      >
        <label htmlFor="major" className="block font-medium mb-2">
          Select desired major
        </label>
        <select
          className="p-2 rounded-md bg-gray-200 mb-4"
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
          className="bg-blue-600 text-white py-2 px-4 rounded-md"
          type="submit"
        >
          Submit
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md"
          onClick={goHome}
        >
          Home
        </button>
      </form>
      {listOfJobs.length > 0 && (
        <div className="mt-6">
          <h2 className="font-bold text-2xl mb-2">
            Jobs with {selectedMajor} major:
          </h2>
          <ul className="list-disc list-inside">
            {listOfJobs.map((job, index) => (
              <li key={index} className="text-lg">
                {job}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetJobs;
