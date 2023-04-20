import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import AddStudent from "./pages/AddStudent";
import AddJob from "./pages/AddJob";
import AddApplication from "./pages/AddApplication";

function App() {
  return (
    <div>
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
