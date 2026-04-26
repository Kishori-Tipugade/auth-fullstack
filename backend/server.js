require("dotenv").config();
const express = require("express");

const cors = require("cors");

const otpRoutes = require("./routes/otpRoutes");

const app = express();

// ✅ STANDARD CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://auth-fullstack-one.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

app.use(express.json());

/* ROUTES */
app.use("/api/otp", otpRoutes);

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* CATCH-ALL FOR DEBUGGING */
app.use((req, res) => {
  console.log("UNHANDLED REQUEST:", req.method, req.path);
  res.status(404).send(`Route ${req.method} ${req.path} not found on this server`);
});

/* GLOBAL ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});