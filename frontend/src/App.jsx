import "./App.css";
import "./index.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import VerifyEmail from "./Pages/VerifyEmail";
import { Route , Routes } from "react-router-dom";


function App() {

  return (
    <>
      <Routes>

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

      </Routes>
      
    </>
  );
}

export default App;
