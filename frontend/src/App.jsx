import "./App.css";
import "./index.css";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import {Route,Routes} from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
