const express = require("express");
const router = express.Router();
const { Register } = require("../controllers/patientController");
// Đăng ký
router.post("/register", Register);
module.exports = router;
