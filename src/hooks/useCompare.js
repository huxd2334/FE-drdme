import { useCallback } from "react";
import { useCompare as useCompareCtx } from "../contexts/CompareContext";

export function useCompare() {
  const { leftVisit, rightVisit, setLeftVisit, setRightVisit, diff, runCompare } = useCompareCtx();

  const setLeft = useCallback((id) => setLeftVisit(id), [setLeftVisit]);
  const setRight = useCallback((id) => setRightVisit(id), [setRightVisit]);
  const compare = useCallback(() => runCompare(), [runCompare]);

  return { leftVisit, rightVisit, setLeft, setRight, diff, compare };
}
