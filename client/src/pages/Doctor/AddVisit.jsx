import React, { useState } from "react";
import "../../style/DoctorFunction/AddVisit.scss";

const AddVisit = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [medications, setMedications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allMedicines, setAllMedicines] = useState([
    { id: 1, name: "Aspirin" },
    { id: 2, name: "Paracetamol" },
    { id: 3, name: "Ibuprofen" },
  ]);

  const handleAddMedication = (medication) => {
    const exists = medications.some((med) => med.id === medication.id);
    if (!exists) {
      setMedications([
        ...medications,
        { ...medication, quantity: 1, dosage: "" },
      ]);
    }
  };

  const updateMedication = (id, field, value) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, [field]: value } : med
      )
    );
  };

  const handleSave = () => {
    const visitData = {
      symptoms,
      diagnosis,
      treatmentPlan,
      medications,
    };
    console.log("Data to save:", visitData);
  };

  return (
    <div className="add-visit">
      <h2>Add Visit and Prescription</h2>
      <div className="visit-form">
        <div className="input-group">
          <label>Symptoms</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Diagnosis</label>
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Treatment Plan</label>
          <textarea
            value={treatmentPlan}
            onChange={(e) => setTreatmentPlan(e.target.value)}
          />
        </div>
      </div>

      <div className="medication-section">
        <h3>Medications</h3>
        <div className="medication-search">
          <input
            type="text"
            placeholder="Search medicine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-results">
            {allMedicines
              .filter((med) =>
                med.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((med) => (
                <button
                  key={med.id}
                  onClick={() => handleAddMedication(med)}
                  className="search-item"
                >
                  {med.name}
                </button>
              ))}
          </div>
        </div>

        <div className="medication-list">
          {medications.map((med) => (
            <div key={med.id} className="medication-item">
              <span>{med.name}</span>
              <input
                type="number"
                placeholder="Quantity"
                value={med.quantity}
                onChange={(e) =>
                  updateMedication(med.id, "quantity", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Dosage"
                value={med.dosage}
                onChange={(e) =>
                  updateMedication(med.id, "dosage", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>

      <button className="save-button" onClick={handleSave}>
        Save Visit
      </button>
    </div>
  );
};

export default AddVisit;
