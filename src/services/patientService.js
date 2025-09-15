import { storageService } from "./storageService";

const KEY = "patients";

export const patientService = {
  getAll() {
    return storageService.get(KEY, []);
  },

  getById(id) {
    const all = storageService.get(KEY, []);
    return all.find((p) => p.id === id) || null;
  },

  create(patient) {
    const all = storageService.get(KEY, []);
    const newPatient = {
      ...patient,
      id: patient.id || `BN${Date.now()}`, // auto id nếu chưa có
    };
    storageService.set(KEY, [...all, newPatient]);
    return newPatient;
  },

  update(id, patch) {
    const all = storageService.get(KEY, []);
    const updated = all.map((p) => (p.id === id ? { ...p, ...patch } : p));
    storageService.set(KEY, updated);
    return updated.find((p) => p.id === id) || null;
  },

  remove(id) {
    const all = storageService.get(KEY, []);
    const filtered = all.filter((p) => p.id !== id);
    storageService.set(KEY, filtered);
    return filtered;
  },
};
