// src/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post("/logout/"); // deletes the token on the server
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      }
    };
    logout();
  }, []);

  return <p style={{ textAlign: "center", padding: 40 }}>Signing you out...</p>;
}
