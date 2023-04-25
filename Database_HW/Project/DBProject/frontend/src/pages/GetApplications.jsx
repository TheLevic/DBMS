import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function GetApplications() {
  const [listOfMajors, setListOfMajors] = useState([]);
  const [listOfStudents, setListOfStudents] = useState([]);
  const [listOfJobs, setListOfJobs] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [listOfApplications, setListOfApplications] = useState([]);
  const [fullApplicationList, setFullApplicationList] = useState([]);

  useEffect(() => {
    axios.get("/api/getdesiredmajors").then((response) => {
      if (response.status === 200 && response.data) {
        setListOfMajors(["empty", ...response.data]);
        setSelectedMajor("empty");
      } else {
        toast.error("Could not get majors");
      }
    });
  }, []);

  useEffect(() => {
    axios.get("/api/getstudentlist").then((response) => {
      if (response.status === 200 && response.data) {
        setListOfStudents(["empty", ...response.data]);
        setSelectedStudent("empty");
      } else {
        toast.error("Could not get majors");
      }
    });
  }, []);

  useEffect(() => {
    axios.get("/api/getjoblist").then((response) => {
      if (response.status === 200 && response.data) {
        setListOfJobs(["empty", ...response.data]);
        setSelectedJob("empty");
      } else {
        toast.error("Could not get majors");
      }
    });
  }, []);

  let handleSubmit = (event) => {
    event.preventDefault();
    // We want to append all selected values to the form data
    let formData = new FormData();
    if (selectedMajor) {
      formData.append("major", selectedMajor);
    }
    if (selectedStudent) {
      formData.append("student", selectedStudent);
    }
    if (selectedJob) {
      formData.append("job", selectedJob);
    }

    axios.post("/api/getapplications", formData).then((response) => {
      if (response.status === 200 && response.data) {
        setListOfApplications(response.data);
      } else {
        toast.error("Could not get application info");
      }
    });
  };

  let handleViewAll = (event) => {
    event.preventDefault();
    axios.get("/api/getapplicationlist").then((response) => {
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
            Select desired major of company
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
            type="submit"
            onClick={handleViewAll}
          >
            View All
          </button>
        </div>
      </form>
      {listOfApplications.length > 0 && (
        <div className="mt-6">
          <h2 className="font-bold text-2xl mb-2">List of Applications:</h2>
          <table className="border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-gray-600 p-2">Student</th>
                <th className="border border-gray-600 p-2">Student's Major</th>
                <th className="border border-gray-600 p-2">Company</th>
                <th className="border border-gray-600 p-2">Salary</th>
              </tr>
            </thead>
            <tbody>
              {listOfApplications.map((application, index) => (
                <tr key={index}>
                  <td className="border border-gray-600 p-2">
                    {application.STUDENTNAME}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {application.MAJOR}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {application.COMPANYNAME}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {application.SALARY}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GetApplications;
