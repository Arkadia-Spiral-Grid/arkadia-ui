import React from "react";
import { createRoot } from "react-dom/client";
import { Router } from "wouter"; // Add this line
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router> {/* This enables routing */}
      <App />
    </Router>
  </React.StrictMode>
);
