export function getDateFromEpoch(epoch: number | undefined): Date {
  const date = new Date(0);
  if (epoch) date.setUTCSeconds(epoch);
  return date;
}

export function getShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
