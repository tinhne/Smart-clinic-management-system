// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./config/mongoDB");
const seedAdmin = require("./seeders/seedAdmin");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const BlogRoutes = require("./routes/BlogRouter")
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Kết nối database
connection();

// Seed Admin
seedAdmin();

// CORS
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/blog", BlogRoutes);

// Khởi tạo server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
