import { storageService } from "./storageService";

const KEY = "visits";

export const visitService = {
  getAll() {
    return storageService.get(KEY, []);
  },

  getById(id) {
    const all = storageService.get(KEY, []);
    return all.find((v) => v.id === id) || null;
  },

  listByPatient(patientId) {
    const all = storageService.get(KEY, []);
    return all.filter((v) => v.patientId === patientId);
  },

  create(patientId, visit) {
    const all = storageService.get(KEY, []);
    const newVisit = {
      ...visit,
      id: visit.id || `V${Date.now()}`, // auto id nếu chưa có
      patientId,
    };
    storageService.set(KEY, [...all, newVisit]);
    return newVisit;
  },

  update(id, patch) {
    const all = storageService.get(KEY, []);
    const updated = all.map((v) => (v.id === id ? { ...v, ...patch } : v));
    storageService.set(KEY, updated);
    return updated.find((v) => v.id === id) || null;
  },

  remove(id) {
    const all = storageService.get(KEY, []);
    const filtered = all.filter((v) => v.id !== id);
    storageService.set(KEY, filtered);
    return filtered;
  },
};
