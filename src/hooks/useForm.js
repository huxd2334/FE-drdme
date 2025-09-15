import { useCallback, useMemo, useState } from 'react';

/**
 * useForm({ initialValues, validate, onSubmit })
 * - validate: (values) => ({ field: 'message', ... }) | {}
 * - onSubmit: async (values) => { ... }
 */
export default function useForm({
  initialValues = {},
  validate,
  onSubmit,
}) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // tiện ích
  const isDirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(initialValues),
    [values, initialValues]
  );

  const runValidate = useCallback(
    (v) => {
      if (!validate) return {};
      try {
        const out = validate(v) || {};
        setErrors(out);
        return out;
      } catch (e) {
        // nếu validate ném exception, giữ an toàn
        setErrors({ _form: 'Validation error' });
        return { _form: 'Validation error' };
      }
    },
    [validate]
  );

  const setFieldValue = useCallback((name, val) => {
    setValues((prev) => ({ ...prev, [name]: val }));
  }, []);

  const handleChange = useCallback((name) => (e) => {
    const val = e?.target ? e.target.value : e;
    setValues((prev) => ({ ...prev, [name]: val }));
  }, []);

  const handleBlur = useCallback((name) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    runValidate({ ...values });
  }, [runValidate, values]);

  const resetForm = useCallback((nextValues = initialValues) => {
    setValues(nextValues);
    setTouched({});
    setErrors({});
    setSubmitError(null);
  }, [initialValues]);

  const mapBackendError = (err) => {
    // ví dụ NestJS: { status, message: ["name should not be empty", ...] }
    const data = err?.data || err;
    if (Array.isArray(data?.message)) {
      // có thể parse theo pattern "field xyz ..." để gán đúng field
      const fieldErrors = {};
      for (const m of data.message) {
        const lower = String(m).toLowerCase();
        if (lower.includes('name')) fieldErrors.name = m;
        else if (lower.includes('price')) fieldErrors.price = m;
        else if (lower.includes('quantity')) fieldErrors.quantity = m;
        else if (lower.includes('categoryid')) fieldErrors.categoryId = m;
        else fieldErrors._form = (fieldErrors._form ? fieldErrors._form + '; ' : '') + m;
      }
      return fieldErrors;
    }
    if (typeof data?.message === 'string') return { _form: data.message };
    return { _form: 'Submission failed' };
  };

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault?.();
    setSubmitError(null);

    const currentErrors = runValidate(values);
    const hasError = Object.values(currentErrors).some(Boolean);
    if (hasError) {
      // mark all touched để hiện lỗi
      const allTouched = Object.keys(values).reduce((acc, k) => ((acc[k] = true), acc), {});
      setTouched((prev) => ({ ...allTouched, ...prev }));
      return;
    }

    if (!onSubmit) return;

    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      const mapped = mapBackendError(err);
      setErrors((prev) => ({ ...prev, ...mapped }));
      setSubmitError(mapped._form || null);
      throw err; // cho caller biết nếu cần
    } finally {
      setSubmitting(false);
    }
  }, [values, onSubmit, runValidate]);

  return {
    values,
    setValues,
    errors,
    touched,
    submitting,
    submitError,
    isDirty,

    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
    runValidate, // exposed nếu muốn validate tay
  };
}
