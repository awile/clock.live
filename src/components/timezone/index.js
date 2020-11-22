
import React, { useState } from 'react';

import Time from '../time';
import * as moment from 'moment-timezone';

const Timezone = ({ timezone }) => {
  const [date, setDate] = useState(newDate(timezone.label));
  tick(setDate, timezone);
  return (<Time date={date} timezone={timezone} />);
};

const newDate = (timezone) => {
  return moment().tz(timezone);
};

const tick = (setDate, tz) => {
  const updateDate = () => setDate(newDate(tz.label));

  setTimeout(updateDate, 1000);
};

export default Timezone;
