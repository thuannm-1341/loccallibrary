export function formatDate(date: Date | string | undefined): string {
  if (!date) return '';

  if (typeof date === 'string') {
    date = new Date(date); // Parse string to Date object
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
