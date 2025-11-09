import React, { createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useLocalStorage("ams_users_v1", []);

  const createUser = (data) => {
    const newUser = { id: uuidv4(), bookings: [], ...data };
    setUsers((prev) => [newUser, ...prev]);
  };

  const updateUser = (id, updates) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const getUser = (id) => users.find((u) => u.id === id);

  return (
    <UserContext.Provider value={{ users, createUser, updateUser, deleteUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}
