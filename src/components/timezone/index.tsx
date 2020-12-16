
import React, { FunctionComponent, MouseEvent, useState } from 'react';

import Time from '../time/';
import { Timezone } from '../../types/'
import moment, { Moment } from 'moment-timezone';

type TimezoneProps = {
  globalTime: Moment
  timezone: Timezone
  handleMoveLeft: () => void
  handleMoveRight: () => void
  highlightTime: string
  isFirst: boolean
  isLast: boolean
  isFixedTime: boolean
  onHighlightTimeChange: (time: string) => void
  onRemoveTimezone: (timezone: string) => void
  setIsFixedTime: (isFixedTime: boolean) => void
  isUserTimezone: boolean
}

const TimezoneContainer: FunctionComponent<TimezoneProps> = ({ globalTime, timezone, handleMoveLeft, handleMoveRight, highlightTime, isFirst, isLast, isFixedTime, onHighlightTimeChange, onRemoveTimezone, setIsFixedTime, isUserTimezone }: TimezoneProps) => {

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const localTime: Moment =  globalTime.tz(timezone.timezone)
  const currentOffset: number = (localTime.hour() * 28) + ((globalTime.minute() / 60) * 28);
  const startOfDay: Moment = newDate(timezone.timezone).startOf('day');

  let highlightMoment: Moment | undefined; 
  let highlightOffset: number | undefined;
  if (highlightTime) {
    highlightMoment = utcToLocalTimezone(timezone, highlightTime);
    highlightOffset = utcTimeToOffset(timezone, highlightTime, startOfDay);
  }

  const handlePointerMove = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (isFixedTime && !isDragging) { return; }
    const time: string | null = _getUpdateTime(e);
    if (time) {
      onHighlightTimeChange(time);
    }
  };

  const handlePointerClick = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    const time: string | null = _getUpdateTime(e);
    if (time) {
      setIsFixedTime(true);
      onHighlightTimeChange(time);
    }
  };

  const _getUpdateTime= (e: MouseEvent): string | null => {
    const elements: HTMLCollectionOf<Element> = document.getElementsByClassName(timezone.timezone);
    const timezoneContainer: Element | null = (elements.length > 0) ? elements[0] : null; 
    if (!timezoneContainer) { return null; }

    const rect: ClientRect = timezoneContainer.getBoundingClientRect();
    const offset: number = ((e as MouseEvent).clientY) - rect.top;
    const yOffset: number = (offset >= rect.height) ?
      rect.height :
      Math.max(offset, 0);
    const utcTime: string = offsetToUTCTime(startOfDay.clone(), yOffset, rect.height);
    return utcTime;
  };

  return (
    <div className='Timezone'>
      <Time date={globalTime} timezone={timezone} />
      <div className='Timezone-options'>
        <div
          className='Timezone-move-left'
          onClick={handleMoveLeft}>
          { isFirst ? ' ' : '<' }
        </div>
        <div
          className="Timezone-remove-tz"
          onClick={() => onRemoveTimezone(timezone.timezone)}>
          { !isUserTimezone ? 'x' : '' }
        </div>
        <div
          className='Timezone-move-right'
          onClick={handleMoveRight}>
          { isLast ? ' ' : '>' }
        </div>
      </div>
      <div
        className={`Timezone-calendar-container ${timezone.timezone}`}
        onMouseEnter={handlePointerMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseDown={() => setIsDragging(true)}
        onMouseMove={(e) => (!isFixedTime || isDragging) && handlePointerMove(e)}
        onClick={handlePointerClick}>
        { highlightTime &&
          <div className='Timezone-highlight-time' style={{ marginTop: `${highlightOffset}px` }}>
            {highlightMoment ? highlightMoment.format('h:mm A') : ''}
          </div>
        }
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

const newDate = (timezone: string): Moment => {
  return moment().tz(timezone);
};

const offsetToUTCTime = (highlightTimezone: Moment, offset: number, height: number): string => {
  const x = Math.floor(offset/height * (24 * 60));
  const highlightMoment = highlightTimezone.clone().add(x, 'minutes');
  return highlightMoment.utc().format();
};

const utcTimeToOffset = (timezone: Timezone, utcTimeoffset: string, startOfDay: Moment): number => {
  const local = moment(utcTimeoffset).tz(timezone.timezone);
  const duration = moment.duration(local.diff(startOfDay));
  let minutes = duration.asMinutes();
  const minutesInADay = 24 * 60;
  if (minutes < 0) {
    minutes = minutesInADay + minutes;
  }
  return (((minutes % minutesInADay) / minutesInADay) * 672) - 1;
};

const utcToLocalTimezone = (timezone: Timezone, utcTimeoffset: string): Moment => {
  return moment(utcTimeoffset).tz(timezone.timezone);
};

export default TimezoneContainer;
