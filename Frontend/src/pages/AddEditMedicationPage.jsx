import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMedications } from "../components/MedicationContext";
import { useTheme } from "../components/ThemeContext"; 

export default function AddEditMedicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme(); 
  const { medications, addMedication, updateMedication, deleteMedication } = useMedications();

  const isEdit = !!id;
  const medicationToEdit = medications.find((m) => String(m.id) === String(id));

  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time: "08:00",
    startDate: "",
    endDate: "",
    notes: "",
    reminderTimes: [],
  });

  useEffect(() => {
    if (isEdit && medicationToEdit) {
      setFormData({
        name: medicationToEdit.name || "",
        dosage: medicationToEdit.dosage || "",
        frequency: medicationToEdit.frequency || "",
        time: medicationToEdit.time || "08:00",
        startDate: medicationToEdit.startDate || "",
        endDate: medicationToEdit.endDate || "",
        notes: medicationToEdit.notes || "",
        reminderTimes: medicationToEdit.reminderTimes || [medicationToEdit.time || "08:00"],
      });
    }
  }, [isEdit, medicationToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dosage || !formData.frequency || !formData.time) {
      alert("Please fill in all required fields");
      return;
    }

    if (isEdit) {
      updateMedication(Number(id), formData);
      alert("Medication updated successfully!");
    } else {
      addMedication(formData);
      alert("Medication added successfully!");
    }

    navigate("/medications");
  };

  const handleDelete = () => {
    if (isEdit && window.confirm("Are you sure you want to delete this medication?")) {
      deleteMedication(id);
      alert("Medication deleted successfully!");
      navigate("/medications");
    }
  };

  // Dynamic theme-based styles
  const pageBg = theme === "dark" ? "bg-[#0f172a]" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-[#1e293b]" : "bg-white";
  const textPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const inputBorder = theme === "dark" ? "border-gray-600" : "border-gray-300";
  const inputBg = theme === "dark" ? "bg-[#1e293b]" : "bg-white";
  const inputText = theme === "dark" ? "text-gray-100" : "text-gray-900";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start px-4 py-10 ${pageBg} transition-colors duration-200`}>
      <div className={`w-full max-w-2xl ${cardBg} shadow-md rounded-lg p-6 md:p-8 border ${borderColor}`}>
        <h2 className={`text-xl font-semibold mb-1 ${textPrimary}`}>
          {isEdit ? "Edit Medication" : "Add New Medication"}
        </h2>
        <p className={`text-sm mb-6 ${textSecondary}`}>
          Enter medication details and set reminders
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Medication Name */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>
              Medication Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Lisinopril"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full rounded-md border ${inputBorder} ${inputBg} ${inputText} px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
              required
            />
          </div>

          {/* Dosage & Frequency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>
                Dosage <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 10mg"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                className={`w-full rounded-md border ${inputBorder} ${inputBg} ${inputText} px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>
                Frequency <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className={`w-full rounded-md border ${inputBorder} ${inputBg} ${inputText} px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                required
              >
                <option value="">Select frequency</option>
                <option value="Once daily">Once daily</option>
                <option value="Twice daily">Twice daily</option>
                <option value="Three times daily">Three times daily</option>
                <option value="Four times daily">Four times daily</option>
                <option value="Once weekly">Once weekly</option>
                <option value="As needed">As needed</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className={`w-full rounded-md border ${inputBorder} ${inputBg} ${inputText} px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>
                End Date (Optional)
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className={`w-full rounded-md border ${inputBorder} ${inputBg} ${inputText} px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
              />
            </div>
          </div>

          {/* Reminder Time */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>
              Reminder Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value, reminderTimes: [e.target.value] })
              }
              className={`w-full rounded-md border ${inputBorder} ${inputBg} ${inputText} px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
              required
            />
            <p className={`text-xs mt-1 ${textSecondary}`}>
              Set when you want to be reminded to take this medication
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>
              Notes
            </label>
            <textarea
              placeholder="Add any notes, side effects, or doctor’s instructions..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className={`w-full rounded-md border ${inputBorder} ${inputBg} ${inputText} px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-5 py-2 transition"
            >
              {isEdit ? "Save Changes" : "Save Medication"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/medications")}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 border ${inputBorder} ${textPrimary} font-medium rounded-md px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
            >
              Cancel
            </button>

            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md px-5 py-2 transition"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
