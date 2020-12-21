
import { Timezone } from '../types/';
import moment, { Moment } from 'moment-timezone';

export function getTimezone(tz: string, timezones: string[], search_names: { [searchName: string]: number }): Timezone {
  const timezoneIndex: number = search_names[getSearchName(tz)];
  const timezone: string = timezones[timezoneIndex];
  return { label: tz, timezone };
}

export function getSearchName(tz: string): string {
  return (tz.includes('/') ? tz.split('/')[1] : tz).replace(/_/g, ' ');
}

export function getLabelFromTimezone(tz: string): string {
  const timezoneCity = tz.split('/').slice(-1)[0];
  return timezoneCity.replace(/_/g, ' ');
}

export function newDate(timezone: string): Moment {
  return moment().tz(timezone);
}

export function newUTCDate(): Moment {
  return moment().utc();
}
