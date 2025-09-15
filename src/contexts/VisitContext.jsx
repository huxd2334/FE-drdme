import React, { createContext, useContext, useState } from "react";
import { visitService } from "../services/visitService";
import { imageService } from "../services/imageService";

const VisitContext = createContext();

export const VisitProvider = ({ children }) => {
  const [visits, setVisits] = useState(visitService.getAll());
  const [images, setImages] = useState(imageService.getAll());

  const refresh = () => {
    setVisits(visitService.getAll());
    setImages(imageService.getAll());
  };

  return (
    <VisitContext.Provider value={{ visits, images, refresh }}>
      {children}
    </VisitContext.Provider>
  );
};

export const useVisits = () => useContext(VisitContext);
