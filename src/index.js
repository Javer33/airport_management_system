import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { TicketProvider } from "./context/TicketContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <TicketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TicketProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
