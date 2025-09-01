import React, { useState } from "react";
import DoctorDashboard from "./dashboard/DoctorDashboard.jsx";

const PatientsList = ({ patients, setPatients, treatments }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    breed: "",
    age: "",
    condition: "",
    ownername: "",
  });

  const openModal = (type, patient = null) => {
    setModalType(type);
    setSelectedPatient(patient);

    if (type === "edit" || type === "view") {
      setFormData({ ...patient });
    } else {
      setFormData({
        id: "",
        name: "",
        breed: "",
        age: "",
        condition: "",
        ownername: "",
      });
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (modalType === "add") {
      const newPatient = { ...formData };
      setPatients([...patients, newPatient]);
    } else if (modalType === "edit") {
      setPatients(
        patients.map((p) =>
          p.id === selectedPatient.id ? { ...p, ...formData } : p
        )
      );
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  return (
    <DoctorDashboard>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
          Patient List
        </h1>

        {/* Add Patient Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => openModal("add")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
          >
            + Add Patient
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-sm sm:text-base border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Breed</th>
                <th className="p-3 border">Age</th>
                <th className="p-3 border">Condition</th>
                <th className="p-3 border">Owner</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <tr key={patient.id} className="text-center hover:bg-gray-50">
                    <td className="p-2 border">{patient.id}</td>
                    <td className="p-2 border">{patient.name}</td>
                    <td className="p-2 border">{patient.breed}</td>
                    <td className="p-2 border">{patient.age}</td>
                    <td className="p-2 border">{patient.condition}</td>
                    <td className="p-2 border">{patient.ownername}</td>
                    <td className="p-2 border">
                      <div className="flex flex-wrap gap-2 justify-center">
                        <button
                          onClick={() => openModal("view", patient)}
                          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-xs"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openModal("edit", patient)}
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(patient.id)}
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
                  <td colSpan="7" className="p-4 text-gray-500 text-center">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
              <h2 className="text-lg sm:text-xl font-bold mb-4 capitalize text-gray-800">
                {modalType} Patient
              </h2>

              {modalType === "view" ? (
                <div className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <p>
                    <strong>ID:</strong> {formData.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Breed:</strong> {formData.breed}
                  </p>
                  <p>
                    <strong>Age:</strong> {formData.age}
                  </p>
                  <p>
                    <strong>Condition:</strong> {formData.condition}
                  </p>
                  <p>
                    <strong>Owner:</strong> {formData.ownername}
                  </p>

                  {/* Treatments list */}
                  <div className="mt-4">
                    <strong>Treatments:</strong>
                    {treatments.filter((t) => t.patientId === formData.id)
                      .length > 0 ? (
                      <ul className="list-disc ml-6 mt-2 space-y-1">
                        {treatments
                          .filter((t) => t.patientId === formData.id)
                          .map((t) => (
                            <li key={t.id}>
                              {t.name} ({t.description || "No description"})
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 mt-1">No treatments yet.</p>
                    )}
                  </div>

                  <div className="mt-4 text-right">
                    <button
                      onClick={closeModal}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-sm sm:text-base">
                  <div>
                    <label className="block font-medium">Patient ID</label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      required
                      disabled={modalType === "edit"}
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Breed</label>
                    <input
                      type="text"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Condition</label>
                    <input
                      type="text"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Owner</label>
                    <input
                      type="text"
                      name="ownername"
                      value={formData.ownername}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-3">
                    <button
                      onClick={closeModal}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DoctorDashboard>
  );
};

export default PatientsList;
