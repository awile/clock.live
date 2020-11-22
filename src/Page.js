
import React, { useState } from 'react'

import { useSiteData } from 'react-static'
import { Timezone, Search } from './components/';
import { getTimezone, addSelectedTimezone } from './utils/';
import * as moment from 'moment-timezone';

const Page = () => {
  const { timezones, search_names } = useSiteData();
  const _getTimezone = (tz) => getTimezone(tz, timezones, search_names);

  const guess = moment.tz.guess();
  const [userTimezone, _] = useState(_getTimezone(guess));
  const [selectedTimezones, setSelectedTimezones] = useState([]);

  const handleChange = (tz) => {
    const newSelectedTimezones = addSelectedTimezone(_getTimezone(tz), selectedTimezones);
    setSelectedTimezones(newSelectedTimezones);
  };

  return (
    <div>
      <div className="App-header">
        <h2 className='header'>clocks.live</h2>
        <Search searchNames={Object.keys(search_names)} onChange={handleChange}/>
      </div>
      <div className='App-tz'>
        <div className='App-tz-containers'>
          <Timezone timezone={userTimezone} />
          {
            selectedTimezones.map(tz =>
              <Timezone timezone={tz} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
