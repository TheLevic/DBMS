import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function GetApplications() {
  const [listOfMajors, setListOfMajors] = useState([]);
  const [listOfStudents, setListOfStudents] = useState([]);
  const [listOfJobs, setListOfJobs] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(listOfMajors[0]);
  const [selectedStudent, setSelectedStudent] = useState(listOfMajors[0]);
  const [selectedJob, setSelectedJob] = useState(listOfMajors[0]);
  const [listOfApplications, setListOfApplications] = useState([]);

  useEffect(() => {
    axios.get("/api/getdesiredmajors").then((response) => {
      if (response.status === 200 && response.data) {
        setListOfMajors(["", ...response.data]);
        setSelectedMajor("");
      } else {
        toast.error("Could not get majors");
      }
    });
  }, []);

  useEffect(() => {
    axios.get("/api/getstudentlist").then((response) => {
      if (response.status === 200 && response.data) {
        setListOfStudents(["", ...response.data]);
        setSelectedStudent("");
      } else {
        toast.error("Could not get majors");
      }
    });
  }, []);

  useEffect(() => {
    axios.get("/api/getjoblist").then((response) => {
      if (response.status === 200 && response.data) {
        setListOfJobs(["", ...response.data]);
        setSelectedJob("");
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
          setListOfApplications(response.data);
        } else {
          toast.error("Could not get students");
        }
      });
  };

  return (
    <div>
      <h1 className="font-bold font-sans text-3xl">
        Get Applications
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

        <label htmlFor="major">Select student</label>
        <select
          className="p-4 m-2"
          value={selectedStudent}
          onChange={(event) => {
            setSelectedMajor(event.target.value);
          }}
        >
          {listOfStudents.map((student, index) => (
            <option
              key={index}
              className="p-2 text-black bg-blue-200"
              value={student}
            >
              {student}
            </option>
          ))}
        </select>

        <label htmlFor="major">Select job</label>
        <select
          className="p-4 m-2"
          value={selectedJob}
          onChange={(event) => {
            setSelectedJob(event.target.value);
          }}
        >
          {listOfJobs.map((job, index) => (
            <option
              key={index}
              className="p-2 text-black bg-blue-200"
              value={job}
            >
              {job}
            </option>
          ))}
        </select>
        <button className="btn" type="submit">
          Submit
        </button>
        <button className="btn" type="viewAll">
          View All
        </button>
      </form>
      {listOfApplications.length > 0 && (
        <div>
          <h2>Students with {selectedMajor} major:</h2>
          <ul>
            {listOfApplications.map((application, index) => (
              <li key={index}>{application}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetApplications;