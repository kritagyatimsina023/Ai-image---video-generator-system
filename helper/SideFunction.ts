export function formatHour(hour: number | null) {
  if (hour === null) return "No data";

  const date = new Date();
  date.setHours(hour, 0, 0, 0);

  return date.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kathmandu",
    hour: "numeric",
    minute: "2-digit",
  });
}

export const calculateChange = (current: number, previous: number) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return Number((((current - previous) / previous) * 100).toFixed(1));
};
