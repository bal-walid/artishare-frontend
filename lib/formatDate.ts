export default function formatDate(dateString : string) {
  const date = new Date(dateString);
  const now = new Date();

  // Get year, month, and day
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();

  // Check if the year is the same as the current year
  if (year === now.getFullYear()) {
      return `${month} ${day}`;
  }

  // Return full format with the year
  return `${month} ${day},${year}`;
}