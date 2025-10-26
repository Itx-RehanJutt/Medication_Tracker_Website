import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMedications } from "../components/MedicationContext";
import { Edit, Trash2, Pill, Search } from "lucide-react";
import { useTheme } from "../components/ThemeContext"; 

export default function MedicationListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { medications, deleteMedication } = useMedications();
  const { theme } = useTheme(); 
  const navigate = useNavigate();

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.dosage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteMedication(id);
      alert(`${name} has been deleted`);
    }
  };

  const handleEdit = (id) => {
    navigate(`/medications/edit/${id}`);
  };

  // Theme-based dynamic classes
  const pageBg = theme === "dark" ? "bg-[#0f172a]" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-[#1e293b]" : "bg-white";
  const textPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const tableHeader = theme === "dark" ? "bg-[#334155] text-gray-300" : "bg-blue-50 text-gray-700";
  const tableHover = theme === "dark" ? "hover:bg-[#334155]" : "hover:bg-gray-50";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const inputBg =
    theme === "dark"
      ? "bg-[#1e293b] border-gray-600 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400";

  return (
    <main className={`min-h-screen ${pageBg} transition-colors px-4 sm:px-6 lg:px-8 py-8`}>
      {/* Page Heading */}
      <div className="mb-8">
        <h1 className={`text-2xl font-semibold mb-1 ${textPrimary}`}>All Medications</h1>
        <p className={`${textSecondary}`}>Manage your medication list</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
              theme === "dark" ? "text-gray-400" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            placeholder="Search medications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className={`hidden md:block ${cardBg} rounded-lg shadow-sm overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${tableHeader} border-b ${borderColor}`}>
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium">Medication Name</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Dosage & Frequency</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Last Taken</th>
                <th className="text-right px-6 py-4 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${borderColor}`}>
              {filteredMedications.map((med) => (
                <tr key={med.id} className={`${tableHover} transition-colors`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                        <Pill className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className={`${textPrimary}`}>{med.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className={`${textPrimary}`}>{med.dosage}</div>
                      <div className={`text-sm ${textSecondary}`}>{med.frequency}</div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-sm ${textSecondary}`}>{med.lastTaken}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(med.id)}
                        className="p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(med.id, med.name)}
                        className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredMedications.map((med) => (
          <div key={med.id} className={`${cardBg} rounded-lg shadow-sm p-4`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                  <Pill className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className={`font-medium ${textPrimary}`}>{med.name}</h3>
                  <p className={`text-sm ${textSecondary}`}>{med.dosage}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(med.id)}
                  className="p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(med.id, med.name)}
                  className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className={`flex justify-between ${textSecondary}`}>
                <span>Frequency:</span>
                <span className={`${textPrimary}`}>{med.frequency}</span>
              </div>
              <div className={`flex justify-between ${textSecondary}`}>
                <span>Last Taken:</span>
                <span className={`${textPrimary}`}>{med.lastTaken}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMedications.length === 0 && (
        <div className="text-center py-12">
          <p className={`${textSecondary}`}>
            {searchQuery
              ? `No medications found matching "${searchQuery}"`
              : "No medications yet. Add your first medication!"}
          </p>
        </div>
      )}
    </main>
  );
}
