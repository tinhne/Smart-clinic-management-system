import React, { useEffect, useState, useReducer } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { getMedicines } from "../../services/medicineAPI";
import { addVisitHistory } from "../../utils/MedicalRecord/MedicalRecordService";
import "./AddVisit.scss";

const medicationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MEDICATION":
      return [...state, { ...action.payload }];
    case "UPDATE_MEDICATION":
      return state.map((med) =>
        med.medication_id === action.payload.medication_id
          ? { ...med, [action.payload.field]: action.payload.value }
          : med
      );
    case "REMOVE_MEDICATION":
      return state.filter((med) => med.medication_id !== action.payload.medication_id);
    default:
      return state;
  }
};

const AddVisitModal = ({ show, onClose, selectedRecord }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [medications, dispatch] = useReducer(medicationReducer, []);
  
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("Đơn thuốc cho bệnh nhân");

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const data = await getMedicines(1, 100);
      setMedicines(data.medicines);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleAddMedication = (medication) => {
    const existingMedication = medications.find(med => med.medication_id === medication._id);
    if (!existingMedication) {
      dispatch({ type: "ADD_MEDICATION", payload: { medication_id: medication._id, name: medication.name, quantity: 1, dosage: "" } });
    }
  };

  const handleSave = async () => {
    const visitData = {
      doctorId: selectedRecord.doctor_id,
      symptoms: symptoms,
      diagnosis: diagnosis,
      treatmentPlan: treatmentPlan,
      notes: notes,
      description: description,
      medications: medications.map(med => ({
        medication_name: med.name,
        quantity: med.quantity,
        dosage: med.dosage
      }))
    };

    console.log("Sending visitData:", visitData);

    const response = await addVisitHistory(selectedRecord.patient_id, visitData);
    if (response.success) {
      onClose();
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    console.log("Selected Record:", selectedRecord);
  }, [selectedRecord]);

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
          <Form.Group controlId="notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Col md={12}>
              <Form.Label>Medications</Form.Label>
              <ul className="medication-list">
                {medications.map((med) => (
                  <li key={med.medication_id} className="medication-item">
                    <span>{med.name}</span>
                    <input
                      type="number"
                      min="1"
                      value={med.quantity}
                      onChange={(e) =>
                        dispatch({ type: "UPDATE_MEDICATION", payload: { medication_id: med.medication_id, field: "quantity", value: e.target.value } })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Dosage"
                      value={med.dosage}
                      onChange={(e) =>
                        dispatch({ type: "UPDATE_MEDICATION", payload: { medication_id: med.medication_id, field: "dosage", value: e.target.value } })
                      }
                    />
                    <Button onClick={() => dispatch({ type: "REMOVE_MEDICATION", payload: { medication_id: med.medication_id } })}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
              <Form.Control
                type="text"
                placeholder="Search for medication"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ul className="search-results">
                {medicines
                  .filter((med) => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((med) => (
                    <li key={med._id}>
                      <Button onClick={() => handleAddMedication(med)} variant="outline-primary">
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
  selectedRecord: PropTypes.object.isRequired,
};

export default AddVisitModal;
