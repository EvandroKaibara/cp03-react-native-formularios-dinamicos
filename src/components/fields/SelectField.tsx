import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../theme';
import type { ChoiceField } from '../../types/form';
import { controlStyles } from '../FieldWrapper';

interface Props {
  field: ChoiceField;
  value: string;
  hasError: boolean;
  onChange: (value: string) => void;
}

/** Inline dropdown (no native picker), so it behaves the same on Android, iOS and Web. */
export function SelectField({ field, value, hasError, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const selected = field.options.find((option) => option.value === value);

  const pick = useCallback(
    (next: string) => {
      onChange(next);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <View>
      <Pressable
        onPress={() => setOpen((prev) => !prev)}
        accessibilityRole="button"
        accessibilityLabel={field.label}
        accessibilityState={{ expanded: open }}
        style={[styles.header, hasError && controlStyles.boxError]}
      >
        <Text style={selected ? styles.value : styles.placeholder}>{selected?.label ?? 'Selecione...'}</Text>
        <Text style={styles.chevron}>{open ? '▲' : '▼'}</Text>
      </Pressable>
      {open && (
        <View style={styles.list}>
          {field.options.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => pick(option.value)}
              accessibilityRole="menuitem"
              accessibilityState={{ selected: option.value === value }}
              style={[styles.option, option.value === value && styles.optionSelected]}
            >
              <Text style={styles.value}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    ...controlStyles.box,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: { fontSize: 16, color: colors.text },
  placeholder: { fontSize: 16, color: colors.muted },
  chevron: { fontSize: 12, color: colors.muted },
  list: {
    marginTop: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  option: { paddingHorizontal: spacing.md - 4, paddingVertical: 10 },
  optionSelected: { backgroundColor: '#e8ebfb' },
});
