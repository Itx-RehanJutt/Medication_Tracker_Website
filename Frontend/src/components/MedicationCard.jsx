import React from "react";
import { Clock, Pill } from "lucide-react";
import { useTheme } from "./ThemeContext"; 

export function MedicationCard({ name, dosage, time, taken, onToggle }) {
  const { theme } = useTheme(); 

  //  Theme-based styles
  const cardBg = theme === "dark" ? "bg-[#1e293b]" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const textPrimary = theme === "dark" ? "text-white" : "text-black";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <div
      className={`transition-all hover:shadow-md rounded-lg border p-4 ${cardBg} ${borderColor} ${
        taken ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={taken}
          onChange={onToggle}
          className="h-5 w-5 accent-green-600"
        />

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Pill className="text-blue-600 dark:text-blue-400 h-4 w-4" />
            <h3
              className={`${taken ? "line-through opacity-70" : ""} ${textPrimary}`}
            >
              {name}
            </h3>
          </div>

          <div className={`flex items-center gap-3 text-sm ${textSecondary}`}>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{time}</span>
            </div>
            <span>•</span>
            <span>{dosage}</span>
          </div>
        </div>

        {/* Status Badge */}
        {taken ? (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-300">
            Taken
          </span>
        ) : (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
            Pending
          </span>
        )}
      </div>
    </div>
  );
}
