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
    <div className="container mx-auto my-8">
      <h1 className="font-bold font-sans text-3xl mb-4">Get Applications</h1>
      <form
        className="border-2 border-gray-300 p-4 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="major" className="block font-medium mb-2">
            Select major
          </label>
          <select
            className="p-2 rounded-md bg-gray-200"
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
        </div>
        <div className="mb-4">
          <label htmlFor="student" className="block font-medium mb-2">
            Select student
          </label>
          <select
            className="p-2 rounded-md bg-gray-200"
            value={selectedStudent}
            onChange={(event) => {
              setSelectedStudent(event.target.value);
            }}
          >
            {listOfStudents.map((student, index) => (
              <option key={index} value={student}>
                {student}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="job" className="block font-medium mb-2">
            Select job
          </label>
          <select
            className="p-2 rounded-md bg-gray-200"
            value={selectedJob}
            onChange={(event) => {
              setSelectedJob(event.target.value);
            }}
          >
            {listOfJobs.map((job, index) => (
              <option key={index} value={job}>
                {job}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md mr-4"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
            type="viewAll"
          >
            View All
          </button>
        </div>
      </form>
      {listOfApplications.length > 0 && (
        <div className="mt-6">
          <h2 className="font-bold text-2xl mb-2">
            Students with {selectedMajor} major:
          </h2>
          <ul className="list-disc list-inside">
            {listOfApplications.map((application, index) => (
              <li key={index} className="text-lg">
                {application}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetApplications;
