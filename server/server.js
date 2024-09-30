const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoDB");
const router = require("./routes/patientRouter");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use("/api", router);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
