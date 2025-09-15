import React, { createContext, useContext, useState } from "react";
import { patientService } from "../services/patientService";

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState(patientService.getAll());
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const refresh = () => setPatients(patientService.getAll());

  return (
    <PatientContext.Provider
      value={{ patients, selectedPatientId, setSelectedPatientId, refresh }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => useContext(PatientContext);
