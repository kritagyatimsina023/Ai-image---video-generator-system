export function formatHour(hour: number | null) {
  if (hour === null) return "No data";

  const hour12 = hour % 12 || 12;
  const period = hour >= 12 ? "PM" : "AM";

  return `${hour12}:00 ${period}`;
}

export const calculateChange = (
  current: number,
  previous: number,
): number | null => {
  if (previous === 0) {
    return current === 0 ? 0 : null;
  }

  return Number((((current - previous) / previous) * 100).toFixed(1));
};
