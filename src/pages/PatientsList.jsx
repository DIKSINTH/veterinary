import React, { useState } from "react";
import DoctorDashboard from "./dashboard/DoctorDashboard.jsx";

const PatientsList = ({ patients, setPatients }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [formData, setFormData] = useState({
    id: null,
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
      setFormData({
        id: patient.id,
        name: patient.name,
        breed: patient.breed,
        age: patient.age,
        condition: patient.condition,
        ownername: patient.ownername,
      });
    } else {
      setFormData({
        id: null,
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
      const newPatient = {
        id: Date.now(),
        ...formData,
      };
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
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Doctor Portal - Patient List
        </h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => openModal("add")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Patient
          </button>
        </div>

        {/* Patient Table */}
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Breed</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Condition</th>
                <th className="p-2 border">Owner Name</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="text-center hover:bg-gray-100">
                  <td className="p-2 border">{patient.id}</td>
                  <td className="p-2 border">{patient.name}</td>
                  <td className="p-2 border">{patient.breed}</td>
                  <td className="p-2 border">{patient.age}</td>
                  <td className="p-2 border">{patient.condition}</td>
                  <td className="p-2 border">{patient.ownername}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => openModal("view", patient)}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openModal("edit", patient)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-gray-500">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl shadow-lg w-11/12 sm:w-1/2 p-6 relative">
              <h2 className="text-xl font-bold mb-4 capitalize">
                {modalType} Patient
              </h2>

              {/* View Mode */}
              {modalType === "view" ? (
                <div>
                  <p>
                    <strong>Id:</strong> {formData.id}
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
                    <strong>Owner Name:</strong> {formData.ownername}
                  </p>
                  <div className="mt-4 text-right">
                    <button
                      onClick={closeModal}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                // Add/Edit Form
                <div>
                  <div className="mb-3">
                    <label className="block font-medium">Id</label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium">Breed</label>
                    <input
                      type="text"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium">Condition</label>
                    <input
                      type="text"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium">Owner Name</label>
                    <input
                      type="text"
                      name="ownername"
                      value={formData.ownername}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={closeModal}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
