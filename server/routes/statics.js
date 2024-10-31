const express = require("express");
const router = express.Router();
const appointmentController= require("../controllers/statics")
router.get("/count-by-specialties", appointmentController.getAppointmentCountBySpecialties);
router.get('/today/count', appointmentController.getTodayAppointmentCount);

module.exports = router;