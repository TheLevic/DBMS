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

  return (
    <div className="flex align-middle items-center justify-evenly">
      <button onClick={handleClickAddStudent} className="btn">
        Add Student
      </button>
      <button onClick={handleClickAddJob} className="btn">
        Add Job
      </button>
      <button onClick={handleClickAddApplication} className="btn">
        Add Application
      </button>
      <button className="btn" onClick={handleClickGetStudents}>
        Get Students
      </button>
    </div>
  );
}

export default Header;
