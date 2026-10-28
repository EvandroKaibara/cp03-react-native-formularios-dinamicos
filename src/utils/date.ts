const pad = (n: number): string => String(n).padStart(2, '0');

/** Local-time YYYY-MM-DD, avoiding the UTC shift of toISOString(). */
export function dateToIso(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function isoToDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}
