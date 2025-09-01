import React, { useState } from "react";
import DoctorDashboard from "./dashboard/DoctorDashboard.jsx";

export default function TreatmentsList({ patients }) {
  const [treatments, setTreatments] = useState([]);
  const [formData, setFormData] = useState({});
  const [modalType, setModalType] = useState(null); // add, edit, view
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [fileUploadTime, setFileUploadTime] = useState(null);

  const resetForm = () => {
    setFormData({});
    setFileUploadTime(null);
    setSelectedTreatment(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files.length > 0) {
      setFormData({ ...formData, file: files[0] });
      setFileUploadTime(new Date().toLocaleString());
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAdd = () => {
    resetForm();
    setModalType("add");
  };

  const handleEdit = (treatment) => {
    setFormData(treatment);
    setFileUploadTime(treatment.fileUploadTime || null);
    setSelectedTreatment(treatment);
    setModalType("edit");
  };

  const handleView = (treatment) => {
    setSelectedTreatment(treatment);
    setModalType("view");
  };

  const handleDelete = (id) => {
    setTreatments(treatments.filter((t) => t.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "add") {
      const newTreatment = {
        ...formData,
        id: formData.id,
        addedAt: new Date().toLocaleString(),
        fileUploadTime: fileUploadTime || null,
      };
      setTreatments([...treatments, newTreatment]);
    } else if (modalType === "edit") {
      const updatedTreatments = treatments.map((t) =>
        t.id === selectedTreatment.id
          ? { ...formData, fileUploadTime: fileUploadTime || t.fileUploadTime }
          : t
      );
      setTreatments(updatedTreatments);
    }
    setModalType(null);
    resetForm();
  };

  return (
    <DoctorDashboard>
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Doctor Portal - Treatments List
        </h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            + Add Treatment
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border rounded-lg shadow-md text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Patient</th>
                <th className="p-2 border">Added At</th>
                <th className="p-2 border">File Uploaded</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {treatments.map((treatment) => (
                <tr
                  key={treatment.id}
                  className="text-center hover:bg-gray-100"
                >
                  <td className="p-2 border">{treatment.id}</td>
                  <td className="p-2 border">{treatment.name}</td>
                  <td className="p-2 border">{treatment.patient}</td>
                  <td className="p-2 border">{treatment.addedAt}</td>
                  <td className="p-2 border">
                    {treatment.fileUploadTime || "N/A"}
                  </td>
                  <td className="p-2 border space-x-1 sm:space-x-2">
                    <button
                      onClick={() => handleView(treatment)}
                      className="bg-gray-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-gray-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(treatment)}
                      className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-green-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(treatment.id)}
                      className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {treatments.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-gray-500">
                    No treatments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="grid gap-4 md:hidden">
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className="bg-white border rounded-lg p-4 shadow text-sm"
            >
              <p>
                <strong>ID:</strong> {treatment.id}
              </p>
              <p>
                <strong>Name:</strong> {treatment.name}
              </p>
              <p>
                <strong>Patient:</strong> {treatment.patient}
              </p>
              <p>
                <strong>Added At:</strong> {treatment.addedAt}
              </p>
              <p>
                <strong>File Uploaded:</strong>{" "}
                {treatment.fileUploadTime || "N/A"}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleView(treatment)}
                  className="flex-1 bg-gray-500 text-white py-1 rounded text-xs hover:bg-gray-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(treatment)}
                  className="flex-1 bg-green-600 text-white py-1 rounded text-xs hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(treatment.id)}
                  className="flex-1 bg-red-600 text-white py-1 rounded text-xs hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {treatments.length === 0 && (
            <p className="text-gray-500 text-center">No treatments found.</p>
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
                    <strong>Patient:</strong> {selectedTreatment.patient}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {selectedTreatment.description}
                  </p>
                  <p>
                    <strong>Added At:</strong> {selectedTreatment.addedAt}
                  </p>
                  {selectedTreatment.fileUploadTime && (
                    <p>
                      <strong>File Uploaded:</strong>{" "}
                      {selectedTreatment.fileUploadTime}
                    </p>
                  )}
                  {selectedTreatment.file && (
                    <p>
                      <strong>File:</strong> {selectedTreatment.file.name}
                    </p>
                  )}
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => {
                        setModalType(null);
                        resetForm();
                      }}
                      className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                    >
                      Close
                    </button>
                  </div>
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

                  {/* Patient Dropdown */}
                  <div>
                    <label className="block font-medium">Patient</label>
                    {patients && patients.length > 0 ? (
                      <select
                        name="patient"
                        value={formData.patient || ""}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 mt-1"
                        required
                      >
                        <option value="">Select Patient</option>
                        {patients.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-red-500 text-sm">
                        No patients available. Add patients first.
                      </p>
                    )}
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

                  <div>
                    <label className="block font-medium">Upload File</label>
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      className="w-full border mt-1"
                    />
                    {fileUploadTime && (
                      <p className="text-xs text-gray-500 mt-1">
                        File Uploaded At: {fileUploadTime}
                      </p>
                    )}
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
