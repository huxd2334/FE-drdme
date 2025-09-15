import { useMemo, useCallback } from "react";
import { useVisits as useVisitsCtx } from "../contexts/VisitContext";
import { imageService } from "../services/imageService";

export function useImages(visitId) {
  const { images, refresh } = useVisitsCtx();

  const list = useMemo(
    () => (visitId ? images.filter((i) => i.visitId === visitId) : images),
    [images, visitId]
  );

  const add = useCallback((payload) => {
    if (!visitId) throw new Error("useImages: missing visitId");
    const img = imageService.create(visitId, payload);
    refresh();
    return img;
  }, [visitId, refresh]);

  const update = useCallback((id, patch) => {
    const img = imageService.update(id, patch);
    refresh();
    return img;
  }, [refresh]);

  const remove = useCallback((id) => {
    imageService.remove(id);
    refresh();
  }, [refresh]);

  return { images: list, add, update, remove, refresh };
}
