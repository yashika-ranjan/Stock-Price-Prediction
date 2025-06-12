import React from "react";
import ReactDOM from "react-dom/client";
import Index from "./pages/Index";
import "./index.css";

// ✅ Add this to support dark mode from localStorage
const savedTheme = localStorage.getItem("darkMode");
if (savedTheme === "true") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// ✅ Mount app
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);
