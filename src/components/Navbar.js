/*import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsDisplay } from "react-icons/bs";

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #0a080aff" }}>
      
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      {currentUser && (
        <>
          <Link to="/dashboard" style={{ marginRight: "10px" }}>Dashboard</Link>
          <Link to="/users" style={{ marginRight: "10px" }}>Users</Link>
          <Link to="/tickets" style={{ marginRight: "10px" }}>Tickets</Link>
          <Link to="/flights" style={{ marginRight: "10px" }}>Flights</Link>
          <Link to="/booking" style={{ marginRight: "10px" }}>Booking</Link>
          <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
        </>
      )}
      {!currentUser && (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
*/
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #140a0aff" }}>
      <h1> 
        Airport
      </h1>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      {currentUser && (
        <>
          <Link to="/dashboard" style={{ marginRight: "10px" }}>Dashboard</Link>
          <Link to="/users" style={{ marginRight: "10px" }}>Users</Link>
          <Link to="/tickets" style={{ marginRight: "10px" }}>Tickets</Link>
          <Link to="/flights" style={{ marginRight: "10px" }}>Flights</Link>
          <Link to="/booking" style={{ marginRight: "10px" }}>Booking</Link>
          <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
        </>
      )}
      {!currentUser && (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

