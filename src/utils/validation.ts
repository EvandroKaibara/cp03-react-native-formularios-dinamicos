import type { FieldValue, FormConfig, FormErrors, FormField, FormValues } from '../types/form';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function buildInitialValues(config: FormConfig): FormValues {
  const values: FormValues = {};
  for (const field of config.fields) {
    values[field.id] = field.type === 'checkbox' || field.type === 'switch' ? false : '';
  }
  return values;
}

/**
 * Per-type rules for `required`:
 * - switch: always answered (off is a valid answer), so it never blocks submission;
 * - checkbox: must be checked (e.g. accepting terms);
 * - everything else: must be non-blank.
 * Format rules (email, number, date) apply whenever a value is typed, required or not.
 */
export function validateField(field: FormField, value: FieldValue | undefined): string | null {
  if (field.type === 'switch') return null;

  if (field.type === 'checkbox') {
    return field.required && value !== true ? 'É necessário marcar esta opção.' : null;
  }

  const text = typeof value === 'string' ? value.trim() : '';
  if (text === '') return field.required ? 'Campo obrigatório.' : null;

  switch (field.type) {
    case 'email':
      return EMAIL_PATTERN.test(text) ? null : 'Informe um e-mail válido.';
    case 'number':
      return Number.isFinite(Number(text.replace(',', '.'))) ? null : 'Informe um número válido.';
    case 'password':
      return text.length >= 6 ? null : 'A senha deve ter ao menos 6 caracteres.';
    case 'date':
      return DATE_PATTERN.test(text) && !Number.isNaN(Date.parse(text)) ? null : 'Informe uma data válida.';
    case 'select':
    case 'combo':
    case 'radio':
      return field.options.some((option) => option.value === text) ? null : 'Escolha uma das opções.';
    default:
      return null;
  }
}

export function validateForm(config: FormConfig, values: FormValues): FormErrors {
  const errors: FormErrors = {};
  for (const field of config.fields) {
    const message = validateField(field, values[field.id]);
    if (message) errors[field.id] = message;
  }
  return errors;
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}

/** Human-readable value for the results panel (option labels, Sim/Não, masked password). */
export function formatValue(field: FormField, value: FieldValue | undefined): string {
  if (value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  switch (field.type) {
    case 'password':
      return '•'.repeat(value.length);
    case 'date':
      return formatDate(value);
    case 'select':
    case 'combo':
    case 'radio':
      return field.options.find((option) => option.value === value)?.label ?? value;
    default:
      return value;
  }
}
