require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connection = require("./config/mongoDB");
const seedAdmin = require("./seeders/seedAdmin");
dotenv.config();
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ket noi database
connection();

// Seed Admin
seedAdmin();
// CORS
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);

// Khoi tao server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
