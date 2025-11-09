import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-primary text-white">
      <h1>✈️ Airport Management System</h1>
    </div>
  );
}

export default Splash;
