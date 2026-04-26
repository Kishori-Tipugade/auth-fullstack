import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";
import "../styles/auth.css";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const verify = async () => {
    if (!otp.trim()) {
      return toast.error("Please enter OTP");
    }

    try {
      setLoading(true);

      const identifier = localStorage.getItem("resetUser");

      await api.post("/otp/verify", { identifier, otp });

      toast.success("OTP verified");
      nav("/reset");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      {/* ✅ TITLE */}
      <h2 className="title">Verify OTP</h2>
      <p className="subtitle">Enter the 6-digit code sent to you</p>

      {/* ✅ INPUT */}
      <div className="form-group">
        <label className="form-label">OTP Code</label>
        <input
          className="form-input"   // 🔥 REQUIRED
          type="text"
          placeholder="Enter code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
        />
      </div>

      {/* ✅ BUTTON */}
      <button
        className="primary-btn"
        onClick={verify}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {/* ✅ LINKS */}
      <div className="auth-links">
        <span
          className="auth-link"
          onClick={() => nav("/forgot")}
        >
          Didn’t receive code? Resend
        </span>
      </div>
    </AuthCard>
  );
}