import React, { createContext, useContext, useState, useEffect } from "react";

const MedicationContext = createContext();

export function MedicationProvider({ children }) {
  // Load initial medications from localStorage or empty array
  const [medications, setMedications] = useState(() => {
    const storedMeds = localStorage.getItem("medications");
    return storedMeds ? JSON.parse(storedMeds) : [];
  });

  // Save medications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("medications", JSON.stringify(medications));
  }, [medications]);

  const addMedication = (medication) => {
    const newMedication = {
      ...medication,
      id: medications.length > 0 ? Math.max(...medications.map(m => m.id)) + 1 : 1,
      taken: false,
      lastTaken: "Never",
    };
    setMedications([...medications, newMedication]);
  };

  const updateMedication = (id, updatedData) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, ...updatedData } : med
    ));
  };

  const deleteMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const toggleMedicationTaken = (id) => {
    setMedications(medications.map(med => 
      med.id === id 
        ? { 
            ...med, 
            taken: !med.taken,
            lastTaken: !med.taken
              ? new Date().toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
              : med.lastTaken,
          } 
        : med
    ));
  };

  return (
    <MedicationContext.Provider value={{
      medications,
      addMedication,
      updateMedication,
      deleteMedication,
      toggleMedicationTaken
    }}>
      {children}
    </MedicationContext.Provider>
  );
}

export function useMedications() {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error("useMedications must be used within MedicationProvider");
  }
  return context;
}
