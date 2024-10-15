const express = require("express");
const {
  createDoctor,
  getUserById,
  getAllUserByRole,
  updateUser,
  deleteUser,
} = require("../controllers/adminController");
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");
const router = express.Router();
// Tạo tài khoản (admin only)
router.post("/create-doctor", authenticate, authorize(["admin"]), createDoctor);

// Lấy thông tin người dùng theo ID (admin only)
router.get("/users/:id", authenticate, authorize(["admin"]), getUserById);

// Lấy tất cả người dùng theo vai trò (admin only)
router.get(
  "/users",
  authenticate,
  authorize(["admin", "doctor"]),
  getAllUserByRole
);

// Cập nhật thông tin người dùng 
router.put("/edit-users/:id", authenticate, updateUser);

// Xóa người dùng (admin only)
router.delete("/delete-users/:id", authenticate, authorize(["admin"]), deleteUser);




module.exports = router;
