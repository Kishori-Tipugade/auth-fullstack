require("dotenv").config();

const express = require("express");
const cors = require("cors");

const otpRoutes = require("./routes/otpRoutes");

const app = express();

/* 🔥 CORS (more controlled than "*") */
app.use(cors({
  origin: "*", // you can restrict later
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

/* ROUTES */
app.use("/api/otp", otpRoutes);

/* HEALTH CHECK (important for deployment) */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* 🔥 PORT FIX (IMPORTANT) */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});