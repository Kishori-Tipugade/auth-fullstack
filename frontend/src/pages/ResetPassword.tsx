import { useState } from "react";
import { getUsers, saveUsers } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";
import "../styles/auth.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const reset = () => {
    if (!password.trim()) {
      return toast.error("Password is required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    const identifier = localStorage.getItem("resetUser");

    if (!identifier) {
      return toast.error("Session expired. Try again.");
    }

    let users = getUsers();

    users = users.map((u: any) =>
      u.email === identifier || u.mobile === identifier
        ? { ...u, password } // ❗ Keep consistent with your login (no hashing)
        : u
    );

    saveUsers(users);

    toast.success("Password reset successfully");
    nav("/login");
  };

  return (
    <AuthCard>
      {/* ✅ TITLE */}
      <h2 className="title">Reset Password</h2>
      <p className="subtitle">Choose a strong new password</p>

      {/* ✅ INPUT */}
      <div className="form-group">
        <label className="form-label">New Password</label>
        <input
          className="form-input"   // 🔥 REQUIRED
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* ✅ BUTTON */}
      <button
        className="primary-btn"   // 🔥 REQUIRED
        onClick={reset}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </AuthCard>
  );
}