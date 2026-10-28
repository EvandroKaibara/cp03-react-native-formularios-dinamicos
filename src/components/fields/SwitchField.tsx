import { StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '../../theme';

interface Props {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function SwitchField({ label, value, onChange }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{label}</Text>
      <Switch value={value} onValueChange={onChange} accessibilityLabel={label} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  text: { flex: 1, fontSize: 16, color: colors.text, marginRight: 12 },
});
