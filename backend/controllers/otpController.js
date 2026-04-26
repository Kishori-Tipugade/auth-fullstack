const nodemailer = require("nodemailer");
const twilio = require("twilio");

const otpStore = {};

// 🔐 Generate OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000);

// 📧 Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 📱 Twilio setup
const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

// 🚀 SEND OTP
exports.sendOtp = async (req, res) => {
  console.log("RECEIVED OTP REQUEST:", req.body);
  const { identifier, method } = req.body;

  if (!identifier || !method) {
    return res.status(400).json({ message: "Missing data" });
  }

  const otp = generateOtp();

  // ✅ Store OTP
  otpStore[identifier] = {
    otp,
    expiry: Date.now() + 2 * 60 * 1000
  };

  try {
    // ================= EMAIL =================
    if (method === "email") {
      if (!identifier.includes("@")) {
        return res.status(400).json({ message: "Invalid email" });
      }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: identifier,
        subject: "OTP Code",
        text: `Your OTP is ${otp}`
      });
    }

    // ================= SMS =================
    else if (method === "sms") {
      let phone = identifier;

      // format number
      if (!phone.startsWith("+")) {
        phone = "+91" + phone;
      }

      await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE,
        to: phone
      });
    }

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    console.error("FULL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// 🔐 VERIFY OTP
exports.verifyOtp = (req, res) => {
  const { identifier, otp } = req.body;

  const record = otpStore[identifier];

  if (!record) {
    return res.status(400).json({ message: "No OTP found" });
  }

  if (Date.now() > record.expiry) {
    delete otpStore[identifier];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[identifier];

  res.json({ message: "OTP verified" });
};