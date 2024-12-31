export default function formatDate(dateString : string) {
  const date = new Date(dateString);
  const now = new Date();

  const options = { month: 'short', day: 'numeric' };

  // Use 'en-US' locale to ensure consistent formatting
  const formattedDate = date.toLocaleDateString('en-US', options);

  // Check if the year is the same as the current year
  if (date.getFullYear() === now.getFullYear()) {
      return formattedDate;
  }

  // Add the year if different
  return `${formattedDate} ${date.getFullYear()}`;
}
