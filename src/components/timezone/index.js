
import React, { useState } from 'react';

import Time from '../time';
import * as moment from 'moment-timezone';

const Timezone = ({ timezone }) => {
  const [date, setDate] = useState(newDate(timezone.utc[0]));
  tick(setDate, timezone);
  const currentOffset = (date.hour() * 28) + ((date.minute() / 60) * 28);
  const startOfDay = newDate(timezone.utc[0]).startOf('day');
  return (
    <div className='Timezone'>
      <Time date={date} timezone={timezone} />
      <div className='Timezone-calendar-container'>
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

  setTimeout(updateDate, 1000);
};

export default Timezone;
