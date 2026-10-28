import { formConfig } from '../config/formConfig';
import type { FormValues } from '../types/form';
import { buildInitialValues, validateForm } from './validation';

const validValues: FormValues = {
  name: 'Ana',
  email: 'ana@exemplo.com',
  password: 'segredo123',
  age: '21',
  bio: '',
  gender: 'female',
  state: 'SP',
  birthDate: '2000-05-17',
  terms: true,
  newsletter: false,
};

describe('validateForm', () => {
  it('rejects the untouched form and flags every required field', () => {
    const errors = validateForm(formConfig, buildInitialValues(formConfig));
    const required = formConfig.fields.filter((f) => f.required && f.type !== 'switch').map((f) => f.id);
    expect(Object.keys(errors).sort()).toEqual(required.sort());
  });

  it('accepts a complete form; an off switch and an empty optional field are valid answers', () => {
    expect(validateForm(formConfig, validValues)).toEqual({});
  });

  it('requires the checkbox to be checked', () => {
    expect(validateForm(formConfig, { ...validValues, terms: false })).toHaveProperty('terms');
  });

  it('rejects malformed email, number, password and option values', () => {
    const errors = validateForm(formConfig, {
      ...validValues,
      email: 'sem-arroba',
      age: 'abc',
      password: '123',
      state: 'XX',
    });
    expect(Object.keys(errors).sort()).toEqual(['age', 'email', 'password', 'state']);
  });
});
