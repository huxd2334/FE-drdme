import { patients, visits, images, analyses } from "./mock_data";
import { storageService } from "../services/storageService";

export function initStorage() {
  if (!storageService.get("patients")) {
    storageService.set("patients", patients);
  }
  if (!storageService.get("visits")) {
    storageService.set("visits", visits);
  }
  if (!storageService.get("images")) {
    storageService.set("images", images);
  }
  if (!storageService.get("analyses")) {
    storageService.set("analyses", analyses);
  }
}
