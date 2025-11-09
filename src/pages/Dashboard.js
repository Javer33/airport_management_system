/*
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {currentUser?.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}*/
import React from "react";
import { useAuth } from "../context/AuthContext";
import "../App.css"; // make sure CSS is imported

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="dashboard-center">
      <div className="dashboard-box">
        <h1>Welcome, {currentUser?.email}</h1>
        <button className="btn-red" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
