import React, { createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUsers } from "./UserContext";

const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useLocalStorage("ams_tickets_v1", []);
  const { getUser, updateUser } = useUsers();

  const createTicket = (data) => {
    const newTicket = {
      id: uuidv4(),
      bookedBy: [],
      createdAt: new Date().toISOString(),
      seatsAvailable: data.seatsAvailable ?? 0,
      ...data
    };
    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const updateTicket = (id, updates) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTicket = (id) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const getTicket = (id) => tickets.find((t) => t.id === id);

  const bookTicket = (userId, ticketId) => {
    const ticket = getTicket(ticketId);
    const user = getUser(userId);

    if (!ticket || !user) throw new Error("Invalid user or ticket");
    if (ticket.bookedBy.includes(userId)) throw new Error("User already booked");
    if (ticket.seatsAvailable <= 0) throw new Error("No seats available");

    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, bookedBy: [...t.bookedBy, userId], seatsAvailable: t.seatsAvailable - 1 }
          : t
      )
    );

    updateUser(userId, { bookings: [...(user.bookings || []), ticketId] });
  };

  const cancelBooking = (userId, ticketId) => {
    const ticket = getTicket(ticketId);
    const user = getUser(userId);

    if (!ticket || !user) throw new Error("Invalid user or ticket");
    if (!ticket.bookedBy.includes(userId)) throw new Error("Booking not found");

    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, bookedBy: t.bookedBy.filter((id) => id !== userId), seatsAvailable: t.seatsAvailable + 1 }
          : t
      )
    );

    const newBookings = (user.bookings || []).filter((id) => id !== ticketId);
    updateUser(userId, { bookings: newBookings });
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        createTicket,
        updateTicket,
        deleteTicket,
        getTicket,
        bookTicket,
        cancelBooking
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  return useContext(TicketContext);
}
