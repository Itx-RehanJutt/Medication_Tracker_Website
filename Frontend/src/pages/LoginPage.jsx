import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon.png";

function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/");
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f8fbff]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        {/* App Icon and Heading */}
        <div className="text-center mb-6">
          <div className="bg-blue-600 p-4 rounded-2xl inline-block">
            <img
              src={icon}
              alt="App Icon"
              className="w-12 h-12 object-contain mx-auto"
            />
          </div>
          <h1 className="text-xl font-semibold mt-3 text-gray-800">
            Medication Reminder
          </h1>
          <p className="text-gray-500 text-sm">
            Track your health, one dose at a time
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="your.email@example.com"
            className="w-full border rounded-lg p-3 bg-gray-50"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border rounded-lg p-3 bg-gray-50"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Redirect to Register */}
        <p className="text-center text-sm mt-5 text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
