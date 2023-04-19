import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import AddStudent from "./pages/AddStudent";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/addstudent" element={<AddStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
