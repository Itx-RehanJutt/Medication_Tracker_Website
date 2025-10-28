import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Settings as SettingsIcon,
  LogOut,
  Home,
  List,
  Clock,
  History,
  Sun,
  Moon,
} from "lucide-react";
import appIcon from "../assets/icon.png";
import { useTheme } from "./ThemeContext";

export default function Header({ currentPage, onNavigate, handleLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "medications", label: "Medications", icon: List, href: "/medications" },
    { id: "reminders", label: "Reminders", icon: Clock, href: "/reminders" },
    { id: "history", label: "History", icon: History, href: "/history" },
    { id: "settings", label: "Settings", icon: SettingsIcon, href: "/settings" },
  ];

  const headerBg = theme === "dark" ? "bg-[#0f172a]" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const textPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const hoverBg = theme === "dark" ? "dark:hover:bg-gray-800" : "hover:bg-blue-50";
  const dropdownBg = theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50";

  return (
    <header
      className={`sticky top-0 z-50 border-b ${headerBg} ${borderColor} shadow-sm transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* === Top Section === */}
        <div className="flex justify-between items-center h-16">
          {/* === Logo === */}
          <Link
            to="/"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={appIcon}
              alt="App Icon"
              className="h-9 w-9 object-contain rounded-lg bg-blue-100 dark:bg-blue-800 p-1"
            />
            <span className="font-semibold text-dark-blue-900 dark:text-dark-blue-200">
              Medication Reminder
            </span>
          </Link>

          {/* === Desktop Nav === */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-200 dark:bg-blue-700 text-black dark:text-white"
                      : `${textSecondary} ${hoverBg}`
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* === Right Section === */}
          <div className="flex items-center gap-4">
            {/* === Theme Toggle Button === */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-white-800 hover:ring-2 hover:ring-blue-400 transition-all flex items-center justify-center"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-700" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-400" />
              )}
            </button>

            {/* === Profile Dropdown === */}
            <div className="relative flex items-center justify-center">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="rounded-full focus:outline-none flex items-center justify-center"
              >
                <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full text-blue-600 dark:text-blue-300 hover:ring-2 hover:ring-blue-500 transition-all">
                  <User className="h-5 w-5" />
                </div>
              </button>

              {dropdownOpen && (
                <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className={`absolute right-0 mt-2 w-56 ${dropdownBg} border ${borderColor} rounded-lg shadow-lg z-[9999] top-full`}
                >
                  {/* top-full ensures it stays BELOW the button */}
                  <div className={`px-4 py-3 border-b ${borderColor}`}>
                    <p className={`font-medium ${textPrimary}`}>
                      {user?.name || "Guest User"}
                    </p>
                    <p className={`text-sm ${textSecondary}`}>
                      {user?.email || "guest@example.com"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/settings");
                      onNavigate("settings");
                    }}
                    className={`flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-blue-800`}
                  >
                    <SettingsIcon className="mr-2 h-4 w-4" /> Settings
                  </button>
                  <div className={`border-t ${borderColor}`} />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-red-800"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* === Mobile Menu Button === */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* === Mobile Menu === */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden ${headerBg} border-t ${borderColor} transition-all`}
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-200 dark:bg-blue-700 text-black dark:text-white"
                      : `${textSecondary} ${hoverBg}`
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
