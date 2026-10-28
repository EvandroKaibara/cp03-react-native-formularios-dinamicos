import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';
import type { FormConfig, Submission } from '../types/form';
import { formatValue } from '../utils/validation';

interface Props {
  config: FormConfig;
  submission: Submission;
}

/** Lists every configured field with the submitted value, in the order defined by the config. */
export function SubmissionResult({ config, submission }: Props) {
  return (
    <View>
      <Text style={styles.meta}>Enviado em {new Date(submission.submittedAt).toLocaleString('pt-BR')}</Text>
      {config.fields.map((field) => (
        <View key={field.id} style={styles.row}>
          <Text style={styles.label}>{field.label}</Text>
          <Text style={styles.value}>{formatValue(field, submission.values[field.id])}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  meta: { fontSize: 13, color: colors.muted, marginBottom: spacing.sm },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.text },
  value: { flex: 1, fontSize: 14, color: colors.text, textAlign: 'right' },
});
