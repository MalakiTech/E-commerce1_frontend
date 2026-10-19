import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // same key as Login/Signup
  if (!token) return <Navigate to="/" replace />;
  return children;
}