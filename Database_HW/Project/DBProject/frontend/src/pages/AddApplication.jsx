import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddApplication() {
  const [listOfStudents, setListOfStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [listOfJobs, setListOfJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");

  //useEffect to get all students and all jobs from the backend
  useEffect(() => {
    let formData = new FormData();
    formData.append("Major", "All");
    axios.post("/api/getstudentsbymajor", formData).then((res) => {
      if (res.status === 200 && res.data) {
        setListOfStudents(res.data);
        return;
      } else {
        toast.error("Error getting students");
        return;
      }
    });
  }, []);

  useEffect(() => {
    if (listOfStudents.length > 0) {
      setSelectedStudent(listOfStudents[0]);
    }
  }, [listOfStudents]);

  useEffect(() => {
    const formData = new FormData();
    formData.append("Major", "All");
    axios.post("/api/getjobsbymajor", formData).then((res) => {
      if (res.status === 200 && res.data) {
        setListOfJobs(res.data);
        return;
      } else {
        toast.error("Error getting jobs");
        return;
      }
    });
  }, []);

  useEffect(() => {
    if (listOfJobs.length > 0) {
      setSelectedJob(listOfJobs[0]);
    }
  }, [listOfJobs]);

  let handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto max-w-md mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-xl font-bold mb-4">Add Application</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="students" className="font-bold block mb-2">
            Select a student:
          </label>
          <select
            id="students"
            name="students"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {listOfStudents.map((student, index) => (
              <option key={index}>{student}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="jobs" className="font-bold block mb-2">
            Select a job:
          </label>
          <select
            id="jobs"
            name="jobs"
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {listOfJobs.map((job, index) => (
              <option key={index}>{job}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddApplication;
