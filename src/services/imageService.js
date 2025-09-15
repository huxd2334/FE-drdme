import { storageService } from "./storageService";

const KEY = "images";

export const imageService = {
  getAll() {
    return storageService.get(KEY, []);
  },

  getById(id) {
    const all = storageService.get(KEY, []);
    return all.find((img) => img.id === id) || null;
  },

  listByVisit(visitId) {
    const all = storageService.get(KEY, []);
    return all.filter((img) => img.visitId === visitId);
  },

  create(visitId, image) {
    const all = storageService.get(KEY, []);
    const newImg = {
      ...image,
      id: image.id || `IMG${Date.now()}`, // auto id
      visitId,
    };
    storageService.set(KEY, [...all, newImg]);
    return newImg;
  },

  update(id, patch) {
    const all = storageService.get(KEY, []);
    const updated = all.map((img) => (img.id === id ? { ...img, ...patch } : img));
    storageService.set(KEY, updated);
    return updated.find((img) => img.id === id) || null;
  },

  remove(id) {
    const all = storageService.get(KEY, []);
    const filtered = all.filter((img) => img.id !== id);
    storageService.set(KEY, filtered);
    return filtered;
  },
};
