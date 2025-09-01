import React, { useState } from "react";
import { Link } from "react-router-dom";

const DoctorDashboard = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-blue-700 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform 
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static transition-transform duration-300 ease-in-out z-40`}
      >
        {/* Logo */}
        <h1 className="text-2xl font-bold text-center">Doctor Portal</h1>

        {/* Nav Links */}
        <nav className="flex flex-col space-y-2 mt-6">
          <Link
            to="/dashboard/doctordashboard"
            className="block px-4 py-2 hover:bg-blue-600 rounded"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/patientslist"
            className="block px-4 py-2 hover:bg-blue-600 rounded"
            onClick={() => setMenuOpen(false)}
          >
            Patients
          </Link>
          <Link
            to="/treatmentslist"
            className="block px-4 py-2 hover:bg-blue-600 rounded"
            onClick={() => setMenuOpen(false)}
          >
            Treatments
          </Link>
          <Link
            to="/appointments"
            className="block px-4 py-2 hover:bg-blue-600 rounded"
            onClick={() => setMenuOpen(false)}
          >
            Appointments
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 hover:bg-blue-600 rounded"
            onClick={() => setMenuOpen(false)}
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header (Mobile & Tab) */}
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center md:hidden shadow">
          <h1 className="text-lg font-bold">Doctor Portal</h1>
          <button
            className="bg-blue-500 px-3 py-2 rounded focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-4">{children}</main>

        {/* Footer */}
        <footer className="bg-blue-700 text-white p-4 text-center mt-auto">
          © {new Date().getFullYear()} Doctor Portal. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default DoctorDashboard;
