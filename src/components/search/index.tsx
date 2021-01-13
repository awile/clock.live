
import React, { ChangeEvent, MouseEvent, TouchEvent, FunctionComponent, KeyboardEvent, useState } from 'react'

import './_search.scss';
import { Timezone } from '../../types/'
const searchAddIcon = require('../../images/search-add.svg'); // eslint-disable-line
const searchAddIconActive = require('../../images/search-add-active.svg'); // eslint-disable-line
const clearIcon = require('../../images/clear.svg'); // eslint-disable-line
const checkIcon = require('../../images/check.svg'); // eslint-disable-line

type SearchProps = {
  searchNames: string[]
  selectedTimezones: Timezone[]
  onChange: (timezone: string) => void
  isMobile?: boolean
}

const Search: FunctionComponent<SearchProps> = ({ searchNames, selectedTimezones, onChange, isMobile }: SearchProps) => {
  const selectedTimezoneLabels = selectedTimezones.map(tz => tz.label);
  const [term, setTerm] = useState<string>('');
  const [matches, setMatches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && matches.length > 0) { // Enter
      onChange(matches[0]);
      setTerm('');
      setMatches([]);
      setIsFocused(false);
    } else if (event.keyCode === 13) {
      setTerm('');
      setMatches([]);
      setIsFocused(false);
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term: string = event.target.value;
    setTerm(term);
    if (term === '') {
      setMatches([]);
    } else {
      const searchHits: string[] = searchNames.filter(name => name.toLowerCase().includes(term.toLowerCase()));
      setMatches(searchHits);
      setIsFocused(true);
    }
  };
  const setOnClick = (value: string) => (event: MouseEvent | TouchEvent) => {
    console.log(event)
    event.preventDefault();
    event.stopPropagation();
    onChange(value);
    setTerm('');
    setMatches([]);
    setIsFocused(false);
  }

  const setFocus = () => setIsFocused(true);
  const clearSearch = () => term.length > 0 && setTerm('');
  return (
    <div className={`Search ${isMobile ? 'Search--mobile' : ''}`}>
      <div className={`Search-bar ${isFocused ? 'Search-bar--focused' : ''}`}>
        <img className='Search-icon' src={isFocused ? searchAddIconActive : searchAddIcon} alt='' />
        <input
          onFocus={setFocus}
          type='text'
          placeholder='Search a City'
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={term} />
        <div className='Search-clear' onTouchStart={clearSearch} onClick={clearSearch}>
          { term.length > 0 && 
            <img src={clearIcon} alt="" /> }
        </div>
      </div>
      { term && isFocused &&
        <div className='Search-results'>
          { matches.length === 0 ?
              <div className="Search-results--none">No cities found for <span>{`"${term}"`}</span>.</div> :
                matches.slice(0, 5).map(m => (
                <div className='Search-item-container'>
                  <p key={m} className='Search-item' 
                    onTouchStart={setOnClick(m)} 
                    onClick={setOnClick(m)}>{m}</p>
                  { selectedTimezoneLabels.includes(m) && 
                    <img className='Search-item--selected' src={checkIcon} alt='✔️'/>}
                </div>))
          }
        </div>}
    </div>
  );
}

export default Search;
