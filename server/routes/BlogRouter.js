const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");
const blogController = require("../controllers/BLogController");
router.post(
  "/create-blog",
    authenticate,
    authorize(["admin", "doctor"]),
  blogController.createBlog
);

module.exports = router;
