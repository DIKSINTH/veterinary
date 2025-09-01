import React, { useState } from "react";
import DoctorDashboard from "./dashboard/DoctorDashboard.jsx";

export default function TreatmentsList({
  patients,
  treatments,
  setTreatments,
}) {
  const [formData, setFormData] = useState({});
  const [modalType, setModalType] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  // Reset form
  const resetForm = () => {
    setFormData({});
    setSelectedTreatment(null);
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add treatment
  const handleAdd = () => {
    resetForm();
    setModalType("add");
  };

  // Edit treatment
  const handleEdit = (treatment) => {
    setFormData(treatment);
    setSelectedTreatment(treatment);
    setModalType("edit");
  };

  // View treatment
  const handleView = (treatment) => {
    setSelectedTreatment(treatment);
    setModalType("view");
  };

  // Delete treatment
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this treatment?")) {
      setTreatments(treatments.filter((t) => t.id !== id));
      alert("✅ Treatment deleted successfully!");
    }
  };

  // Submit form (Add/Edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalType === "add") {
      // Ensure unique ID
      const idExists = treatments.some((t) => t.id === formData.id);
      if (idExists) {
        alert("⚠️ Treatment ID must be unique. Please use another ID.");
        return;
      }

      const newTreatment = {
        ...formData,
        addedAt: new Date().toLocaleString(),
      };
      setTreatments([...treatments, newTreatment]);
      alert("✅ Treatment added successfully!");
    } else if (modalType === "edit") {
      const updatedTreatments = treatments.map((t) =>
        t.id === selectedTreatment.id ? { ...formData } : t
      );
      setTreatments(updatedTreatments);
      alert("✅ Treatment updated successfully!");
    }

    setModalType(null);
    resetForm();
  };

  return (
    <DoctorDashboard>
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Treatments List
        </h1>

        {/* Add Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
          >
            + Add Treatment
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-sm sm:text-base border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Patient</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Added At</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {treatments.length > 0 ? (
                treatments.map((t) => (
                  <tr key={t.id} className="text-center hover:bg-gray-50">
                    <td className="p-2 border">{t.id}</td>
                    <td className="p-2 border">{t.name}</td>
                    <td className="p-2 border">
                      {patients.find((p) => p.id === t.patientId)?.name ||
                        "Unknown"}
                    </td>
                    <td className="p-2 border">{t.description}</td>
                    <td className="p-2 border">{t.addedAt}</td>
                    <td className="p-2 border">
                      <div className="flex flex-wrap gap-2 justify-center">
                        <button
                          onClick={() => handleView(t)}
                          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-xs"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(t)}
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-gray-500 text-center">
                    No treatments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden space-y-3">
          {treatments.length > 0 ? (
            treatments.map((t) => (
              <div
                key={t.id}
                className="bg-white p-4 rounded-lg shadow flex flex-col space-y-2"
              >
                <p>
                  <strong>ID:</strong> {t.id}
                </p>
                <p>
                  <strong>Name:</strong> {t.name}
                </p>
                <p>
                  <strong>Patient:</strong>{" "}
                  {patients.find((p) => p.id === t.patientId)?.name ||
                    "Unknown"}
                </p>
                <p>
                  <strong>Description:</strong> {t.description}
                </p>
                <p>
                  <strong>Added At:</strong> {t.addedAt}
                </p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleView(t)}
                    className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-xs"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(t)}
                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No treatments found.</p>
          )}
        </div>

        {/* Modal */}
        {modalType && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-3">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-5 relative">
              <h2 className="text-lg sm:text-xl font-bold mb-4 capitalize">
                {modalType} Treatment
              </h2>

              {modalType === "view" ? (
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>ID:</strong> {selectedTreatment.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {selectedTreatment.name}
                  </p>
                  <p>
                    <strong>Patient:</strong>{" "}
                    {
                      patients.find((p) => p.id === selectedTreatment.patientId)
                        ?.name
                    }
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {selectedTreatment.description}
                  </p>
                  <p>
                    <strong>Added At:</strong> {selectedTreatment.addedAt}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                  <div>
                    <label className="block font-medium">Treatment ID</label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      disabled={modalType === "edit"}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Treatment Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      required
                    />
                  </div>

                  {/* Patient dropdown */}
                  <div>
                    <label className="block font-medium">Patient</label>
                    <select
                      name="patientId"
                      value={formData.patientId || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      required
                    >
                      <option value="">Select Patient</option>
                      {patients.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                      name="description"
                      value={formData.description || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setModalType(null);
                        resetForm();
                      }}
                      className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      {modalType === "add" ? "Add" : "Update"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </DoctorDashboard>
  );
}
