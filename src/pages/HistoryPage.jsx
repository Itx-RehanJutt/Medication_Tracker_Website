import React, { useState } from "react";
import { CheckCircle2, XCircle, List, Calendar, Filter } from "lucide-react";
import { useMedications } from "../components/MedicationContext";
import { useTheme } from "../components/ThemeContext"; 

export default function HistoryPage() {
  const [selectedTab, setSelectedTab] = useState("list");
  const [filterMedication, setFilterMedication] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const { medications } = useMedications();
  const { theme } = useTheme(); 

  // Prepare history data
  const historyData = medications.map((med) => ({
    id: med.id,
    date: med.date || new Date().toISOString().split("T")[0],
    medication: med.name,
    dosage: med.dosage,
    time: med.time,
    status: med.taken ? "taken" : "not-taken",
  }));

  const medicationNames = ["all", ...new Set(medications.map((m) => m.name))];

  const filteredHistory =
    filterMedication === "all"
      ? historyData
      : historyData.filter((entry) => entry.medication === filterMedication);

  const takenCount = historyData.filter((h) => h.status === "taken").length;
  const totalCount = historyData.length;
  const adherenceRate =
    totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

  // Group by date
  const groupedByDate = filteredHistory.reduce((acc, entry) => {
    acc[entry.date] = acc[entry.date] || [];
    acc[entry.date].push(entry);
    return acc;
  }, {});

  // Calendar logic
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const daysArray = [];
  for (let i = 0; i < firstDayOfMonth; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    daysArray.push(date);
  }

  const handleSelectDate = (date) => {
    if (date) setSelectedDate(date);
  };

  const getStatusBadge = (status) => (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${
        status === "taken"
          ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-100"
          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
      }`}
    >
      {status === "taken" ? "Taken" : "Not Taken"}
    </span>
  );

  const getStatusIcon = (status) =>
    status === "taken" ? (
      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
    ) : (
      <XCircle className="h-5 w-5 text-gray-400 dark:text-gray-300" />
    );

  return (
    <main
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen transition-colors duration-300
      ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}
      `}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Medication History</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your medication usage over time
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            title: "Total Medications",
            value: totalCount,
            color: "blue",
            icon: <List className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
          },
          {
            title: "Taken Today",
            value: takenCount,
            color: "green",
            icon: <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />,
          },
          {
            title: "Adherence Rate",
            value: `${adherenceRate}%`,
            color: "purple",
            icon: <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`border p-4 rounded-xl shadow-sm transition-all
            ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.title}</p>
                <p className="text-2xl font-semibold mt-1">{card.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${card.color}-100 dark:bg-${card.color}-900`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter + Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="relative w-full sm:w-auto">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={filterMedication}
            onChange={(e) => setFilterMedication(e.target.value)}
            className={`pl-9 pr-4 py-2 w-full sm:w-auto border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none
              ${theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-300 text-gray-700"}
            `}
          >
            {medicationNames.map((med) => (
              <option key={med} value={med}>
                {med === "all" ? "All Medications" : med}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => setSelectedTab("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                selectedTab === "list"
                  ? "bg-blue-600 text-white"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            <List className="h-4 w-4" /> List View
          </button>

          <button
            onClick={() => setSelectedTab("calendar")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                selectedTab === "calendar"
                  ? "bg-blue-600 text-white"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            <Calendar className="h-4 w-4" /> Calendar View
          </button>
        </div>
      </div>

      {/* === List View === */}
      {selectedTab === "list" && (
        <div className="space-y-3">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((entry) => (
              <div
                key={entry.id}
                className={`p-4 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 border transition-all
                ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  {getStatusIcon(entry.status)}
                  <div>
                    <h3 className="font-medium">{entry.medication}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Scheduled: {entry.time} • {entry.dosage}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Date: {entry.date}
                    </p>
                  </div>
                </div>
                {getStatusBadge(entry.status)}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No history found</p>
          )}
        </div>
      )}

      {/* === Calendar View === */}
      {selectedTab === "calendar" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div
            className={`rounded-xl p-6 shadow-sm border
            ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <h3 className="mb-4">
              {monthName} {year}
            </h3>
            <div className="grid grid-cols-7 gap-2 text-center font-medium mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {daysArray.map((date, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectDate(date)}
                  className={`h-20 border rounded-lg p-1 cursor-pointer flex flex-col items-start justify-start transition-all
                    ${
                      theme === "dark"
                        ? "border-gray-700"
                        : "border-gray-200"
                    }
                    ${
                      selectedDate === date
                        ? "bg-blue-100 dark:bg-blue-900 border-blue-500"
                        : groupedByDate[date]
                        ? "bg-blue-50 dark:bg-blue-800"
                        : ""
                    }`}
                >
                  {date && (
                    <div className="text-xs font-semibold mb-1">
                      {new Date(date).getDate()}
                    </div>
                  )}
                  <div className="flex flex-col gap-1 w-full">
                    {groupedByDate[date]?.map((item) => (
                      <div
                        key={item.id}
                        className={`text-[10px] px-2 py-1 rounded-md truncate ${
                          item.status === "taken"
                            ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {item.medication}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Date List */}
          <div
            className={`rounded-xl p-6 shadow-sm border
            ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <h3 className="mb-4">
              {selectedDate
                ? new Date(selectedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Select a Date"}
            </h3>
            <div className="space-y-3">
              {selectedDate && groupedByDate[selectedDate] ? (
                groupedByDate[selectedDate].map((entry) => (
                  <div
                    key={entry.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    {getStatusIcon(entry.status)}
                    <div className="flex-1">
                      <p>{entry.medication}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {entry.time} • {entry.dosage}
                      </p>
                    </div>
                    {getStatusBadge(entry.status)}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No medications for this date
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
