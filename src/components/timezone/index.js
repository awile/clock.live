
import React, { useState } from 'react';

import Time from '../time';
import * as moment from 'moment-timezone';

const Timezone = ({ timezone, highlightTime, onHighlightTimeChange, onRemoveTimezone, isUserTimezone }) => {
  if (timezone.label === 'America/Los_Angeles') {
    timezone.utc[0] = 'America/Los_Angeles';
  }
  const [date, setDate] = useState(newDate(timezone.utc[0]));
  tick(setDate, timezone);
  const currentOffset = (date.hour() * 28) + ((date.minute() / 60) * 28);
  const startOfDay = newDate(timezone.utc[0]).startOf('day');

  let highlightMoment, highlightOffset;
  if (highlightTime) {
    highlightMoment = utcToLocalTimezone(timezone, highlightTime);
    highlightOffset = utcTimeToOffset(timezone, highlightTime, startOfDay);
  }

  const handlePointerMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const timezoneContainer = document.getElementsByClassName(timezone.label)[0];
    const rect = timezoneContainer.getBoundingClientRect();
    const offset = e.clientY - rect.top;
    const yOffset = (offset >= rect.height) ?
      rect.height :
      Math.max(offset, 0);
    const utcTime = offsetToUTCTime(startOfDay.clone(), yOffset, rect.height);
    onHighlightTimeChange(utcTime);
  };

  return (
    <div className='Timezone'>
      <Time date={date} timezone={timezone} />
        <div
          className="Timezone-remove-tz"
          onClick={() => onRemoveTimezone(timezone.label)}>
          { !isUserTimezone ? 'x' : '' }
        </div>
      <div
        className={`Timezone-calendar-container ${timezone.label}`}
        onMouseEnter={handlePointerMove}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove} >
        <div className='Timezone-highlight-time' style={{ marginTop: `${highlightOffset}px` }}>
          {highlightMoment ? highlightMoment.format('h:mm A') : ''}
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

const offsetToUTCTime = (highlightTimezone, offset, height) => {
  const x = Math.floor(offset/height * (24 * 60));
  const highlightMoment = highlightTimezone.clone().add(x, 'minutes');
  return highlightMoment.utc().format();
};

const utcTimeToOffset = (timezone, utcTimeoffset, startOfDay) => {
  const local = moment(utcTimeoffset).tz(timezone.utc[0]);
  const duration = moment.duration(local.diff(startOfDay));
  let minutes = duration.asMinutes();
  const minutesInADay = 24 * 60;
  if (minutes < 0) {
    minutes = minutesInADay + minutes;
  }
  return (((minutes % minutesInADay) / minutesInADay) * 672);
};

const utcToLocalTimezone = (timezone, utcTimeoffset) => {
  return moment(utcTimeoffset).tz(timezone.utc[0]);
};

export default Timezone;
