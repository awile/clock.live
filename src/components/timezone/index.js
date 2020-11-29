
import React, { useState, useEffect } from 'react';

import Time from '../time';
import * as moment from 'moment-timezone';

const Timezone = ({ timezone, cursorTime, onCursorTimeChange }) => {
  if (timezone.label === 'America/Los_Angeles') {
    timezone.utc[0] = 'America/Los_Angeles';
  }
  const [date, setDate] = useState(newDate(timezone.utc[0]));
  const [hasListener, setHasListener] = useState(false);
  tick(setDate, timezone);
  const currentOffset = (date.hour() * 28) + ((date.minute() / 60) * 28);
  const startOfDay = newDate(timezone.utc[0]).startOf('day');

  let cursorMoment, cursorOffset;
  if (cursorTime) {
    cursorMoment = utcToLocalTimezone(timezone, cursorTime);
    cursorOffset = utcTimeToOffset(timezone, cursorTime, startOfDay);
  }

  useEffect(() => {
    const timezoneContainer = document.getElementsByClassName(timezone.label)[0];
    if (!hasListener) {
      timezoneContainer.addEventListener('mousemove', (e) => {
        if (e.layerY > 1) {
          const utcTime = offsetToUTCTime(startOfDay.clone(), e.layerY);
          onCursorTimeChange(utcTime);
        }
      });
      setHasListener(true);
    }
  });

  return (
    <div className='Timezone'>
      <Time date={date} timezone={timezone} />
      <div className={`Timezone-calendar-container ${timezone.label}`}>
        <div className='Timezone-cursor-time' style={{ marginTop: `${cursorOffset}px` }}>
          {cursorMoment ? cursorMoment.format('h:mm A') : ''}
        </div>
        <div className='Timezone-current-time' style={{ marginTop: `${currentOffset}px` }}></div>
        <div className='Timezone-ruler'></div>
        {
          Array.from(Array(24).keys()).map(num => (
            <div key={num} className='Timezone-hour-block'>{startOfDay.clone().add(num, 'hours').format('h A')}</div>
          ))
        }
      </div>
    </div>
  );
};

const newDate = (timezone) => {
  return moment().tz(timezone);
};

const tick = (setDate, tz) => {
  const updateDate = () => setDate(newDate(tz.utc[0]));

  setTimeout(updateDate, 10000);
};

const offsetToUTCTime = (momentTimezone, offset) => {
  const x = Math.floor(offset/671 * (24 * 60));
  const cursorMoment = momentTimezone.clone().add(x, 'minutes');
  return cursorMoment.utc().format();
};

const utcTimeToOffset = (timezone, utcTimeoffset, startOfDay) => {
  const local = moment(utcTimeoffset).tz(timezone.utc[0]);
  const duration = moment.duration(local.diff(startOfDay));
  let minutes = duration.asMinutes();
  const minutesInADay = 24 * 60;
  if (minutes < 0) {
    minutes = minutesInADay + minutes;
  }
  return (((minutes % minutesInADay) / minutesInADay) * 671);
};

const utcToLocalTimezone = (timezone, utcTimeoffset) => {
  return moment(utcTimeoffset).tz(timezone.utc[0]);
};

export default Timezone;
