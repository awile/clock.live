
import React, { useState } from 'react';

import Time from './time';
import * as moment from 'moment-timezone';

const LiveWrapper = ({ userTimezone, selectedTimezones }) => {
  const [date, setDate] = useState(newDate(userTimezone.label));
  tick(setDate, userTimezone);
  return (
    <div>
      <Time date={date} timezone={userTimezone} />
      {
        selectedTimezones.map(tz =>
          <Time key={tz.label} date={newDate(tz.label)} timezone={tz} />)
      }
    </div>
  );
};

const newDate = (timezone) => {
  return moment().tz(timezone);
};

const tick = (setDate, userTimezone) => {
  const updateDate = () => setDate(newDate(userTimezone.label));

  setTimeout(updateDate, 1000);
};

export default LiveWrapper;
