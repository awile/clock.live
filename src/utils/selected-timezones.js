
export function addSelectedTimezone(addTz, timezones=[]) {
  const newTimezones = timezones.slice();
  if (!timezones.find(tz => tz.timezone === addTz.timezone)) {
    newTimezones.push(addTz);
  }
  return newTimezones;
}

export function removeSelectedTimezone(removeTz, timezones) {
  let newTimezones = [];
  timezones.forEach(tz => {
    if (tz.timezone !== removeTz.timezone) {
      newTimezones.push(tz);
    }
  });
  return newTimezones;
}

export function moveSelectedTimezoneRight(index, timezones) {
  if (index === (timezones.length - 1)) { return timezones; }

  let newTimezones = [];
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

export function moveSelectedTimezoneLeft(index, timezones) {
  if (index === 0) { return timezones; }

  let newTimezones = [];
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
