import "./App.css";
import RegistrationPage from "./pages/auth/RegistrationPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import PatientsList from "./pages/PatientsList.jsx";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard.jsx";
import TreatmentsList from "./pages/TreatmentsList.jsx";
import { useState } from "react";

function App() {
  // Global state
  const [patients, setPatients] = useState([]);
  const [treatments, setTreatments] = useState([]); // ✅ new

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/patientslist"
          element={
            <PatientsList patients={patients} setPatients={setPatients} />
          }
        />
        <Route
          path="/dashboard/doctordashboard"
          element={<DoctorDashboard />}
        />
        <Route
          path="/treatmentslist"
          element={
            <TreatmentsList
              patients={patients}
              treatments={treatments} // ✅ pass state
              setTreatments={setTreatments} // ✅ pass setter
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
