import React from "react";
import { Plus } from "lucide-react";
import { MedicationCard } from "../components/MedicationCard";
import { ReminderCard } from "../components/ReminderCard";
import {
  MedicationProvider,
  useMedications,
} from "../components/MedicationContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext"; 

function HomePage() {
  const { medications, toggleMedicationTaken } = useMedications();
  const { theme } = useTheme(); 
  const navigate = useNavigate();

  // Sort medications by time
  const todaysMedications = medications.slice().sort((a, b) => {
    const timeA = a.time || "00:00";
    const timeB = b.time || "00:00";
    return timeA.localeCompare(timeB);
  });

  // Upcoming reminders
  const upcomingReminders = medications
    .filter((m) => !m.taken)
    .slice(0, 3)
    .map((m) => ({
      id: m.id,
      medication: `${m.name} - ${m.dosage}`,
      time: m.time,
      dosage: m.dosage,
    }));

  // Theme-based dynamic classes
  const pageBg = theme === "dark" ? "bg-[#0f172a]" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-[#1e293b]" : "bg-white";
  const textPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const buttonBg =
    theme === "dark"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white";

  return (
    <main
      className={`min-h-screen ${pageBg} transition-colors px-4 sm:px-6 lg:px-8 py-8`}
    >
      {/* Add Medication Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/medications/add")}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition ${buttonBg}`}
        >
          <Plus className="h-5 w-5" />
          Add New Medication
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* === Today's Medications === */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`${cardBg} ${borderColor} border rounded-lg shadow-sm p-6`}>
            <div className="mb-6">
              <h2 className={`text-lg font-semibold mb-1 ${textPrimary}`}>
                Today's Medications
              </h2>
              <p className={`text-sm ${textSecondary}`}>
                {medications.filter((m) => m.taken).length} of{" "}
                {medications.length} taken
              </p>
            </div>

            <div className="space-y-3">
              {todaysMedications.length > 0 ? (
                todaysMedications.map((med) => (
                  <MedicationCard
                    key={med.id}
                    name={med.name}
                    dosage={med.dosage}
                    time={med.time}
                    taken={med.taken}
                    onToggle={() => toggleMedicationTaken(med.id)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className={`${textSecondary} mb-4`}>No medications yet</p>
                  <button
                    onClick={() => navigate("/medications/add")}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md ${buttonBg}`}
                  >
                    <Plus className="h-4 w-4" /> Add Your First Medication
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* === Upcoming Reminders === */}
        <div className="lg:col-span-1">
          <div
            className={`${cardBg} ${borderColor} border rounded-lg shadow-sm p-6 lg:sticky lg:top-24`}
          >
            <h2 className={`text-lg font-semibold mb-4 ${textPrimary}`}>
              Upcoming Reminders
            </h2>

            <div className="space-y-3">
              {upcomingReminders.length > 0 ? (
                upcomingReminders.map((r) => (
                  <ReminderCard
                    key={r.id}
                    medication={r.medication}
                    time={r.time}
                    dosage={r.dosage}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className={`${textSecondary} text-sm`}>
                    All caught up! No upcoming reminders.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// === Main Wrapper ===
export default function Home() {
  return (
    <MedicationProvider>
      <HomePage />
    </MedicationProvider>
  );
}
