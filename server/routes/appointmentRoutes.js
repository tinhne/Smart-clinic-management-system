const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");

// Bệnh nhân đặt lịch hẹn
router.post("/book-appointment", authenticate, appointmentController.BookingAppointment);

// Admin xác nhận lịch hẹn và gửi SMS
router.put("/confirm/:id", authenticate, authorize(["admin"]), appointmentController.confirmAppointment);

// Bệnh nhân hủy lịch hẹn
router.delete("/cancel/:id", authenticate, authorize(["patient"]), appointmentController.cancelAppointment);

// Lấy lịch hẹn cho bác sĩ
router.get("/doctor/:doctorId", authenticate, authorize(["doctor"]), appointmentController.getDoctorAppointments);

// Lấy lịch hẹn của bệnh nhân
router.get("/patient", authenticate, authorize(["patient"]), appointmentController.getPatientAppointments);

router.get('/appointments/:doctorId', appointmentController.checkDoctorSchedule);
module.exports = router;
