import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const nav = useNavigate();
  let handleClickAddStudent = () => {
    nav("/addstudent");
  };
  return (
    <div className="flex align-middle items-center justify-evenly">
      <button onClick={handleClickAddStudent} className="btn">
        Add Student
      </button>
      <button className="btn">Add Job</button>
      <button className="btn">Add Application</button>
    </div>
  );
}

export default Header;
