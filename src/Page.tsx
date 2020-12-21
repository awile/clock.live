
import React, { FC, useContext, useState } from 'react'

import { TimezoneContainer, Search } from './components/';
import { Timezone } from './types/';
import {
  addSelectedTimezone,
  moveSelectedTimezoneLeft,
  moveSelectedTimezoneRight,
  newUTCDate,
  removeSelectedTimezone
} from './utils/';
import { HighlightTimeContext, TimezonesContext } from './providers/';
import { Moment } from 'moment-timezone';

const Page: FC = () => {
  const { 
    getTimezoneByName,
    selectedTimezones,
    searchNames,
    updateSelectedTimezones,
    userTimezone
  } = useContext(TimezonesContext);

  const {
    highlightTime,
    updateHighlightTime,
    isFixedTime,
    updateIsFixedTime
  } = useContext(HighlightTimeContext);

  const [globalTime, setGlobalTime] = useState<Moment>(newUTCDate());
  tick(setGlobalTime, newUTCDate);

  const handleAddTimezone = (tz: string): void => {
    const newSelectedTimezones: Timezone[] = addSelectedTimezone(getTimezoneByName(tz), selectedTimezones);
    updateSelectedTimezones(newSelectedTimezones);
  };
  const handleRemoveTimezone = (tz: string): void => {
    const newSelectedTimezones: Timezone[] = removeSelectedTimezone(getTimezoneByName(tz), selectedTimezones);
    updateSelectedTimezones(newSelectedTimezones);
    localStorage.setItem('timezones', JSON.stringify(newSelectedTimezones));
  };
  const handleMoveRight = (timezoneIndex: number): void => {
    const newOrderSelectedTimezones: Timezone[] = moveSelectedTimezoneRight(timezoneIndex, selectedTimezones);
    updateSelectedTimezones(newOrderSelectedTimezones);
    localStorage.setItem('timezones', JSON.stringify(newOrderSelectedTimezones));
  }
  const handleMoveLeft = (timezoneIndex: number): void => {
    const newOrderSelectedTimezones: Timezone[] = moveSelectedTimezoneLeft(timezoneIndex, selectedTimezones);
    updateSelectedTimezones(newOrderSelectedTimezones);
    localStorage.setItem('timezones', JSON.stringify(newOrderSelectedTimezones));
  }

  const handleClickOffTimezone = (): void => {
    updateIsFixedTime(false);
    updateHighlightTime('');
    localStorage.removeItem('highlightTime');
  };
  const handleSetHighlightTime = (time: string): void => {
    updateHighlightTime(time);
    if (isFixedTime) {
      localStorage.setItem('highlightTime', JSON.stringify(time));
    }
  };
  const handleSetIsFixedTime = (): void => {
    updateIsFixedTime(true);
    if (highlightTime) {
      localStorage.setItem('highlightTime', JSON.stringify(highlightTime));
    }
  };

  return (
    <React.Fragment>
      <div className="App-header">
        <h2 className='header'>clocks.live</h2>
      </div>
      <div className='App-tz'>
        <div className='App-tz-containers'>
          {
            selectedTimezones.map((tz, i) =>
              <TimezoneContainer
                key={tz.label}
                isFirst={i === 0}
                isLast={i === (selectedTimezones.length - 1)}
                globalTime={globalTime}
                handleMoveLeft={() => handleMoveLeft(i)}
                handleMoveRight={() => handleMoveRight(i)}
                highlightTime={highlightTime}
                isFixedTime={isFixedTime}
                isUserTimezone={tz.timezone === userTimezone.timezone}
                onHighlightTimeChange={handleSetHighlightTime}
                onRemoveTimezone={handleRemoveTimezone}
                setIsFixedTime={handleSetIsFixedTime}
                timezone={tz} />
          )}
          <div className=''>
            <Search searchNames={Object.keys(searchNames)} onChange={handleAddTimezone} />
            <div className='Deselect-container' onClick={handleClickOffTimezone}>Deselect Time</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const tick = (setTime: (time: Moment) => void, newTime: () => Moment): void => {
  const updateTime = () => setTime(newTime());
  const timeout = 10 * 1000; // 10 seconds
  setTimeout(updateTime, timeout);
};

export default Page;
