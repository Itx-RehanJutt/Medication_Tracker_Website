import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon.png";
import { useTheme } from "../components/ThemeContext";

function LoginPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (
        savedUser &&
        savedUser.email === credentials.email &&
        savedUser.password === credentials.password
      ) {
        localStorage.setItem("token", "dummy_token");
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Invalid email or password!");
      }

      setLoading(false);
    }, 1000);
  };

  // Theme-based styling
  const pageBg = theme === "dark" ? "bg-[#0f172a]" : "bg-[#f8fbff]";
  const cardBg = theme === "dark" ? "bg-[#1e293b]" : "bg-white";
  const textPrimary = theme === "dark" ? "text-white" : "text-gray-800";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const inputBg =
    theme === "dark"
      ? "bg-[#334155] border-gray-600 text-white placeholder-gray-400"
      : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500";

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${pageBg} transition-colors duration-300`}
    >
      <div
        className={`w-full max-w-md ${cardBg} rounded-2xl shadow-lg p-8 transition-colors duration-300`}
      >
        {/* App Icon and Heading */}
        <div className="text-center mb-6">
          <div className="bg-blue-600 p-4 rounded-2xl inline-block">
            <img
              src={icon}
              alt="App Icon"
              className="w-12 h-12 object-contain mx-auto"
            />
          </div>
          <h1 className={`text-xl font-semibold mt-3 ${textPrimary}`}>
            Medication Reminder
          </h1>
          <p className={`text-sm ${textSecondary}`}>
            Track your health, one dose at a time
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="your.email@example.com"
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Redirect to Register */}
        <p className={`text-center text-sm mt-6 ${textSecondary}`}>
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
