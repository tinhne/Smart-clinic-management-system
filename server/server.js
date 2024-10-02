require('dotenv').config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoDB");
const seedAdmin = require("./seeders/seedAdmin");
dotenv.config();
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
connectDB();

// Seed Admin
seedAdmin();
// Enable All CORS Requests
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);


// Khoi tao server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});