require("dotenv").config();
const express = require("express");

const otpRoutes = require("./routes/otpRoutes");

const app = express();

// 🚀 ROBUST MANUAL CORS (Bypasses 'cors' package issues)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // You can restrict this to your specific domains later
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

/* ROUTES */
app.use("/api/otp", otpRoutes);

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* GLOBAL ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ error: err.message });
});

/* PORT */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});