import React, { useState } from "react";
import { Link } from "react-router-dom";

const DoctorDashboard = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-blue-700 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <h1 className="text-2xl font-bold text-center">Doctor Portal</h1>
        <nav className="flex flex-col space-y-2 mt-6">
          <Link
            to="/dashboard/doctordashboard"
            className="block px-4 py-2 hover:bg-blue-600 rounded"
          >
            Dashboard
          </Link>
          <Link
            to="/patientslist"
            className="block px-4 py-2 hover:bg-blue-600 rounded"
          >
            Patients
          </Link>
          <Link
            to="/treatmentslist"
            className="block px-4 py-2 hover:bg-blue-600 rounded"
          >
            Treatments
          </Link>
          <Link
            to="/appointments"
            className="block px-4 py-2 hover:bg-blue-600 rounded"
          >
            Appointments
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 hover:bg-blue-600 rounded"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center md:hidden">
          <h1 className="text-lg font-bold">Doctor Portal</h1>
          <button
            className="bg-blue-500 px-3 py-2 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-grow bg-gray-50 p-4">{children}</main>

        {/* Footer */}
        <footer className="bg-blue-700 text-white p-4 text-center">
          © {new Date().getFullYear()} Doctor Portal. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default DoctorDashboard;
