// routes/scheduleRoutes.js
const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");

// Tạo lịch cho bác sĩ (chỉ cho admin)
router.post("/create", authenticate,authorize(["admin"]), scheduleController.createSchedule);

// Lấy lịch làm việc của bác sĩ
router.get("/:doctorId",authenticate ,authorize(["doctor", "admin"]), scheduleController.getScheduleByDoctor);

module.exports = router;
