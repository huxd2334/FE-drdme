import React, { createContext, useContext, useState } from "react";
import { analysisService } from "../services/analysisService";

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [analyses, setAnalyses] = useState(analysisService.getAll());

  const runAnalysis = (visitId, imageId) => {
    const result = analysisService.runMock(visitId, imageId);
    setAnalyses(analysisService.getAll());
    return result;
  };

  return (
    <AnalysisContext.Provider value={{ analyses, runAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
