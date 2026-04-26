import { useState } from "react";
import { getUsers, setCurrentUser } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import "../styles/auth.css";

export default function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: ""
  });

  const login = (e: any) => {
    e.preventDefault(); // 🔥 prevent form reload

    const identifier = form.identifier.trim();
    const password = form.password.trim();

    if (!identifier || !password) {
      return toast.error("All fields are required");
    }

    const users = getUsers();

    const user = users.find(
      (u: any) =>
        (u.email === identifier || u.mobile === identifier) &&
        u.password === password
    );

    if (!user) {
      return toast.error("Invalid credentials");
    }

    setCurrentUser(user);
    toast.success("Login successful");
    nav("/dashboard");
  };

  return (
    <AuthCard>
      {/* 🔥 FORM LEVEL CONTROL */}
      <form autoComplete="off" onSubmit={login}>
        
        {/* 🔥 HIDDEN FIELDS (kill autofill) */}
        <input type="text" name="fakeusernameremembered" style={{ display: "none" }} />
        <input type="password" name="fakepasswordremembered" style={{ display: "none" }} />

        {/* TITLE */}
        <h2 className="title">Login</h2>
        <p className="subtitle">Sign in to your account</p>

        {/* EMAIL / MOBILE */}
        <div className="form-group">
          <label className="form-label">Email or Mobile</label>
          <input
            className="form-input"
            name="identifier"
            autoComplete="new-password"   // 🔥 trick Chrome
            placeholder="Enter email or mobile number"
            value={form.identifier}
            onChange={(e) =>
              setForm({ ...form, identifier: e.target.value })
            }
          />
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            autoComplete="new-password"   // 🔥 important
            placeholder="••••••••"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* BUTTON */}
        <button type="submit" className="primary-btn">
          Login
        </button>

        {/* LINKS */}
        <div className="auth-links">
          <span
            className="auth-link"
            onClick={() => nav("/forgot")}
          >
            Forgot Password?
          </span>

          <br />

          <span
            className="auth-link"
            onClick={() => nav("/")}
          >
            New user? Create account
          </span>
        </div>
      </form>
    </AuthCard>
  );
}