import { colors } from '../../theme';
import { dateToIso } from '../../utils/date';

interface Props {
  label: string;
  value: string;
  hasError: boolean;
  onChange: (value: string) => void;
}

/** Web date field: the browser's own date picker, which already yields YYYY-MM-DD. */
export function DateField({ label, value, hasError, onChange }: Props) {
  return (
    <input
      type="date"
      aria-label={label}
      value={value}
      max={dateToIso(new Date())}
      onChange={(event) => onChange(event.target.value)}
      style={{
        border: `1px solid ${hasError ? colors.error : colors.border}`,
        borderRadius: 8,
        padding: '10px 12px',
        fontSize: 16,
        color: colors.text,
        backgroundColor: colors.surface,
        fontFamily: 'inherit',
        boxSizing: 'border-box',
        width: '100%',
      }}
    />
  );
}
