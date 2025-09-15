import { useMemo, useCallback } from "react";
import { useAnalysis as useAnalysisCtx } from "../contexts/AnalysisContext";
import { analysisService } from "../services/analysisService";

export function useAnalysis(visitId) {
  const { analyses, runAnalysis } = useAnalysisCtx();

  const list = useMemo(
    () => (visitId ? analyses.filter((a) => a.visitId === visitId) : analyses),
    [analyses, visitId]
  );

  const run = useCallback(
    (imageId) => {
      if (!visitId) throw new Error("useAnalysis: missing visitId");
      return runAnalysis(visitId, imageId); // dùng mock trong context
    },
    [visitId, runAnalysis]
  );

  const reload = useCallback(() => analysisService.getAll(), []);

  return { analyses: list, run, reload };
}
