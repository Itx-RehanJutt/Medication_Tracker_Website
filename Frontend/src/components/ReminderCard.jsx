import React from "react";
import { AlertCircle, Bell } from "lucide-react";
import { useTheme } from "./ThemeContext"; 

export function ReminderCard({ medication, time, dosage, urgent = false }) {
  const { theme } = useTheme(); 

  // Theme-based colors
  const bgLight = urgent ? "bg-orange-200 text-orange-800" : "bg-blue-200 text-blue-800";
  const bgDark = urgent ? "bg-orange-900 text-orange-300" : "bg-blue-900 text-blue-300";
  const borderColor = urgent
    ? "border-l-orange-500 dark:border-l-orange-400"
    : "border-l-blue-500 dark:border-l-blue-400";

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border-l-4 transition-all duration-300
      ${borderColor} ${theme === "dark" ? bgDark : bgLight}`}
    >
      {urgent ? (
        <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-300 flex-shrink-0 mt-0.5" />
      ) : (
        <Bell className="w-5 h-5 text-blue-600 dark:text-blue-300 flex-shrink-0 mt-0.5" />
      )}

      <div className="flex-1 min-w-0">
        <p className="mb-1 font-medium truncate">{medication}</p>
        <p className="text-sm truncate opacity-90">
          {time} • {dosage}
        </p>
      </div>
    </div>
  );
}
