
export function addSelectedTimezone(addTz, timezones=[]) {
  const newTimezones = timezones.slice();
  if (!timezones.find(tz => tz.label === addTz.label)) {
    newTimezones.push(addTz);
  }
  return newTimezones;
}

export function removeSelectedTimezone(removeTz, timezones) {
  let newTimezones = [];
  timezones.forEach(tz => {
    if (tz.label !== removeTz.label) {
      newTimezones.push(tz);
    }
  });
  console.log(newTimezones)
  return newTimezones;
}
