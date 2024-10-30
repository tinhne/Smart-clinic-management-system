const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");
const blogController = require("../controllers/BLogController");
router.post(
  "/create-blog",
  authenticate,
  authorize("admin"),
  blogController.createBlog
);
router.get("/get-all-blogs", authenticate, blogController.getAllBlogs);

router.get(
  "/get-blog-by-id/:id",
  authenticate,
  authorize("admin"),
  blogController.getBlogById
);

router.put(
  "/update-blog-by-id/:id",
  authenticate,
  authorize("admin"),
  blogController.updateBlogById
);

router.delete(
  "/delete-blog-by-id/:id",
  authenticate,
  authorize("admin"),
  blogController.deleteBlogById
);

module.exports = router;
