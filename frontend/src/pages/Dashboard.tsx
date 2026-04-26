import { getCurrentUser, logout } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/auth.css";

export default function Dashboard() {
  const nav = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) nav("/login");
  }, [user, nav]);

  if (!user) return null;


  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        
        {/* Header */}
        <div className="dashboard-header">

          <div>
            <h2 className="dashboard-title">
              Welcome back, {user.name.split(" ")[0]}
            </h2><br></br>
            <p className="subtitle">
              Manage your account details below
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="info-grid">
          <div className="info-card">
            <span className="info-label">Full Name</span>
            <span className="info-value">{user.name}</span>
          </div>

          <div className="info-card">
            <span className="info-label">Email Address</span>
            <span className="info-value">{user.email}</span>
          </div>

          <div className="info-card">
            <span className="info-label">Mobile Number</span>
            <span className="info-value">{user.mobile}</span>
          </div>
        </div>

        {/* Action */}
        <button
          className="danger-btn"
          onClick={() => {
            logout();
            nav("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}