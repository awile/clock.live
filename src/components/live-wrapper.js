
import React, { useState } from 'react';

import Time from './time';
import * as moment from 'moment-timezone';

const LiveWrapper = ({ userTimezone }) => {
  const [date, setDate] = useState(newDate(userTimezone.utc[0]));
  tick(setDate, userTimezone);
  return (
    <div>
      <Time date={date} userTimezone={userTimezone} />
    </div>
  );
};

const newDate = (userTimezone) => {
  return moment().tz(userTimezone).toDate();
};

const tick = (setDate, userTimezone) => {
  const updateDate = () => setDate(newDate(userTimezone.utc[0]));

  setTimeout(updateDate, 1000);
};

export default LiveWrapper;
