
import React, { Context, createContext, FC, useState } from 'react';
import moment from 'moment-timezone';
import { useSiteData } from 'react-static'

import { Timezone } from '../types/';
import { SELECTED_TIMEZONES, getTimezone, getLabelFromTimezone, getLocalStorageKey, setLocalStorageKey } from '../utils/';

interface TimezonesContext {
  getTimezoneByName: (tz: string) => Timezone
  selectedTimezones: Timezone[]
  searchNames: { [name: string]: number }
  updateSelectedTimezones: (selectedTimezones: Timezone[]) => void
  userTimezone: Timezone
}

interface SiteData {
  timezones: string[]
  search_names: { [name: string]: number }
}

const TimezonesContext: Context<TimezonesContext> = createContext({} as TimezonesContext);

const TimezonesProvider: FC = ({ children }) => {
  const { timezones, search_names }: SiteData  = useSiteData();
  const getTimezoneByName = (tz: string): Timezone => getTimezone(tz, timezones, search_names);

  const userTimezone = getTimezoneByName(moment.tz.guess());
  userTimezone.label = getLabelFromTimezone(userTimezone.label);

  const savedSelectedTimezones: string = getLocalStorageKey(SELECTED_TIMEZONES, '[]');
  const initialSelectedTimezones = getInitialSelectedTimezones(savedSelectedTimezones, userTimezone);
  setLocalStorageKey(SELECTED_TIMEZONES, JSON.stringify(initialSelectedTimezones));

  const [selectedTimezones, setSelectedTimezones] = useState<Timezone[]>(initialSelectedTimezones);

  const updateSelectedTimezones = (newSelectedTimezones: Timezone[]) => {
    setSelectedTimezones(newSelectedTimezones);
    setLocalStorageKey(SELECTED_TIMEZONES, JSON.stringify(newSelectedTimezones));
  };

  return (
    <TimezonesContext.Provider
      value={{
        getTimezoneByName,
        searchNames: search_names,
        selectedTimezones,
        updateSelectedTimezones,
        userTimezone
      }}
    >
    {children}
    </TimezonesContext.Provider>
  );
};

const getInitialSelectedTimezones = (selectedTimezonesString: string, userTimezone: Timezone): Timezone[] => {
  let timezones: Timezone[] = JSON.parse(selectedTimezonesString);
  if (userTimezone && timezones.every(tz => tz.timezone !== userTimezone.timezone)) {
    timezones = [userTimezone].concat(timezones);
  }
  return timezones;
};

export { TimezonesProvider, TimezonesContext };
