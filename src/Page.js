
import React, { useState } from 'react'

import { useSiteData } from 'react-static'
import { Timezone, Search } from './components/';
import { getTimezone, addSelectedTimezone, removeSelectedTimezone } from './utils/';
import * as moment from 'moment-timezone';

const Page = () => {
  const { timezones, search_names } = useSiteData();
  const _getTimezone = (tz) => getTimezone(tz, timezones, search_names);

  const guess = moment.tz.guess();
  const [userTimezone, _] = useState(_getTimezone(guess));
  const [selectedTimezones, setSelectedTimezones] = useState([]);
  const [cursorTime, setCursorTime] = useState(null);

  const handleAddTimezone = (tz) => {
    const newSelectedTimezones = addSelectedTimezone(_getTimezone(tz), selectedTimezones);
    setSelectedTimezones(newSelectedTimezones);
  };
  const handleRemoveTimezone = (tz) => {
    const newSelectedTimezones = removeSelectedTimezone(_getTimezone(tz), selectedTimezones);
    setSelectedTimezones(newSelectedTimezones);
  };

  return (
    <React.Fragment>
      <div className="App-header">
        <h2 className='header'>clocks.live</h2>
      </div>
      <div className='App-tz'>
        <div className='App-tz-containers'>
          <Timezone
            isUserTimezone={true}
            timezone={userTimezone}
            cursorTime={cursorTime}
            onCursorTimeChange={setCursorTime} />
          {
            selectedTimezones.map(tz =>
              <Timezone
                key={tz.label}
                cursorTime={cursorTime}
                onCursorTimeChange={setCursorTime}
                onRemoveTimezone={handleRemoveTimezone}
                timezone={tz} />
          )}
          <Search searchNames={Object.keys(search_names)} onChange={handleAddTimezone} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Page;
