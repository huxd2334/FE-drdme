import { storageService } from "./storageService";
const KEY = "analyses";

export const analysisService = {
  getAll: () => storageService.get(KEY, []),
  listByVisit: (visitId) =>
    analysisService.getAll().filter((a) => a.visitId === visitId),
  runMock: (visitId, imageId) => {
    const result = {
      id: `AN${Date.now()}`,
      visitId,
      imageId,
      drLevel: ["None", "Mild", "Moderate", "Severe"][
        Math.floor(Math.random() * 4)
      ],
      dme: Math.random() > 0.5,
      createdAt: new Date().toISOString(),
    };
    const all = analysisService.getAll();
    storageService.set(KEY, [...all, result]);
    return result;
  },
};
