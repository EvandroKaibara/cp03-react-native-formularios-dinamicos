import DateTimePicker from '@react-native-community/datetimepicker';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useCallback, useState } from 'react';
import { Platform, Pressable, Text } from 'react-native';
import { colors } from '../../theme';
import { dateToIso, isoToDate } from '../../utils/date';
import { formatDate } from '../../utils/validation';
import { controlStyles } from '../FieldWrapper';

interface Props {
  label: string;
  value: string;
  hasError: boolean;
  onChange: (value: string) => void;
}

/** Android/iOS date picker. The Web build uses DateField.web.tsx (native <input type="date">). */
export function DateField({ label, value, hasError, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const handleChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (Platform.OS === 'android') setOpen(false);
      if (event.type === 'set' && date) onChange(dateToIso(date));
    },
    [onChange],
  );

  return (
    <>
      <Pressable
        onPress={() => setOpen((prev) => !prev)}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={[controlStyles.box, hasError && controlStyles.boxError]}
      >
        <Text style={{ fontSize: 16, color: value ? colors.text : colors.muted }}>
          {value ? formatDate(value) : 'Selecione a data'}
        </Text>
      </Pressable>
      {open && (
        <DateTimePicker
          value={value ? isoToDate(value) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          maximumDate={new Date()}
          onChange={handleChange}
        />
      )}
    </>
  );
}
