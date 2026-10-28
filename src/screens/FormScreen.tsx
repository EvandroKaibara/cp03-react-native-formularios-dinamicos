import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FieldRenderer } from '../components/FieldRenderer';
import { SubmissionResult } from '../components/SubmissionResult';
import { formConfig } from '../config/formConfig';
import { useDynamicForm } from '../hooks/useDynamicForm';
import { useSubmissionStorage } from '../hooks/useSubmissionStorage';
import { colors, spacing } from '../theme';

interface Notice {
  kind: 'success' | 'error';
  text: string;
}

export function FormScreen() {
  const insets = useSafeAreaInsets();
  const { submission, loading, loadError, save, clear } = useSubmissionStorage();
  const { values, errors, setValue, submit } = useDynamicForm(formConfig, save);
  const [notice, setNotice] = useState<Notice | null>(null);

  const handleSubmit = useCallback(async () => {
    try {
      const valid = await submit();
      setNotice(
        valid
          ? { kind: 'success', text: 'Formulário enviado e salvo no dispositivo.' }
          : { kind: 'error', text: 'Corrija os campos destacados antes de enviar.' },
      );
    } catch {
      setNotice({ kind: 'error', text: 'Não foi possível salvar os dados.' });
    }
  }, [submit]);

  const handleClear = useCallback(async () => {
    try {
      await clear();
      setNotice({ kind: 'success', text: 'Dados salvos apagados.' });
    } catch {
      setNotice({ kind: 'error', text: 'Não foi possível apagar os dados.' });
    }
  }, [clear]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.lg }]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.column}>
        <Text style={styles.title} accessibilityRole="header">
          {formConfig.title}
        </Text>

        <View style={styles.card}>
          {formConfig.fields.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              value={values[field.id]}
              error={errors[field.id]}
              onChange={setValue}
            />
          ))}
          <Pressable onPress={handleSubmit} accessibilityRole="button" style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Enviar</Text>
          </Pressable>
          {notice && (
            <Text style={[styles.notice, notice.kind === 'error' ? styles.noticeError : styles.noticeSuccess]}>
              {notice.text}
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Dados salvos</Text>
          {loading ? (
            <ActivityIndicator color={colors.primary} />
          ) : submission ? (
            <>
              <SubmissionResult config={formConfig} submission={submission} />
              <Pressable onPress={handleClear} accessibilityRole="button" style={styles.dangerButton}>
                <Text style={styles.dangerButtonText}>Limpar dados salvos</Text>
              </Pressable>
            </>
          ) : (
            <Text style={styles.empty}>{loadError ?? 'Nenhum dado salvo ainda.'}</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, alignItems: 'center', paddingHorizontal: spacing.md },
  column: { width: '100%', maxWidth: 640 },
  title: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: { color: colors.primaryText, fontSize: 16, fontWeight: '600' },
  dangerButton: {
    marginTop: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dangerButtonText: { color: colors.error, fontSize: 16, fontWeight: '600' },
  notice: { marginTop: spacing.sm + 4, fontSize: 14 },
  noticeSuccess: { color: colors.success },
  noticeError: { color: colors.error },
  empty: { color: colors.muted, fontSize: 14 },
});
