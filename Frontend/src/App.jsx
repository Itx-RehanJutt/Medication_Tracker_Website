import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import React, { useState } from "react";
import { MedicationProvider } from "./components/MedicationContext";
import { ThemeProvider, useTheme } from "./components/ThemeContext";

function AppContent() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState("home");

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.clear();
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-[#0d1117] text-white"
      }`}
    >
      <ScrollToTop />

      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        handleLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-6 md:py-8">
        <Outlet context={{ theme }} />
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MedicationProvider>
        <AppContent />
      </MedicationProvider>
    </ThemeProvider>
  );
}

export default App;
