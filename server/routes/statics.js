const express = require("express");
const router = express.Router();
const appointmentController= require("../controllers/statics")
router.get("/count-by-specialties", appointmentController.getAppointmentCountBySpecialties);

module.exports = router;