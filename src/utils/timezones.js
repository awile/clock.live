
import * as moment from 'moment-timezone';

export function getTimezone(tz, timezones, search_names) {
  const timezoneIndex = search_names[getSearchName(tz)];
  const timezone = timezones[timezoneIndex];
  return { label: tz, timezone };
}

export function getSearchName(tz) {
  return (tz.includes('/') ? tz.split('/')[1] : tz).replaceAll('_', ' ');
}

export function newDate(timezone) {
  return moment().tz(timezone);
}

export function newUTCDate() {
  return moment().utc();
}
