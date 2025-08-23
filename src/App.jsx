import "./App.css";
import RegistrationPage from "./pages/auth/RegistrationPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route
          path="/dashboard/super-admin"
          element={<SuperAdminDashboard />}
        />

        <Route path="/roles" element={<h1>Roles Management</h1>} />
        <Route path="/pets" element={<h1>Pet & Owner Management</h1>} />
        <Route path="/appointments" element={<h1>Appointment Scheduling</h1>} />
        <Route path="/records" element={<h1>Medical Records</h1>} />
        <Route path="/pharmacy" element={<h1>Pharmacy & Inventory</h1>} />
        <Route path="/billing" element={<h1>Billing & Payments</h1>} />
        <Route path="/staff" element={<h1>Staff & Doctor Management</h1>} />
        <Route path="/hospital" element={<h1>Hospital Management</h1>} />
        <Route path="/reports" element={<h1>Reports & Analytics</h1>} />
        <Route path="/notifications" element={<h1>Notifications</h1>} />
        <Route path="/public" element={<h1>Public Website</h1>} />
        <Route path="/reception" element={<h1>Reception & Front Office</h1>} />
        <Route path="/content" element={<h1>Content & Education</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
