
import React, { useState } from 'react'

import { useSiteData } from 'react-static'
import LiveWrapper from './components/live-wrapper';
import * as moment from 'moment-timezone';

const Page = () => {
  const { timezones, search_names } = useSiteData();
  const userTimezone = _getUserTimezone(timezones, search_names);

  return (
    <div className="App-header">
      <LiveWrapper userTimezone={userTimezone} />
    </div>
  );
};

function _getUserTimezone(timezones, search_names) {
  const guess = moment.tz.guess();
  const timezoneIndex = search_names[guess.split('/')[1]];
  const userTimezone = timezones[timezoneIndex];
  return { label: guess, ...userTimezone };
}


export default Page;
