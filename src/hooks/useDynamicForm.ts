import { useCallback, useMemo, useState } from 'react';
import type { FieldValue, FormConfig, FormErrors, FormValues } from '../types/form';
import { buildInitialValues, validateForm } from '../utils/validation';

/**
 * Holds the values/errors of a form described by `config`. `submit` validates first and only calls
 * `onValid` (and resets the form) when there are no errors; it resolves to whether the form was valid.
 */
export function useDynamicForm(config: FormConfig, onValid: (values: FormValues) => Promise<void>) {
  const initialValues = useMemo(() => buildInitialValues(config), [config]);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const setValue = useCallback((id: string, value: FieldValue) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const submit = useCallback(async (): Promise<boolean> => {
    const found = validateForm(config, values);
    setErrors(found);
    if (Object.keys(found).length > 0) return false;
    await onValid(values);
    setValues(initialValues);
    return true;
  }, [config, values, initialValues, onValid]);

  return { values, errors, setValue, submit };
}
