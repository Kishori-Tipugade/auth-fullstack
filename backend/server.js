require("dotenv").config();

const express = require("express");
const cors = require("cors");

const otpRoutes = require("./routes/otpRoutes");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use("/api/otp", otpRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});