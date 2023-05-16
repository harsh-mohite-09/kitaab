import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import AuthProvider from "./context/authContext";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  // </React.StrictMode>
);
