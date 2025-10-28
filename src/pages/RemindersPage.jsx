import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Chrome,
} from "lucide-react";
import { useMedications } from "../components/MedicationContext";
import { useTheme } from "../components/ThemeContext";

export default function RemindersPage() {
  const { medications, toggleMedicationTaken } = useMedications();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("all");

  // === Theme Variables ===
  const pageBg = theme === "dark" ? "bg-[#0f172a]" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-[#1e293b]" : "bg-white";
  const textPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const hoverBg = theme === "dark" ? "hover:bg-[#334155]" : "hover:bg-gray-50";

  // === Reminder logic ===
  const getReminderStatus = (time, taken) => {
    if (taken) return "done";

    const [timeStr, period] = time.split(" ");
    const [hours, minutes] = timeStr.split(":").map(Number);
    let medicationHour = hours;

    if (period === "PM" && hours !== 12) medicationHour = hours + 12;
    else if (period === "AM" && hours === 12) medicationHour = 0;

    const now = new Date();
    const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
    const medTotalMinutes = medicationHour * 60 + (minutes || 0);

    if (currentTotalMinutes > medTotalMinutes + 30) return "missed";
    if (currentTotalMinutes > medTotalMinutes) return "delayed";
    return "upcoming";
  };

  const reminders = medications.map((med) => ({
    id: med.id,
    medication: med.name,
    dosage: med.dosage,
    time: med.time,
    status: getReminderStatus(med.time, med.taken),
  }));

  const filterByStatus = (status) =>
    status === "all" ? reminders : reminders.filter((r) => r.status === status);

  const handleMarkAsTaken = (id, medication) => {
    toggleMedicationTaken(id);
    alert(`${medication} marked as taken`);
  };

  const handleSkip = (id, medication) => alert(`${medication} skipped`);
  const handleDelay = (id, medication) =>
    alert(`${medication} delayed by 30 minutes`);

  const handleEmailReminder = (medicationName) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    alert(
      medicationName
        ? `Email reminder for ${medicationName} sent at ${time}`
        : `Email reminder sent successfully at ${time}`
    );
  };

  const handleBrowserNotification = (medicationName) => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }

    if (Notification.permission === "granted") {
      new Notification("Medication Reminder", {
        body: medicationName
          ? `Time to take ${medicationName}`
          : "It's time to take your medication",
        icon: "/icon.png",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Medication Reminder", {
            body: medicationName
              ? `Time to take ${medicationName}`
              : "It's time to take your medication",
            icon: "/icon.png",
          });
        }
      });
    }
  };

  const tabs = ["all", "upcoming", "delayed", "done", "missed"];
  const countByStatus = {
    all: reminders.length,
    upcoming: reminders.filter((r) => r.status === "upcoming").length,
    delayed: reminders.filter((r) => r.status === "delayed").length,
    done: reminders.filter((r) => r.status === "done").length,
    missed: reminders.filter((r) => r.status === "missed").length,
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming":
        return <Bell className="h-5 w-5 text-blue-500" />;
      case "done":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "missed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "delayed":
        return <Clock className="h-5 w-5 text-orange-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    const colors = {
      upcoming: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      done: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      missed: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      delayed:
        "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    };
    return (
      <span className={`${base} ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <main
      className={`min-h-screen ${pageBg} transition-colors px-4 sm:px-6 lg:px-8 py-8`}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-2xl font-semibold mb-1 ${textPrimary}`}>
          Reminders & Notifications
        </h1>
        <p className={`${textSecondary}`}>
          Manage your medication reminders easily
        </p>
      </div>

      {/* Notification Settings */}
      <div
        className={`mb-6 p-6 rounded-lg shadow-sm border ${borderColor} ${cardBg}`}
      >
        <h3 className={`mb-4 font-semibold text-lg ${textPrimary}`}>
          Notification Preferences
        </h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleBrowserNotification}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition
              ${
                theme === "dark"
                  ? "bg-blue-900 border-blue-700 hover:bg-blue-800 text-blue-300"
                  : "bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
              }`}
          >
            <Chrome className="h-4 w-4" />
            <span className="text-sm">Browser Notifications</span>
          </button>

          <button
            onClick={() => handleEmailReminder()}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition
              ${
                theme === "dark"
                  ? "bg-green-900 border-green-700 hover:bg-green-800 text-green-300"
                  : "bg-green-50 border-green-200 hover:bg-green-100 text-green-700"
              }`}
          >
            <Mail className="h-4 w-4" />
            <span className="text-sm">Email Reminders</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded-full font-semibold text-sm transition
              ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : `${cardBg} ${textSecondary} border ${borderColor}`
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}{" "}
            <span
              className={`ml-1 px-1.5 py-0.5 rounded-full text-xs transition 
                ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-100 text-gray-800 border border-gray-300"
                }`}
            >
              {countByStatus[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Reminder List */}
      <div className="space-y-4">
        {filterByStatus(activeTab).map((reminder) => (
          <div
            key={reminder.id}
            className={`p-4 border ${borderColor} rounded-lg shadow-sm flex justify-between items-center ${cardBg} transition`}
          >
            <div className="flex items-center gap-4">
              {getStatusIcon(reminder.status)}
              <div>
                <h4 className={`font-semibold ${textPrimary}`}>
                  {reminder.medication}
                </h4>
                <p className={`text-sm ${textSecondary}`}>{reminder.dosage}</p>
                <p className={`text-sm ${textSecondary}`}>{reminder.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {getStatusBadge(reminder.status)}
              <button
                onClick={() =>
                  handleMarkAsTaken(reminder.id, reminder.medication)
                }
                className={`px-3 py-1 rounded text-sm transition
                  ${
                    theme === "dark"
                      ? "bg-green-900 text-green-300 hover:bg-green-800"
                      : "bg-green-50 text-green-700 hover:bg-green-100"
                  }`}
              >
                Taken
              </button>
              <button
                onClick={() => handleSkip(reminder.id, reminder.medication)}
                className={`px-3 py-1 rounded text-sm transition
                  ${
                    theme === "dark"
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                Skip
              </button>
              <button
                onClick={() => handleDelay(reminder.id, reminder.medication)}
                className={`px-3 py-1 rounded text-sm transition
                  ${
                    theme === "dark"
                      ? "bg-orange-900 text-orange-300 hover:bg-orange-800"
                      : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                  }`}
              >
                Delay
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filterByStatus(activeTab).length === 0 && (
        <div className="text-center py-12">
          <p className={`${textSecondary}`}>No reminders available</p>
        </div>
      )}
    </main>
  );
}
