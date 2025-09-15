import { useMemo, useCallback } from "react";
import { useVisits as useVisitsCtx } from "../contexts/VisitContext";
import { visitService } from "../services/visitService";

export function useVisits(patientId) {
  const { visits, refresh } = useVisitsCtx();

  const list = useMemo(
    () => (patientId ? visits.filter((v) => v.patientId === patientId) : visits),
    [visits, patientId]
  );

  const add = useCallback((payload) => {
    if (!patientId) throw new Error("useVisits: missing patientId");
    const v = visitService.create(patientId, payload);
    refresh();
    return v;
  }, [patientId, refresh]);

  const update = useCallback((id, patch) => {
    const v = visitService.update(id, patch);
    refresh();
    return v;
  }, [refresh]);

  const remove = useCallback((id) => {
    visitService.remove(id);
    refresh();
  }, [refresh]);

  return { visits: list, add, update, remove, refresh };
}
