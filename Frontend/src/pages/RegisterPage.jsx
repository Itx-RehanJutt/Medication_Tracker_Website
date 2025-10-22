import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon.png"; 

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

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
            Start tracking your medications today
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg p-3 bg-gray-50"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="your.email@example.com"
            className="w-full border rounded-lg p-3 bg-gray-50"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 bg-gray-50"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-lg p-3 bg-gray-50"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-center text-sm mt-5 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;

