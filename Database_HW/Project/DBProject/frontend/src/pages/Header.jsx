import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const nav = useNavigate();
  let handleClickAddStudent = () => {
    nav("/addstudent");
  };

  let handleClickAddJob = () => {
    nav("/addjob");
  };

  let handleClickAddApplication = () => {
    nav("/addapplication");
  };

  let handleClickGetStudents = () => {
    nav("/getstudents");
  };

  let handleClickGetJobs = () => {
    nav("/getjobs");
  };

  let handleClickGetApplications = () => {
    nav("/getapplications");
  };

  return (

    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border-2 border-gray-300 rounded-lg p-8 shadow-lg">
        <h1 className="font-bold text-4xl mb-8">Database Application</h1>
        <div className="grid grid-cols-2 gap-8">
          <button
            onClick={handleClickAddStudent}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded"
          >
            Add Student
          </button>
          <button
            onClick={handleClickAddJob}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded"
          >
            Add Job
          </button>
          <button
            onClick={handleClickAddApplication}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded"
          >
            Add Application
          </button>
          <button
            onClick={handleClickGetStudents}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded"
          >
            Get Students
          </button>
          <button
            onClick={handleClickGetJobs}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded"
          >
            Get Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
