import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';
import type { FormField } from '../types/form';

export function displayLabel(field: FormField): string {
  return field.required ? `${field.label} *` : field.label;
}

interface Props {
  label?: string;
  error?: string;
  children: ReactNode;
}

export function FieldWrapper({ label, error, children }: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      {children}
      {error ? (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

/** Shared look for bordered controls (text inputs, select header, date button). */
export const controlStyles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md - 4,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
  },
  boxError: { borderColor: colors.error },
});

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: spacing.xs + 2 },
  error: { color: colors.error, fontSize: 13, marginTop: spacing.xs },
});
