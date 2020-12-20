
import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react';

import Time from '../time/';
import { Timezone } from '../../types/'
import { newDate, timeToOffset, offsetToUTCTime, utcToLocalTimezone } from './timezone-utils';
import { Moment } from 'moment-timezone';
import Options from './options/options';

import './_timezone.scss';

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
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const localTime: Moment = globalTime.tz(timezone.timezone)
  const currentOffset: number = timeToOffset(localTime);
  const startOfDay: Moment = newDate(timezone.timezone).startOf('day');


  useEffect(() => {
    if (!hasLoaded) {
      setHasLoaded(true);
    }
  }, [hasLoaded]);

  let highlightMoment: Moment | undefined;
  let highlightOffset: number | undefined;
  if (highlightTime) {
    highlightMoment = utcToLocalTimezone(timezone, highlightTime);
    highlightOffset = timeToOffset(highlightMoment);
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

  const timeDiffInMinutes: number | null = (highlightTime && localTime) ?
    Math.round(Math.abs(localTime.diff(highlightTime)) / (60 * 1000)) :
    null;
  const handleSetDragging = (value: boolean) => () => setIsDragging(value);
  const handleMouseMove = (e: MouseEvent) => (!isFixedTime || isDragging) && handlePointerMove(e);
  const handleRemoveTimezone = () => onRemoveTimezone(timezone.timezone);

  return (
    <div className='Timezone'>
      <Time date={globalTime} timezone={timezone} />
      <Options 
        handleMoveLeft={handleMoveLeft}
        handleRemoveTimezone={handleRemoveTimezone}
        handleMoveRight={handleMoveRight}
        isFirst={isFirst}
        isLast={isLast}
        isUserTimezone={isUserTimezone}
      />
      <div
        className={`Timezone-calendar-container ${timezone.timezone}`}
        onMouseEnter={handlePointerMove}
        onMouseUp={handleSetDragging(false)}
        onMouseDown={handleSetDragging(true)}
        onMouseMove={handleMouseMove}
        onClick={handlePointerClick}
      >
        { hasLoaded && highlightTime &&
          <div className='Timezone-highlight-time' style={{ marginTop: `${highlightOffset}px` }}>
            {highlightMoment ? `${highlightMoment.format('h:mm A')} - ${highlightMoment.format('MMM Do')}` : ''}
          </div>
        }
        { hasLoaded &&
          <div className='Timezone-current-time' style={{ marginTop: `${currentOffset}px` }}>
            <span className={`Timezone-current-label ${(timeDiffInMinutes && timeDiffInMinutes <= 30) ? 'Timezone--hide-current' : ''}`}>
              { `${localTime.format('h:mm A')} - ${localTime.format('MMM Do')}` }
            </span>
          </div>}
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

export default TimezoneContainer;
