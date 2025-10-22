import React, { useState } from "react";

export default function MedicationForm({ onAddMedication }) {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    reminderTime: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.dosage || !formData.reminderTime) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    onAddMedication(formData);
    setFormData({
      name: "",
      dosage: "",
      frequency: "",
      startDate: "",
      endDate: "",
      reminderTime: "",
      notes: "",
    });
  };

  return (
    <div className="bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                <path d="m8.5 8.5 7 7" />
              </svg>
            </div>
            <span className="text-blue-900 text-lg font-semibold">
              Medication Reminder
            </span>
          </div>
        </div>
      </nav>

      {/* Form */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Add New Medication
        </h1>
        <p className="text-gray-600 mb-6">
          Enter medication details and set reminders.
        </p>

        <form
          className="bg-white border rounded-xl p-6 shadow-sm space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Medication Name */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Medication Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Lisinopril"
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:bg-white"
            />
          </div>

          {/* Dosage & Frequency */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="dosage"
              >
                Dosage *
              </label>
              <input
                type="text"
                id="dosage"
                value={formData.dosage}
                onChange={handleChange}
                placeholder="e.g., 10mg"
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:bg-white"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="frequency"
              >
                Frequency *
              </label>
              <select
                id="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:bg-white"
              >
                <option value="">Select frequency</option>
                <option value="once">Once daily</option>
                <option value="twice">Twice daily</option>
                <option value="three">Three times daily</option>
                <option value="weekly">Once weekly</option>
                <option value="as-needed">As needed</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="startDate"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:bg-white"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="endDate"
              >
                End Date (Optional)
              </label>
              <input
                type="date"
                id="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:bg-white"
              />
            </div>
          </div>

          {/* Reminder Time */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="reminderTime"
            >
              Reminder Time *
            </label>
            <input
              type="time"
              id="reminderTime"
              value={formData.reminderTime}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:bg-white"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Add any notes or doctor's instructions..."
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:bg-white resize-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition"
            >
              Save Medication
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: "",
                  dosage: "",
                  frequency: "",
                  startDate: "",
                  endDate: "",
                  reminderTime: "",
                  notes: "",
                });
                if (onCancel) onCancel(); // ✅ Hide form effect
              }}
              className="border border-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
