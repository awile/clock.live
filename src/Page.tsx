
import React, { FunctionComponent, useState } from 'react'

import { useSiteData } from 'react-static'
import { TimezoneContainer, Search } from './components/';
import { Timezone } from './types/';
import {
  addSelectedTimezone,
  moveSelectedTimezoneLeft,
  moveSelectedTimezoneRight,
  getTimezone,
  newUTCDate,
  removeSelectedTimezone
} from './utils/';
import moment, { Moment } from 'moment-timezone';

type PageProps = {
}

const Page: FunctionComponent<PageProps> = () => {
  const { timezones, search_names } = useSiteData();
  const _getTimezone = (tz: string): Timezone => getTimezone(tz, timezones, search_names);

  let savedTimezones: Timezone[] = [];
  let savedIsFixedTime = false;
  let savedHighlightTime = '';
  try {
    const savedTimezonesString: string | null = localStorage.getItem('timezones');
    if (savedTimezonesString !== null) {
      savedTimezones = JSON.parse(savedTimezonesString)
    }

    const savedHighlightTimeString: string | null = localStorage.getItem('highlightTime');
    if (savedHighlightTimeString !== null) {
      savedHighlightTime = JSON.parse(savedHighlightTimeString);
      savedIsFixedTime = true;
    }
  } catch (e) {
    console.error(e);
  }

  const userTimezone = _getTimezone(moment.tz.guess());
  let initialSelectedTimezones: Timezone[] = savedTimezones;
  if (!savedTimezones.map(tz => tz.timezone).includes(userTimezone.timezone)) {
    initialSelectedTimezones = [userTimezone].concat(savedTimezones);
    try  {
      localStorage.setItem('timezones', JSON.stringify(initialSelectedTimezones));
    } catch(e) {
      console.error(e);
    }
  }

  const [selectedTimezones, setSelectedTimezones] = useState<Timezone[]>(initialSelectedTimezones);
  const [isFixedTime, setIsFixedTime] = useState<boolean>(savedIsFixedTime);
  const [highlightTime, setHighlightTime] = useState<string>(savedHighlightTime);
  const [globalTime, setGlobalTime] = useState<Moment>(newUTCDate());
  tick(setGlobalTime, newUTCDate);

  const handleAddTimezone = (tz: string): void => {
    const newSelectedTimezones: Timezone[] = addSelectedTimezone(_getTimezone(tz), selectedTimezones);
    setSelectedTimezones(newSelectedTimezones);
    localStorage.setItem('timezones', JSON.stringify(newSelectedTimezones));
  };
  const handleRemoveTimezone = (tz: string): void => {
    const newSelectedTimezones: Timezone[] = removeSelectedTimezone(_getTimezone(tz), selectedTimezones);
    setSelectedTimezones(newSelectedTimezones);
    localStorage.setItem('timezones', JSON.stringify(newSelectedTimezones));
  };
  const handleMoveRight = (timezoneIndex: number): void => {
    const newOrderSelectedTimezones: Timezone[] = moveSelectedTimezoneRight(timezoneIndex, selectedTimezones);
    setSelectedTimezones(newOrderSelectedTimezones);
    localStorage.setItem('timezones', JSON.stringify(newOrderSelectedTimezones));
  }
  const handleMoveLeft = (timezoneIndex: number): void => {
    const newOrderSelectedTimezones: Timezone[] = moveSelectedTimezoneLeft(timezoneIndex, selectedTimezones);
    setSelectedTimezones(newOrderSelectedTimezones);
    localStorage.setItem('timezones', JSON.stringify(newOrderSelectedTimezones));
  }

  const handleClickOffTimezone = (): void => {
    setIsFixedTime(false);
    setHighlightTime('');
    localStorage.removeItem('highlightTime');
  };
  const handleSetHighlightTime = (time: string): void => {
    setHighlightTime(time);
    if (isFixedTime) {
      localStorage.setItem('highlightTime', JSON.stringify(time));
    }
  };
  const handleSetIsFixedTime = (): void => {
    setIsFixedTime(true);
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
            <Search searchNames={Object.keys(search_names)} onChange={handleAddTimezone} />
            <div className='Deselect-container' onClick={handleClickOffTimezone}>deselect time</div>
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
