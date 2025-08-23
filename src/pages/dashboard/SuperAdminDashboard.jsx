import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  ClipboardList,
  Pill,
  FileText,
  DollarSign,
  BarChart3,
  Bell,
  Globe,
  Home,
  BookOpen,
} from "lucide-react"; // install lucide-react for icons (npm i lucide-react)

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  const modules = [
    { name: "Authentication & Roles", icon: Users, path: "/roles" },
    { name: "Pet & Owner Management", icon: Home, path: "/pets" },
    { name: "Appointment Scheduling", icon: Calendar, path: "/appointments" },
    {
      name: "Medical Records & Treatment",
      icon: ClipboardList,
      path: "/records",
    },
    { name: "Pharmacy & Inventory", icon: Pill, path: "/pharmacy" },
    { name: "Billing & Payments", icon: DollarSign, path: "/billing" },
    { name: "Staff & Doctor Management", icon: Users, path: "/staff" },
    { name: "Hospital Management", icon: Globe, path: "/hospital" },
    { name: "Reports & Analytics", icon: BarChart3, path: "/reports" },
    {
      name: "Communication & Notifications",
      icon: Bell,
      path: "/notifications",
    },
    { name: "Public Website Features", icon: Globe, path: "/public" },
    { name: "Reception & Front Office", icon: Home, path: "/reception" },
    { name: "Content & Education", icon: BookOpen, path: "/content" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-sky-700">
          Super Admin Dashboard
        </h1>
        <p className="text-gray-600">Manage hospital system modules</p>
      </div>

      {/* Grid of Modules */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod, idx) => (
          <div
            key={idx}
            onClick={() => navigate(mod.path)}
            className="cursor-pointer bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-lg hover:bg-sky-50 transition"
          >
            <mod.icon className="h-6 w-6 text-sky-600 mb-3" />
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              {mod.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
