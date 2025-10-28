import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { RiSave3Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuChrome } from "react-icons/lu";
import { MdOutlineEmail, MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext"; 
const Setting = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { theme } = useTheme(); 

  // Form data
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    } else {
      const storedUser = localStorage.getItem("registeredUser");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setFormData({ name: parsed.name, email: parsed.email });
      }
    }
  }, [user]);

  // Handle Input
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill all the fields");
      return;
    }
    localStorage.setItem("registeredUser", JSON.stringify(formData));
    toast.success("Profile updated successfully!");
  };

  // Notification Prefs
  const [notifications, setNotifications] = useState({
    browser: true,
    email: true,
    daily: false,
    missed: true,
  });

  const toggleNotification = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  // App Prefs
  const [appPrefs, setAppPrefs] = useState({
    soundEffects: true,
  });
  const toggleAppPref = (key) =>
    setAppPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  // Logout
  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login");
  };

  // Delete
  const handleDeleteAccount = () => {
    toast.custom((t) => (
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 border border-gray-700 text-gray-100"
            : "bg-white border border-gray-300 text-gray-900"
        } rounded-lg shadow-lg px-6 py-5 w-80 text-center ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <h3 className="font-semibold mb-2">Delete your account?</h3>
        <p className="text-sm mb-4">
          This action cannot be undone.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              toast.success("Account deleted successfully");
              localStorage.removeItem("registeredUser");
              navigate("/login");
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className={`px-3 py-1 rounded-md text-sm ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-3xl mx-auto px-5 py-10">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold mb-1">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile, notifications, and preferences
          </p>
        </div>

        {/* Profile Section */}
        <div
          className={`border rounded-xl px-8 py-6 shadow-sm mb-8 transition-all ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-300"
          }`}
        >
          <form onSubmit={handleOnSubmit}>
            <div className="flex items-center gap-2 mb-4">
              <FiUser size={18} className="text-blue-600" />
              <span className="text-lg font-medium">User Profile</span>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="font-medium">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Enter your name"
                  className={`mt-1 border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label className="font-medium">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  type="email"
                  placeholder="Enter your email"
                  className={`mt-1 border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white font-medium hover:bg-blue-700 px-5 py-2.5 rounded-lg mt-6 transition-all"
            >
              <RiSave3Line fontSize={18} /> Save Profile
            </button>
          </form>
        </div>

        {/* Notification Preferences */}
        <div
          className={`border rounded-xl px-8 py-6 shadow-sm mb-8 transition-all ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-300"
          }`}
        >
          <div className="flex items-center gap-2 mb-6">
            <IoIosNotificationsOutline size={22} className="text-blue-600" />
            <span className="text-lg font-medium">
              Notification Preferences
            </span>
          </div>

          {[
            {
              icon: <LuChrome size={20} />,
              label: "Browser Notifications",
              desc: "Get notified in your browser",
              key: "browser",
            },
            {
              icon: <MdOutlineEmail size={20} />,
              label: "Email Reminders",
              desc: "Receive reminder emails",
              key: "email",
            },
            {
              icon: <IoIosNotificationsOutline size={20} />,
              label: "Daily Summary",
              desc: "Get a daily summary of medications",
              key: "daily",
            },
            {
              icon: <IoIosNotificationsOutline size={20} />,
              label: "Missed Dose Alerts",
              desc: "Get alerts when a dose is missed",
              key: "missed",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex justify-between items-center mb-5 last:mb-0"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <div>
                  <h2 className="font-medium">{item.label}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => toggleNotification(item.key)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-blue-600 transition-all"></div>
                <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
              </label>
            </div>
          ))}
        </div>

        {/* App Preferences */}
        <div
          className={`border rounded-xl px-8 py-6 shadow-sm mb-8 transition-all ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-300"
          }`}
        >
          <div className="mb-6">
            <span className="text-lg font-medium">App Preferences</span>
          </div>

          {[
            {
              label: "Sound Effects",
              desc: "Play sounds for notifications",
              key: "soundEffects",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex justify-between items-center mb-5 last:mb-0"
            >
              <div>
                <h2 className="font-medium">{item.label}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={appPrefs[item.key]}
                  onChange={() => toggleAppPref(item.key)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-blue-600 transition-all"></div>
                <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
              </label>
            </div>
          ))}
        </div>

        {/* Account */}
        <div
          className={`border border-orange-400 rounded-xl px-8 py-6 shadow-sm mb-8 transition-all ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="mb-5">
            <span className="text-lg text-orange-600 font-medium">
              Account
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-medium">Logout</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sign out of your account
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-orange-600 border border-orange-600 px-4 py-1.5 rounded-md hover:bg-orange-50 dark:hover:bg-orange-900 font-medium transition"
            >
              <MdOutlineLogout className="inline-block mr-1" />
              Logout
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div
          className={`border border-red-400 rounded-xl px-8 py-6 shadow-sm transition-all ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="mb-5">
            <span className="text-lg text-red-600 font-medium">
              Danger Zone
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-medium">Delete Account</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Permanently delete your account and all data
              </p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-medium transition"
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
