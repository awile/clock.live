
import { Timezone } from '../../types/'
import moment, { Moment } from 'moment-timezone';

export function newDate(timezone: string): Moment {
  return moment().tz(timezone);
}

export function offsetToUTCTime(highlightTimezone: Moment, offset: number, height: number): string {
  const x = Math.floor(offset/height * (24 * 60));
  const highlightMoment = highlightTimezone.clone().add(x, 'minutes');
  return highlightMoment.utc().format();
}

export function timeToOffset(time: Moment, containerHeight: number): number {
  const startOfDay: Moment = time.clone().startOf('day');
  const duration = moment.duration(time.diff(startOfDay));
  let minutes = Math.floor(duration.asMinutes());
  const minutesInADay = 24 * 60;
  if (minutes < 0) {
    minutes = minutesInADay + minutes;
  }
  return Math.floor(((minutes % minutesInADay) / minutesInADay) * containerHeight) - 1;
}

export function utcToLocalTimezone(timezone: Timezone, utcTimeoffset: string): Moment {
  return moment(utcTimeoffset).tz(timezone.timezone);
}
