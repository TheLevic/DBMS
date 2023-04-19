import React from "react";

function AddStudent() {
  const [Name, setName] = React.useState("");
  const [StudentID, setStudentID] = React.useState(0);
  const [Major, setMajor] = React.useState("");

  let handleStudentIDChange = (e) => {
    setStudentID(e.target.value);
  };

  let handleNameChange = (e) => {
    setName(e.target.value);
  };

  let handleMajorChange = (e) => {
    setMajor(e.target.value);
  };

  return (
    <div>
      <form>
        <label htmlFor="StudentID">StudentID</label>
        <input
          type="number"
          name="StudentID"
          id="StudentID"
          value={StudentID}
          onChange={handleStudentIDChange}
          className="text-black bg-blue-200 rounded-md p-2"
        />
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={Name}
          onChange={handleNameChange}
          className="text-black bg-blue-200 rounded-md p-2"
        />

        <label htmlFor="Major">Major</label>
        <input
          className="bg-blue-200 rounded-md p-2"
          type="text"
          name="Major"
          id="Major"
          value={Major}
          onChange={handleMajorChange}
        />
      </form>
    </div>
  );
}

export default AddStudent;
