
import React, { useState } from 'react'

import { useSiteData } from 'react-static'
import { Timezone, Search } from './components/';
import { addSelectedTimezone, getTimezone, newDate, removeSelectedTimezone } from './utils/';
import * as moment from 'moment-timezone';

const Page = () => {
  const { timezones, search_names } = useSiteData();
  const _getTimezone = (tz) => getTimezone(tz, timezones, search_names);

  const [userTimezone, _] = useState(_getTimezone(moment.tz.guess()));
  const [selectedTimezones, setSelectedTimezones] = useState([]);
  const [isFixedTime, setIsFixedTime] = useState(false);
  const [highlightTime, setHighlightTime] = useState(null);
  const [globalTime, setGlobalTime] = useState(newDate(userTimezone.utc[0]));
  tick(setGlobalTime, userTimezone);

  const handleAddTimezone = (tz) => {
    const newSelectedTimezones = addSelectedTimezone(_getTimezone(tz), selectedTimezones);
    setSelectedTimezones(newSelectedTimezones);
  };
  const handleRemoveTimezone = (tz) => {
    const newSelectedTimezones = removeSelectedTimezone(_getTimezone(tz), selectedTimezones);
    setSelectedTimezones(newSelectedTimezones);
  };

  const handleClickOffTimezone = () => {
    setIsFixedTime(false);
    setHighlightTime(null);
  }

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
            onHighlightTimeChange={setHighlightTime}
            setIsFixedTime={setIsFixedTime}
            timezone={userTimezone} />
          {
            selectedTimezones.map(tz =>
              <Timezone
                key={tz.label}
                globalTime={globalTime}
                highlightTime={highlightTime}
                isFixedTime={isFixedTime}
                onHighlightTimeChange={setHighlightTime}
                onRemoveTimezone={handleRemoveTimezone}
                setIsFixedTime={setIsFixedTime}
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

const tick = (setTime, timezone) => {
  const updateTime = () => setTime(newDate(timezone.utc[0]));
  const timeout = 10 * 1000; // 10 seconds
  setTimeout(updateTime, timeout);
};

export default Page;
