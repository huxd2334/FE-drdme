import React, { createContext, useContext, useState } from "react";
import { compareService } from "../services/compareService";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [leftVisit, setLeftVisit] = useState(null);
  const [rightVisit, setRightVisit] = useState(null);
  const [diff, setDiff] = useState(null);

  const runCompare = () => {
    if (leftVisit && rightVisit) {
      const result = compareService.diffVisits(leftVisit, rightVisit);
      setDiff(result);
    }
  };

  return (
    <CompareContext.Provider
      value={{ leftVisit, rightVisit, setLeftVisit, setRightVisit, diff, runCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
