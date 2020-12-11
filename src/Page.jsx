
import React, { useState } from 'react'

import { useSiteData } from 'react-static'
import { Timezone, Search } from './components/';
import { addSelectedTimezone, getTimezone, newUTCDate, removeSelectedTimezone } from './utils/';
import * as moment from 'moment-timezone';

const Page = () => {
  const { timezones, search_names } = useSiteData();
  const _getTimezone = (tz) => getTimezone(tz, timezones, search_names);

  let savedTimezones = [];
  let savedTimezonesString = localStorage.getItem('timezones');
  if (savedTimezonesString !== null) {
    savedTimezones = JSON.parse(savedTimezonesString)
  }

  let savedIsFixedTime = false;
  let savedHighlightTime = null
  let savedHighlightTimeString = localStorage.getItem('highlightTime');
  if (savedHighlightTimeString !== null) {
    savedHighlightTime = JSON.parse(savedHighlightTimeString);
    savedIsFixedTime = true;
  }

  const [userTimezone, _] = useState(_getTimezone(moment.tz.guess()));
  const [selectedTimezones, setSelectedTimezones] = useState(savedTimezones);
  const [isFixedTime, setIsFixedTime] = useState(savedIsFixedTime);
  const [highlightTime, setHighlightTime] = useState(savedHighlightTime);
  const [globalTime, setGlobalTime] = useState(newUTCDate());
  tick(setGlobalTime, newUTCDate);
  console.log('highlightTime', highlightTime)

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
          <Timezone
            globalTime={globalTime}
            highlightTime={highlightTime}
            isUserTimezone={true}
            isFixedTime={isFixedTime}
            onHighlightTimeChange={handleSetHighlightTime}
            setIsFixedTime={handleSetIsFixedTime}
            timezone={userTimezone} />
          {
            selectedTimezones.map(tz =>
              <Timezone
                key={tz.label}
                globalTime={globalTime}
                highlightTime={highlightTime}
                isFixedTime={isFixedTime}
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
