const express = require("express");
const {
  createUser,
  getUserById,
  getAllUserByRole,
  updateUser,
  deleteUser,
} = require("../controllers/adminController");
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");
const router = express.Router();
// Tạo tài khoản (admin only)
router.post("/users", authenticate, authorize(["admin"]), createUser);

// Lấy thông tin người dùng theo ID (admin only)
router.get("/users/:id", authenticate, authorize(["admin"]), getUserById);

// Lấy tất cả người dùng theo vai trò (admin only)
router.get("/users", authenticate, authorize(["admin"]), getAllUserByRole);

// Cập nhật thông tin người dùng (admin only)
router.put("/users/:id", authenticate, authorize(["admin"]), updateUser);

// Xóa người dùng (admin only)
router.delete("/users/:id", authenticate, authorize(["admin"]), deleteUser);

module.exports = router;
