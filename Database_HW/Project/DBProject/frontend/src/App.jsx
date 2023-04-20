import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import AddStudent from "./pages/AddStudent";
import AddJob from "./pages/AddJob";
import AddApplication from "./pages/AddApplication";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/addjob" element={<AddJob />} />
          <Route path="/addapplication" element={<AddApplication />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
