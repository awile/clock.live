
import { Timezone } from '../types/';

export function addSelectedTimezone(addTz: Timezone, timezones: Timezone[] = []): Timezone[] {
  const newTimezones: Timezone[] = timezones.slice();
  if (!timezones.find(tz => tz.label === addTz.label)) {
    newTimezones.push(addTz);
  }
  return newTimezones;
}

export function removeSelectedTimezone(removeTz: Timezone, timezones: Timezone[]): Timezone[] {
  const newTimezones: Timezone[] = [];
  timezones.forEach(tz => {
    if (tz.label !== removeTz.label) {
      newTimezones.push(tz);
    }
  });
  return newTimezones;
}

export function moveSelectedTimezoneRight(index: number, timezones: Timezone[]): Timezone[] {
  if (index === (timezones.length - 1)) { return timezones; }

  const newTimezones: Timezone[] = [];
  const swapIndex = index + 1;
  timezones.forEach((tz, i) => {
    if (i === index) {
      newTimezones.push(timezones[swapIndex]);
    } else if (i === swapIndex) {
      newTimezones.push(timezones[index]);
    } else {
      newTimezones.push(tz);
    }
  });
  return newTimezones;
}

export function moveSelectedTimezoneLeft(index: number, timezones: Timezone[]): Timezone[] {
  if (index === 0) { return timezones; }

  const newTimezones: Timezone[] = [];
  const swapIndex = index - 1;
  timezones.forEach((tz, i) => {
    if (i === index) {
      newTimezones.push(timezones[swapIndex]);
    } else if (i === swapIndex) {
      newTimezones.push(timezones[index]);
    } else {
      newTimezones.push(tz);
    }
  });
  return newTimezones;
}
