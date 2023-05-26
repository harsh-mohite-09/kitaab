import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import AuthProvider from "./context/authContext";
import FilterProvider from "./context/filterContext";
import DataProvider from "./context/dataContext";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <AuthProvider>
    <DataProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </DataProvider>
  </AuthProvider>
  // </React.StrictMode>
);
