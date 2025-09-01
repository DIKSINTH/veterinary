import React, { useState } from "react";
import { NavLink } from "react-router-dom";

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

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2 mt-6">
          <NavLink
            to="/dashboard/doctordashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-600"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/patientslist"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-600"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Patients
          </NavLink>
          <NavLink
            to="/treatmentslist"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-600"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Treatments
          </NavLink>
          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-600"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Appointments
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-600"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Main Layout */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
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
