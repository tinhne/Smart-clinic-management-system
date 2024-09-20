require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/mongoDB"); // Đảm bảo file này tồn tại
const app = express();
const port = process.env.PORT || 8888;

// config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// Start server and connect to MongoDB
(async () => {
    try {
        // Kết nối MongoDB
        await connectDB();

        // Lắng nghe port
        app.listen(port, () => {
            console.log(`Backend Node.js App listening on port ${port}`);
        });
    } catch (error) {
        console.log(">>> Error connect to DB: ", error);
    }
})();
