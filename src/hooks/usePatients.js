import { useCallback, useMemo } from "react";
import { usePatients as usePatientsCtx } from "../contexts/PatientContext";
import { patientService } from "../services/patientService";

export function usePatients() {
  const { patients, selectedPatientId, setSelectedPatientId, refresh } = usePatientsCtx();

  const selectedPatient = useMemo(
    () => patients.find((p) => p.id === selectedPatientId) || null,
    [patients, selectedPatientId]
  );

  const add = useCallback((payload) => {
    const p = patientService.create(payload);
    refresh();
    return p;
  }, [refresh]);

  const update = useCallback((id, patch) => {
    const p = patientService.update(id, patch);
    refresh();
    return p;
  }, [refresh]);

  const remove = useCallback((id) => {
    patientService.remove(id);
    refresh();
  }, [refresh]);

  return {
    patients,
    selectedPatientId,
    selectedPatient,
    select: setSelectedPatientId,
    add,
    update,
    remove,
    refresh,
  };
}
