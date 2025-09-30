import React, { useState } from "react";
import { useAuth } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const SessionExpired: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleRefresh = async () => {
    setLoading(true);
    logout();
    navigate("/login");

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Your session has expired</h2>
      <button
        onClick={handleRefresh}
        disabled={loading}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        {loading ? "Redirecting..." : "Go to Login"}
      </button>
    </div>
  );
};

export default SessionExpired;
