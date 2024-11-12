import React, { useState, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./AddVisit.scss";

// Reducer for managing medications state
const medicationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MEDICATION":
      return [...state, { ...action.payload, quantity: 1, dosage: "" }];
    case "UPDATE_MEDICATION":
      return state.map((med) =>
        med.id === action.payload.id
          ? { ...med, [action.payload.field]: action.payload.value }
          : med
      );
    default:
      return state;
  }
};

const AddVisitModal = ({ show, onClose, saveVisit, selectedRecord }) => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Using reducer for managing medications
  const [medications, dispatch] = useReducer(medicationReducer, []);
  
  const allMedicines = useMemo(
    () => [
      { id: 1, name: "Aspirin" },
      { id: 2, name: "Paracetamol" },
      { id: 3, name: "Ibuprofen" },
    ],
    []
  );

  // Add medication to the list
  const handleAddMedication = (medication) => {
    if (!medications.some((med) => med.id === medication.id)) {
      dispatch({ type: "ADD_MEDICATION", payload: medication });
    }
  };

  // Update quantity or dosage of a medication
  const updateMedication = (id, field, value) => {
    dispatch({ type: "UPDATE_MEDICATION", payload: { id, field, value } });
  };

  // Handle form submission and save visit data
  const handleSave = () => {
    const visitData = { 
      patient_id: selectedRecord.patient_id,
      symptoms, 
      diagnosis, 
      treatmentPlan, 
      medications 
    };
    saveVisit(visitData);  // Lưu bệnh án
    onClose();  // Đóng modal
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Visit and Prescription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="symptoms">
            <Form.Label>Symptoms</Form.Label>
            <Form.Control
              as="textarea"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="diagnosis">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              as="textarea"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="treatmentPlan">
            <Form.Label>Treatment Plan</Form.Label>
            <Form.Control
              as="textarea"
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Label>Medications</Form.Label>
              <ul>
                {medications.map((med) => (
                  <li key={med.id}>
                    <span>{med.name}</span>
                    <input
                      type="number"
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
                  </li>
                ))}
              </ul>
              <Form.Control
                type="text"
                placeholder="Search for medication"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ul>
                {allMedicines
                  .filter((med) =>
                    med.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((med) => (
                    <li key={med.id}>
                      <Button
                        onClick={() => handleAddMedication(med)}
                        variant="outline-primary"
                      >
                        Add {med.name}
                      </Button>
                    </li>
                  ))}
              </ul>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Visit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddVisitModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  saveVisit: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object.isRequired,
};

export default AddVisitModal;