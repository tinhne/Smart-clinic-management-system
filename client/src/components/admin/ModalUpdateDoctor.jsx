import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

const ModalEditDoctor = (props) => {
  const { showEditModal, setShowEditModal, selectedUser, fetchDoctors } = props;
  const handleClose = () => setShowEditModal(false);
  useEffect(() => console.log(">>>>>>>>>>>", selectedUser))
  return (
    <>
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh Sửa Người Dùng</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First Name"
                  defaultValue={selectedUser?.first_name || ""}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a first name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last Name"
                  defaultValue={selectedUser?.last_name || ""}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a last name.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  defaultValue={selectedUser?.email || ""}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Phone"
                  defaultValue={selectedUser?.phone || ""}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  defaultValue={selectedUser?.address || ""}
                />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="birthdate">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  required
                  type="date"
                  defaultValue={selectedUser?.birthdate || ""}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid birthdate.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" defaultValue={selectedUser?.gender || ""} required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select a gender.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" defaultValue={selectedUser?.role || "patient"} required>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select a role.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {selectedUser?.role === "doctor" && (
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="specialties">
                  <Form.Label>Specialties</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Specialties"
                    defaultValue={selectedUser?.specialties?.join(", ") || ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide specialties for doctor.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            )}

            <Form.Group className="mb-3" controlId="imageUrl">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" accept="image/*" />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="danger">Xóa</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalEditDoctor.propTypes = {
  showEditModal: PropTypes.bool.isRequired,
  setShowEditModal: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
  fetchDoctors: PropTypes.func.isRequired,
};

export default ModalEditDoctor;
