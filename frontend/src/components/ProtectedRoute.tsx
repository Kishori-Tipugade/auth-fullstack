import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../hooks/useAuth";

export default function ProtectedRoute({ children }: any) {
  return getCurrentUser() ? children : <Navigate to="/" />;
}