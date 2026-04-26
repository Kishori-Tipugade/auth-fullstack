import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";
import "../styles/auth.css";

export default function ForgotPassword() {
  const [method, setMethod] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const nav = useNavigate();

  const sendOtp = async () => {
    if (!identifier) {
      return toast.error(`Please enter your ${method === "email" ? "email" : "mobile number"}`);
    }
    await api.post("/otp/send", { identifier, method });
    localStorage.setItem("resetUser", identifier);
    toast.success("OTP Sent");
    nav("/verify");
  };

  return (
    <AuthCard>
  <h2 className="title">Forgot Password</h2>
  <p className="subtitle">
    Choose how you want to receive your security code
  </p>

  <div className="segmented-control">
    <button
      className={`segment ${method === "email" ? "active" : ""}`}
      onClick={() => setMethod("email")}
    >
      Email
    </button>

    <button
      className={`segment ${method === "sms" ? "active" : ""}`}
      onClick={() => setMethod("sms")}
    >
      SMS
    </button>
  </div>

  <div className="form-group">
    <label className="form-label">
      {method === "email" ? "Email Address" : "Mobile Number"}
    </label>

    <input
      className="form-input"   // 🔥 THIS WAS MISSING
      placeholder={
        method === "email"
          ? "Enter registered email"
          : "Enter registered mobile number"
      }
      value={identifier}
      onChange={(e) => setIdentifier(e.target.value)}
    />
  </div>

  <button className="primary-btn" onClick={sendOtp}>
    Send OTP
  </button>

  <div className="auth-links">
    <span className="auth-link" onClick={() => nav("/login")}>
      Back to Login
    </span>
  </div>
</AuthCard>
  );
}