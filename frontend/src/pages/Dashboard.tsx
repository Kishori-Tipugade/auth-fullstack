import { getCurrentUser, logout, getUsers, saveUsers, setCurrentUser } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/auth.css";

export default function Dashboard() {
  const nav = useNavigate();
  const user = getCurrentUser();

  // State for Edit Profile
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
  });

  // State for Password Change
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State for Messages and Loading
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) nav("/login");
  }, [user, nav]);

  if (!user) return null;

  // Handle Profile Update
  const handleSaveProfile = () => {
    if (!formData.name || !formData.mobile) {
      setMessage({ type: "error", text: "Please fill all fields" });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const allUsers = getUsers();
      const userIndex = allUsers.findIndex((u: any) => u.email === user.email);

      if (userIndex !== -1) {
        const updatedUser = { ...allUsers[userIndex], ...formData };
        allUsers[userIndex] = updatedUser;
        
        saveUsers(allUsers);
        setCurrentUser(updatedUser);
        
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
      } else {
        setMessage({ type: "error", text: "User not found" });
      }
      setLoading(false);
    }, 800);
  };

  // Handle Password Change
  const handleChangePassword = () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "All password fields are required" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    if (oldPassword !== user.password) {
      setMessage({ type: "error", text: "Incorrect old password" });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const allUsers = getUsers();
      const userIndex = allUsers.findIndex((u: any) => u.email === user.email);

      if (userIndex !== -1) {
        allUsers[userIndex].password = newPassword;
        saveUsers(allUsers);
        
        // Update currentUser as well
        const updatedUser = { ...user, password: newPassword };
        setCurrentUser(updatedUser);

        setMessage({ type: "success", text: "Password changed successfully!" });
        setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setIsChangingPassword(false);
      }
      setLoading(false);
    }, 800);
  };

  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        
        {/* Header with Avatar */}
        <div className="dashboard-header">
          <div className="avatar-container">
            <div className="avatar-circle">{initials}</div>
          </div>
          <div>
            <h2 className="dashboard-title">
              Welcome, {user.name.split(" ")[0]}
            </h2>
            <p className="subtitle">Manage your profile and security settings</p>
          </div>
        </div>

        {/* Success/Error Alerts */}
        {message && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Profile Section */}
        <h3 className="section-title">Personal Information</h3>
        <div className="info-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="form-input"
              value={isEditing ? formData.name : user.name}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              className="form-input"
              value={user.email}
              disabled={true}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="mobileNumber">Mobile Number</label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="text"
              className="form-input"
              value={isEditing ? formData.mobile : user.mobile}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
          </div>
        </div>

        {/* Action Buttons for Profile */}
        <div className="action-buttons">
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          ) : (
            <>
              <button 
                className="save-btn" 
                onClick={handleSaveProfile}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button 
                className="cancel-btn" 
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ name: user.name, mobile: user.mobile });
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* Collapsible Password Section */}
        {!isChangingPassword ? (
          <button 
            className="secondary-btn" 
            style={{ marginTop: '24px' }}
            onClick={() => setIsChangingPassword(true)}
          >
            Change Password
          </button>
        ) : (
          <div style={{ animation: 'slideUp 0.3s ease-out' }}>
            <h3 className="section-title">Change Password</h3>
            <div className="form-group">
              <label className="form-label" htmlFor="oldPassword">Old Password</label>
              <input
                id="oldPassword"
                name="oldPassword"
                type="password"
                className="form-input"
                placeholder="Enter current password"
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                className="form-input"
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-input"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />
            </div>
            <div className="action-buttons">
              <button 
                className="save-btn" 
                onClick={handleChangePassword}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
              <button 
                className="cancel-btn" 
                onClick={() => setIsChangingPassword(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Logout */}
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