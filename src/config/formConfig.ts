import type { FormConfig } from '../types/form';

const stateOptions = ['SP', 'RJ', 'MG', 'RS', 'PR', 'BA'].map((uf) => ({ label: uf, value: uf }));

export const formConfig: FormConfig = {
  title: 'Cadastro de Usuário',
  fields: [
    { id: 'name', label: 'Nome', type: 'text', required: true, placeholder: 'Seu nome completo' },
    { id: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'voce@exemplo.com' },
    { id: 'password', label: 'Senha', type: 'password', required: true, placeholder: 'Mínimo de 6 caracteres' },
    { id: 'age', label: 'Idade', type: 'number', required: true, placeholder: 'Ex.: 21' },
    {
      id: 'bio',
      label: 'Sobre você',
      type: 'multiline',
      required: false,
      placeholder: 'Conte um pouco sobre você',
    },
    {
      id: 'gender',
      label: 'Gênero',
      type: 'radio',
      required: true,
      options: [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
        { label: 'Prefiro não informar', value: 'undisclosed' },
      ],
    },
    { id: 'state', label: 'Estado', type: 'select', required: true, options: stateOptions },
    { id: 'birthDate', label: 'Data de nascimento', type: 'date', required: true },
    { id: 'terms', label: 'Li e aceito os termos de uso', type: 'checkbox', required: true },
    { id: 'newsletter', label: 'Receber novidades por e-mail', type: 'switch', required: false },
  ],
};
