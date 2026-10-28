import { useCallback, useEffect, useState } from 'react';
import { clearSubmission, loadSubmission, saveSubmission } from '../services/storage';
import type { FormValues, Submission } from '../types/form';

/** Mirrors the persisted submission in state: loads it on mount, and keeps state in sync on save/clear. */
export function useSubmissionStorage() {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadSubmission()
      .then((stored) => active && setSubmission(stored))
      .catch(() => active && setLoadError('Não foi possível ler os dados salvos.'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const save = useCallback(async (values: FormValues) => {
    setSubmission(await saveSubmission(values));
  }, []);

  const clear = useCallback(async () => {
    await clearSubmission();
    setSubmission(null);
  }, []);

  return { submission, loading, loadError, save, clear };
}
