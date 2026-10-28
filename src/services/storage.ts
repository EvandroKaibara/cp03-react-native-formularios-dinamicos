import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FormValues, Submission } from '../types/form';

const STORAGE_KEY = '@cp03/submission';

function isSubmission(data: unknown): data is Submission {
  if (typeof data !== 'object' || data === null) return false;
  const { submittedAt, values } = data as Record<string, unknown>;
  return typeof submittedAt === 'string' && typeof values === 'object' && values !== null;
}

export async function saveSubmission(values: FormValues): Promise<Submission> {
  const submission: Submission = { submittedAt: new Date().toISOString(), values };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(submission));
  return submission;
}

export async function loadSubmission(): Promise<Submission | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw === null) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isSubmission(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function clearSubmission(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
