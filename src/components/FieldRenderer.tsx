import { useCallback } from 'react';
import type { FieldValue, FormField } from '../types/form';
import { displayLabel, FieldWrapper } from './FieldWrapper';
import { CheckboxField } from './fields/CheckboxField';
import { DateField } from './fields/DateField';
import { RadioField } from './fields/RadioField';
import { SelectField } from './fields/SelectField';
import { SwitchField } from './fields/SwitchField';
import { TextField } from './fields/TextField';

interface Props {
  field: FormField;
  value: FieldValue | undefined;
  error?: string;
  onChange: (id: string, value: FieldValue) => void;
}

/** Picks the input component for `field.type`; this is the only place that knows the type → component map. */
export function FieldRenderer({ field, value, error, onChange }: Props) {
  const handleChange = useCallback((next: FieldValue) => onChange(field.id, next), [onChange, field.id]);

  const text = typeof value === 'string' ? value : '';
  const flag = value === true;
  const label = displayLabel(field);
  const hasError = Boolean(error);

  switch (field.type) {
    case 'checkbox':
      return (
        <FieldWrapper error={error}>
          <CheckboxField label={label} checked={flag} onChange={handleChange} />
        </FieldWrapper>
      );
    case 'switch':
      return (
        <FieldWrapper error={error}>
          <SwitchField label={label} value={flag} onChange={handleChange} />
        </FieldWrapper>
      );
    case 'radio':
      return (
        <FieldWrapper label={label} error={error}>
          <RadioField field={field} value={text} onChange={handleChange} />
        </FieldWrapper>
      );
    case 'select':
    case 'combo':
      return (
        <FieldWrapper label={label} error={error}>
          <SelectField field={field} value={text} hasError={hasError} onChange={handleChange} />
        </FieldWrapper>
      );
    case 'date':
      return (
        <FieldWrapper label={label} error={error}>
          <DateField label={field.label} value={text} hasError={hasError} onChange={handleChange} />
        </FieldWrapper>
      );
    default:
      return (
        <FieldWrapper label={label} error={error}>
          <TextField field={field} value={text} hasError={hasError} onChange={handleChange} />
        </FieldWrapper>
      );
  }
}
