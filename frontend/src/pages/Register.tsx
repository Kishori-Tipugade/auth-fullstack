import { useState } from "react";
import { getUsers, saveUsers } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import "../styles/auth.css";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: ""
  });

  const handleSubmit = () => {
    const { name, email, password, mobile } = form;

    if (!name || !email || !password || !mobile) {
      return toast.error("All fields are required");
    }

    if (!email.includes("@")) {
      return toast.error("Invalid email");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return toast.error("Mobile must be 10 digits");
    }

    const users = getUsers();

    if (users.find((u: any) => u.email === email)) {
      return toast.error("User already exists");
    }

    users.push({ name, email, password, mobile });
    saveUsers(users);

    toast.success("Registered successfully");
    nav("/login");
  };

  return (
    <AuthCard>
      {/* ✅ TITLE */}
      <h2 className="title">Register</h2>
      <p className="subtitle">Create your new account</p>

      {/* ✅ NAME */}
      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input
          className="form-input"
          placeholder="Kishori Tipugade"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      {/* ✅ EMAIL */}
      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input
          className="form-input"
          type="email"
          autoComplete="off"
          placeholder="name@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      {/* ✅ MOBILE */}
      <div className="form-group">
        <label className="form-label">Mobile Number</label>
        <input
          className="form-input"
          type="tel"
          placeholder="10 digit number"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />
      </div>

      {/* ✅ PASSWORD */}
      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          className="form-input"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      {/* ✅ BUTTON */}
      <button className="primary-btn" onClick={handleSubmit}>
        Register
      </button>

      {/* ✅ LINKS */}
      <div className="auth-links">
        <span
          className="auth-link"
          onClick={() => nav("/login")}
        >
          Already registered? Login
        </span>
      </div>
    </AuthCard>
  );
}