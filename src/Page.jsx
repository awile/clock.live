
import React, { useState } from 'react'

import { useSiteData } from 'react-static'
import { Timezone, Search } from './components/';
import { getTimezone, addSelectedTimezone, removeSelectedTimezone } from './utils/';
import * as moment from 'moment-timezone';

const Page = () => {
  const { timezones, search_names } = useSiteData();
  const _getTimezone = (tz) => getTimezone(tz, timezones, search_names);

  const [userTimezone, _] = useState(_getTimezone(moment.tz.guess()));
  const [selectedTimezones, setSelectedTimezones] = useState([]);
  const [isFixedTime, setIsFixedTime] = useState(false);
  const [highlightTime, setHighlightTime] = useState(null);

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
            isFixedTime={isFixedTime}
            setIsFixedTime={setIsFixedTime}
            timezone={userTimezone}
            highlightTime={highlightTime}
            onHighlightTimeChange={setHighlightTime} />
          {
            selectedTimezones.map(tz =>
              <Timezone
                key={tz.label}
                isFixedTime={isFixedTime}
                highlightTime={highlightTime}
                setIsFixedTime={setIsFixedTime}
                onHighlightTimeChange={setHighlightTime}
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
