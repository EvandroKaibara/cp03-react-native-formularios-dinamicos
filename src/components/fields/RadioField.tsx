import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../theme';
import type { ChoiceField } from '../../types/form';

interface Props {
  field: ChoiceField;
  value: string;
  onChange: (value: string) => void;
}

export function RadioField({ field, value, onChange }: Props) {
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={field.label}>
      {field.options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            style={styles.row}
          >
            <View style={[styles.circle, selected && styles.circleSelected]}>
              {selected && <View style={styles.dot} />}
            </View>
            <Text style={styles.text}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.xs + 2 },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm + 2,
  },
  circleSelected: { borderColor: colors.primary },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  text: { fontSize: 16, color: colors.text },
});
