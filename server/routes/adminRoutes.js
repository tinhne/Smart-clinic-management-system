const express = require("express");
const {
  createDoctor,
  getDoctor,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/adminController");
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");

const router = express.Router();

// Tạo tài khoản bác sĩ (chỉ admin)
router.post("/doctors", authenticate, authorize(["admin"]), createDoctor);

// Lấy thông tin bác sĩ theo ID (chỉ admin)
router.get("/doctors/:id", authenticate, authorize(["admin"]), getDoctor);

// Lấy tất cả thông tin bác sĩ (chỉ admin)
router.get("/doctors", authenticate, authorize(["admin"]), getAllDoctors);

// Cập nhật thông tin bác sĩ (chỉ admin)
router.put("/doctors/:id", authenticate, authorize(["admin"]), updateDoctor);

// Xóa bác sĩ (chỉ admin)
router.delete("/doctors/:id", authenticate, authorize(["admin"]), deleteDoctor);

module.exports = router;
