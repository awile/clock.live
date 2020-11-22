
export function getTimezone(tz, timezones, search_names) {
  const timezoneIndex = search_names[getSearchName(tz)];
  const userTimezone = timezones[timezoneIndex];
  return { label: tz, ...userTimezone };
}

export function getSearchName(tz) {
  return tz.split('/')[1];
}
