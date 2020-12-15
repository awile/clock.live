
import React, { useState } from 'react'

import { useSiteData } from 'react-static'
import { Timezone, Search } from './components/';
import {
  addSelectedTimezone,
  moveSelectedTimezoneLeft,
  moveSelectedTimezoneRight,
  getTimezone,
  newUTCDate,
  removeSelectedTimezone
} from './utils/';
import * as moment from 'moment-timezone';

const Page = () => {
  const { timezones, search_names } = useSiteData();
  const _getTimezone = (tz) => getTimezone(tz, timezones, search_names);

  let savedTimezones = [];
  let savedIsFixedTime = false;
  let savedHighlightTime = null
  try {
    let savedTimezonesString = localStorage.getItem('timezones');
    if (savedTimezonesString !== null) {
      savedTimezones = JSON.parse(savedTimezonesString)
    }

    let savedHighlightTimeString = localStorage.getItem('highlightTime');
    if (savedHighlightTimeString !== null) {
      savedHighlightTime = JSON.parse(savedHighlightTimeString);
      savedIsFixedTime = true;
    }
  } catch (e) {
  }

  const [userTimezone, _] = useState(_getTimezone(moment.tz.guess()));
  let initialSelectedTimezones = savedTimezones;
  if (!savedTimezones.map(tz => tz.timezone).includes(userTimezone.timezone)) {
    initialSelectedTimezones = [userTimezone].concat(savedTimezones);
    try  {
      localStorage.setItem('timezones', JSON.stringify(initialSelectedTimezones));
    } catch(e) {
    }
  }

  const [selectedTimezones, setSelectedTimezones] = useState(initialSelectedTimezones);
  const [isFixedTime, setIsFixedTime] = useState(savedIsFixedTime);
  const [highlightTime, setHighlightTime] = useState(savedHighlightTime);
  const [globalTime, setGlobalTime] = useState(newUTCDate());
  tick(setGlobalTime, newUTCDate);

  const handleAddTimezone = (tz) => {
    const newSelectedTimezones = addSelectedTimezone(_getTimezone(tz), selectedTimezones);
    setSelectedTimezones(newSelectedTimezones);
    localStorage.setItem('timezones', JSON.stringify(newSelectedTimezones));
  };
  const handleRemoveTimezone = (tz) => {
    const newSelectedTimezones = removeSelectedTimezone(_getTimezone(tz), selectedTimezones);
    setSelectedTimezones(newSelectedTimezones);
    localStorage.setItem('timezones', JSON.stringify(newSelectedTimezones));
  };
  const handleMoveRight = (timezoneIndex) => {
    const newOrderSelectedTimezones = moveSelectedTimezoneRight(timezoneIndex, selectedTimezones);
    setSelectedTimezones(newOrderSelectedTimezones);
    localStorage.setItem('timezones', JSON.stringify(newOrderSelectedTimezones));
  }
  const handleMoveLeft = (timezoneIndex) => {
    const newOrderSelectedTimezones = moveSelectedTimezoneLeft(timezoneIndex, selectedTimezones);
    setSelectedTimezones(newOrderSelectedTimezones);
    localStorage.setItem('timezones', JSON.stringify(newOrderSelectedTimezones));
  }

  const handleClickOffTimezone = () => {
    setIsFixedTime(false);
    setHighlightTime(null);
    localStorage.removeItem('highlightTime');
  };
  const handleSetHighlightTime = (time) => {
    setHighlightTime(time);
    if (isFixedTime) {
      localStorage.setItem('highlightTime', JSON.stringify(time));
    }
  };
  const handleSetIsFixedTime = () => {
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
              <Timezone
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

const tick = (setTime, newTime) => {
  const updateTime = () => setTime(newTime());
  const timeout = 10 * 1000; // 10 seconds
  setTimeout(updateTime, timeout);
};

export default Page;
