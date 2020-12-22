
import React, { FunctionComponent } from 'react'
import { Moment } from 'moment-timezone';
import { Timezone } from '../../types/';

import './_time.scss';

type TimeProps = {
  className: string | null
  date: Moment,
  timezone: Timezone
}

const Time: FunctionComponent<TimeProps> = ({ className, date, timezone }: TimeProps) => {
  const formatDate = (date: Moment): string => {
    return date.format('h:mm A');
  };

  const weekdays: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <div className={`Time ${className}`} style={{ textAlign: 'center' }}>
      <div className='Time-label'>{timezone.label}</div>
      <div>{formatDate(date)}</div>
      <div className='Time-days'>
        {
          weekdays.map((day, i) => (
            <div key={day + i} className={`Time-day-week ${(i === date.isoWeekday() ? 'Time--current-day' : '')}`}>
              {day}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Time;
