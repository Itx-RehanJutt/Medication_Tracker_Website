import React, { useState, useEffect } from "react";
import MedicationForm from "../components/MedicationForm";
import { Bell, ClockAlert, Pill, Clock, Check, Square } from "lucide-react"; // ✅ updated icons

const Home = () => {
  const [medications, setMedications] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddMedication = (newMedication) => {
    setMedications([...medications, newMedication]);
    setShowForm(false);
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  const isTimePassed = (time) => {
    if (!time) return false;
    const [hour, minute] = time.split(":").map(Number);
    const now = new Date();
    const medTime = new Date();
    medTime.setHours(hour, minute, 0, 0);
    return now >= medTime;
  };

  const getRemainingTime = (reminderTime) => {
    if (!reminderTime) return null;
    const [hour, minute] = reminderTime.split(":").map(Number);
    const now = new Date();
    const reminderDate = new Date();
    reminderDate.setHours(hour, minute, 0, 0);

    const diffMs = reminderDate - now;
    const diffMinutes = diffMs / (1000 * 60);

    if (diffMinutes <= 0) return "Due now";
    const hours = Math.floor(diffMinutes / 60);
    const minutes = Math.floor(diffMinutes % 60);

    if (hours > 0)
      return `Due in ${hours} hour${hours > 1 ? "s" : ""} ${minutes} min`;
    else return `Due in ${minutes} min`;
  };

  const getCardStyle = (reminderTime) => {
    const [hour, minute] = reminderTime.split(":").map(Number);
    const now = new Date();
    const reminderDate = new Date();
    reminderDate.setHours(hour, minute, 0, 0);

    const diffMs = reminderDate - now;
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours <= 1 && diffHours > 0)
      return "border-l-red-700 bg-red-100 text-red-900";
    else if (diffHours <= 2 && diffHours > 1)
      return "border-l-red-600 bg-amber-200 text-red-700";
    else return "border-l-blue-500 bg-blue-50 text-blue-900";
  };

  const isLessThanOneHour = (reminderTime) => {
    const [hour, minute] = reminderTime.split(":").map(Number);
    const now = new Date();
    const reminderDate = new Date();
    reminderDate.setHours(hour, minute, 0, 0);
    const diffMs = reminderDate - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours <= 1 && diffHours > 0;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setMedications((prev) => [...prev]);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const takenCount = medications.filter((m) =>
    isTimePassed(m.reminderTime)
  ).length;
  const totalCount = medications.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {showForm && (
        <div className="max-w-3xl mx-auto px-4 py-4">
          <MedicationForm
            onAddMedication={handleAddMedication}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* ✅ Top Bar */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-start px-4 sm:px-8 py-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
        >
          + Add New Medication
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* ✅ Left Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-left mb-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  Today's Medications
                </h2>
                {totalCount > 0 && (
                  <p className="text-sm font-semibold text-gray-600">
                    {takenCount} of {totalCount} taken
                  </p>
                )}
              </div>

              <div className="space-y-3">
                {medications.length > 0 ? (
                  medications.map((med, index) => {
                    const isTaken = isTimePassed(med.reminderTime);

                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 rounded-lg border hover:shadow-md bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          {isTaken ? (
                            <div className="w-5 h-5 flex items-center justify-center bg-green-600 rounded">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <Square className="w-5 h-5 text-gray-400" />
                          )}

                          <div>
                            <h3
                              className={`font-medium flex items-center gap-2 ${
                                isTaken
                                  ? "text-gray-500 line-through"
                                  : "text-gray-900"
                              }`}
                            >
                              <Pill className="text-blue-600 w-5 h-5" />
                              {med.name}
                            </h3>
                            <div className="flex flex-row gap-2 text-sm text-gray-600 items-center">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <p>{formatTime(med.reminderTime)}</p>
                              <span>•</span>
                              <p>{med.dosage}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          {isTaken ? (
                            <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                              Taken
                            </span>
                          ) : (
                            <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No medications yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* ✅ Right Section: Upcoming Reminders */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-24 p-4">
              <h2 className="text-gray-900 font-semibold mb-4">
                Upcoming Reminders
              </h2>
              <div className="space-y-3">
                {medications.length > 0 ? (
                  medications.map((reminder, index) => {
                    const remaining = getRemainingTime(reminder.reminderTime);
                    const cardStyle = getCardStyle(reminder.reminderTime);
                    const urgent = isLessThanOneHour(reminder.reminderTime);

                    return (
                      <div
                        key={index}
                        className={`flex flex-col gap-2 border-l-4 rounded-lg p-4 transition-all duration-200 ${cardStyle}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-medium">
                            {/* ✅ Bell for >1 hr, ClockAlert for ≤1 hr */}
                            {urgent ? (
                              <ClockAlert className="w-4 h-4 text-red-700" />
                            ) : (
                              <Bell className="w-4 h-4 text-blue-700" />
                            )}
                            {reminder.name}
                          </div>
                          <span
                            className={`text-sm font-semibold ${
                              urgent ? "text-red-800" : "text-blue-700"
                            }`}
                          >
                            {remaining}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4" />
                          <p>{formatTime(reminder.reminderTime)}</p>
                          <span>•</span>
                          <p>{reminder.dosage}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-sm">
                    No upcoming reminders.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
