export interface FieldOption {
  label: string;
  value: string;
}

interface BaseField {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}

export type InputFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'multiline'
  | 'textarea'
  | 'checkbox'
  | 'switch'
  | 'date';

export type ChoiceFieldType = 'select' | 'combo' | 'radio';

export interface InputField extends BaseField {
  type: InputFieldType;
}

export interface ChoiceField extends BaseField {
  type: ChoiceFieldType;
  options: FieldOption[];
}

export type FormField = InputField | ChoiceField;

export interface FormConfig {
  title: string;
  fields: FormField[];
}

/** text-like, select, radio and date hold strings (date as YYYY-MM-DD); checkbox and switch hold booleans. */
export type FieldValue = string | boolean;

export type FormValues = Record<string, FieldValue>;

export type FormErrors = Record<string, string>;

export interface Submission {
  submittedAt: string;
  values: FormValues;
}
