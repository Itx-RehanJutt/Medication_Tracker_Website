import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon.png";
import { useTheme } from "../components/ThemeContext"; 

function RegisterPage() {
  const navigate = useNavigate();
  const { theme } = useTheme(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
            Start tracking your medications today
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="your.email@example.com"
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Redirect to Login */}
        <p className={`text-center text-sm mt-6 ${textSecondary}`}>
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
