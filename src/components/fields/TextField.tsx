import { StyleSheet, TextInput } from 'react-native';
import type { KeyboardTypeOptions } from 'react-native';
import { colors } from '../../theme';
import type { InputField, InputFieldType } from '../../types/form';
import { controlStyles } from '../FieldWrapper';

const keyboardTypes: Partial<Record<InputFieldType, KeyboardTypeOptions>> = {
  email: 'email-address',
  number: 'decimal-pad',
};

interface Props {
  field: InputField;
  value: string;
  hasError: boolean;
  onChange: (value: string) => void;
}

/** Single-line and multi-line text entry: text, email, password, number, multiline/textarea. */
export function TextField({ field, value, hasError, onChange }: Props) {
  const multiline = field.type === 'multiline' || field.type === 'textarea';
  const plain = field.type === 'email' || field.type === 'password';

  return (
    <TextInput
      style={[controlStyles.box, multiline && styles.multiline, hasError && controlStyles.boxError]}
      value={value}
      onChangeText={onChange}
      placeholder={field.placeholder}
      placeholderTextColor={colors.muted}
      secureTextEntry={field.type === 'password'}
      keyboardType={keyboardTypes[field.type]}
      autoCapitalize={plain ? 'none' : 'sentences'}
      autoCorrect={!plain}
      multiline={multiline}
      numberOfLines={multiline ? 4 : 1}
      textAlignVertical={multiline ? 'top' : 'center'}
      accessibilityLabel={field.label}
    />
  );
}

const styles = StyleSheet.create({
  multiline: { minHeight: 96 },
});
