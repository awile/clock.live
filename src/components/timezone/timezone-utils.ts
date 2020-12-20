
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

export function timeToOffset(time: Moment): number {
  let height = 0;
  const container = document.querySelector('.Timezone-calendar-container');
  if (!container) { return 0; }

  height = container.clientHeight;
  const startOfDay: Moment = time.clone().startOf('day');
  const duration = moment.duration(time.diff(startOfDay));
  let minutes = duration.asMinutes();
  const minutesInADay = 24 * 60;
  if (minutes < 0) {
    minutes = minutesInADay + minutes;
  }
  return (((minutes % minutesInADay) / minutesInADay) * height) - 1;
}

export function utcToLocalTimezone(timezone: Timezone, utcTimeoffset: string): Moment {
  return moment(utcTimeoffset).tz(timezone.timezone);
}
