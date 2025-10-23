// ✅ Importing Required Dependencies
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { RiSave3Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuChrome } from "react-icons/lu";
import { MdOutlineEmail, MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  // ✅ State for form data
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
  });

  // ✅ Handle input change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  // ✅ Handle form submission
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (formData.name === "" || formData.email === "") {
      toast.error("Please fill all the fields");
    } else {
      console.log(formData);
      toast.success("Profile has been updated!");
      setFormdata({
        name: "",
        email: "",
      });
    }
  };

  // ✅ Notification Preferences Data
  const notifiBar = [
    {
      icon: <LuChrome size={20} className="text-gray-700" />,
      heading: "Browser Notifications",
      spantag: "Get notified directly in your browser",
    },
    {
      icon: <MdOutlineEmail size={20} className="text-gray-700" />,
      heading: "Email Reminders",
      spantag: "Receive reminder emails",
    },
    {
      icon: <IoIosNotificationsOutline size={24} className="text-gray-700" />,
      heading: "Daily Summary",
      spantag: "Get a daily summary of medications",
    },
    {
      icon: <IoIosNotificationsOutline size={24} className="text-gray-700" />,
      heading: "Missed Dose Alerts",
      spantag: "Alert when a dose is missed",
    },
  ];

  // ✅ App Preferences Data
  const appbar = [
    { heading: "Dark Mode", spantag: "Switch to dark theme" },
    { heading: "Sound Effects", spantag: "Play sounds for notifications" },
  ];
  // ✅ Logout account

  const handleLogout = () => {
    navigate("/login");
  };

  // ✅ Delete Account Toast
  const handleDeleteAccount = () => {
    toast.custom((t) => (
      <div
        className={`bg-white border border-gray-200 rounded-lg shadow-md px-5 py-4 w-80 text-center transition-all ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <h3 className="font-semibold text-gray-900 mb-2">
          Delete your account?
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          This action cannot be undone.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              toast.success("Account deleted successfully");
              // 🔥 API call for delete logic here
              // 🧭 Navigate to login page after deletion
              navigate("/login");
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      {/* ✅ Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ✅ Heading */}
        <div className="mb-8">
          <h1 className="text-gray-900 font-semibold text-2xl mb-1">
            Settings
          </h1>
          <p className="text-gray-600">
            Manage your account and notification preferences
          </p>
        </div>

        {/* ✅ User Profile Section */}
        <div className="border border-gray-300 rounded-lg px-8 py-6 bg-white shadow-sm">
          <form onSubmit={handleOnSubmit}>
            <div className="flex items-center gap-2 mb-4">
              <FiUser size={18} className="text-blue-600" />
              <span className="text-lg text-gray-900 font-medium">
                User Profile
              </span>
            </div>

            {/* ✅ Input Fields */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-900">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleOnChange}
                  type="text"
                  className="bg-gray-100 w-full rounded-lg py-2 px-3 focus:outline-0 focus:ring-gray-300 focus-visible:ring-[3px] focus-visible:ring-gray-300"
                  placeholder="Enter your name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-900">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  type="email"
                  className="bg-gray-100 w-full rounded-lg py-2 px-3 focus:outline-0 focus:ring-gray-300 focus-visible:ring-[3px] focus-visible:ring-gray-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* ✅ Save Profile Button */}
            <div className="">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white font-medium hover:bg-blue-700 px-4 py-2 rounded-lg mt-5 transition"
              >
                <RiSave3Line fontSize={18} /> Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* ✅ Notification Preferences */}
        <div className="border border-gray-300 rounded-lg px-8 py-6 bg-white mt-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <IoIosNotificationsOutline size={24} className="text-blue-600" />
            <span className="text-lg text-gray-900 font-medium">
              Notification Preferences
            </span>
          </div>

          {notifiBar.map((item, index) => (
            <div
              className="flex justify-between items-center mb-5 last:mb-0"
              key={index}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <div className="flex flex-col">
                  <h2 className="font-medium text-gray-900 text-[15px]">
                    {item.heading}
                  </h2>
                  <span className="text-gray-600 text-sm">{item.spantag}</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-8 h-4 bg-gray-400 rounded-full peer-checked:bg-black transition-colors duration-200"></div>
                <span className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
              </label>
            </div>
          ))}
        </div>

        {/* ✅ App Preferences */}
        <div className="border border-gray-300 rounded-lg px-8 py-6 bg-white mt-6 shadow-sm">
          <div className="mb-5">
            <span className="text-lg text-gray-900 font-medium">
              App Preferences
            </span>
          </div>

          {appbar.map((item, index) => (
            <div
              className="flex justify-between items-center mb-5 last:mb-0"
              key={index}
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <h2 className="font-medium text-gray-900 text-[15px]">
                    {item.heading}
                  </h2>
                  <span className="text-gray-600 text-sm">{item.spantag}</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-8 h-4 bg-gray-400 rounded-full peer-checked:bg-black transition-colors duration-200"></div>
                <span className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
              </label>
            </div>
          ))}
        </div>

        {/* ✅ Account Section */}
        <div className="border border-orange-400 rounded-lg px-8 py-6 bg-white mt-6 shadow-sm">
          <div className="mb-5">
            <span className="text-lg text-orange-600 font-medium">Account</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-medium text-gray-900 text-[15px]">Logout</h2>
              <span className="text-gray-600 text-sm">
                Sign out of your account
              </span>
            </div>
            <button onClick={handleLogout} className=" outline-1 outline-orange-600 text-orange-600 flex items-center gap-2 rounded-lg px-3 py-1 hover:bg-orange-100/50 font-medium text-sm">
              <MdOutlineLogout />
              Logout
            </button>
          </div>
        </div>

        {/* ✅ Danger Zone */}
        <div className="border border-red-400 rounded-lg px-8 py-6 bg-white mt-6 shadow-sm">
          <div className="mb-5">
            <span className="text-lg text-red-600 font-medium">
              Danger Zone
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-medium text-gray-900 text-[15px]">
                Delete Account
              </h2>
              <span className="text-gray-600 text-sm">
                Permanently delete your account and all data
              </span>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 text-white flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-red-700 font-medium text-sm transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
