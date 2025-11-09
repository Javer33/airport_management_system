import React from "react";
import { useAuth } from "../context/AuthContext";
import { useUsers } from "../context/UserContext";
import { useTickets } from "../context/TicketContext";

export default function Booking() {
  const { currentUser } = useAuth();
  const { getUser } = useUsers();
  const { tickets, bookTicket, cancelBooking } = useTickets();

  if (!currentUser) return <p>Please log in to see bookings.</p>;

  const user = getUser(currentUser.id);
  const userBookings = user?.bookings || [];

  const handleBook = (ticketId) => {
    try {
      bookTicket(currentUser.id, ticketId);
      alert("Ticket booked successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = (ticketId) => {
    try {
      cancelBooking(currentUser.id, ticketId);
      alert("Booking cancelled successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="dashboard-center">
        <div className="dashboard-box">
          <h2>Available Flights</h2>
          {tickets.length === 0 && <p>No flights available.</p>}
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.id} style={{ marginBottom: "10px" }}>
                <strong>{ticket.flightNumber}</strong> | Seats: {ticket.seatsAvailable} | Status: {ticket.status || "Scheduled"}
                {!userBookings.includes(ticket.id) && ticket.seatsAvailable > 0 && (
                  <button onClick={() => handleBook(ticket.id)} style={{ marginLeft: "10px" }}>
                    Book
                  </button>
                )}
                {userBookings.includes(ticket.id) && (
                  <button onClick={() => handleCancel(ticket.id)} style={{ marginLeft: "10px" }}>
                    Cancel Booking
                  </button>
                )}
              </li>
            ))}
          </ul>

          <h2>My Bookings</h2>
          {userBookings.length === 0 ? (
            <p>You have no booked tickets.</p>
          ) : (
            <ul>
              {userBookings.map((ticketId) => {
                const ticket = tickets.find((t) => t.id === ticketId);
                return ticket ? (
                  <li key={ticket.id} style={{ marginBottom: "10px" }}>
                    <strong>{ticket.flightNumber}</strong> | Departure: {ticket.departure || "N/A"} | Gate: {ticket.gate || "N/A"}
                    <button onClick={() => handleCancel(ticket.id)} style={{ marginLeft: "10px" }}>
                      Cancel
                    </button>
                  </li>
                ) : null;
              })}
            </ul>
          )}
        </div></div></div>
  );
}
