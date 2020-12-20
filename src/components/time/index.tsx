
import React, { FunctionComponent } from 'react'
import { Moment } from 'moment-timezone';
import { Timezone } from '../../types/';

import './_time.scss';

type TimeProps = {
  date: Moment,
  timezone: Timezone
}

const Time: FunctionComponent<TimeProps> = ({ date, timezone }: TimeProps) => {
  const formatDate = (date: Moment): string => {
    return date.format('h:mm A');
  };

  return (
    <div className='Time-container' style={{ textAlign: 'center' }}>
      <div className='Time-label'>{timezone.label}</div>
      <div>{formatDate(date)}</div>
    </div>
  );
}

export default Time;
