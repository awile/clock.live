
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import './_search.scss';

type SearchProps = {
  searchNames: string[]
  onChange: (timezone: string) => void
}

export default function Search({ searchNames, onChange }: SearchProps) {
  const [term, setTerm] = useState<string>('');
  const [matches, setMatches] = useState<string[]>([]);
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) { // Enter
      onChange(term);
      setTerm('');
      setMatches([]);
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
    }
  };
  const setOnClick = (value: string) => () => {
    onChange(value);
    setTerm('');
    setMatches([]);
  }
  return (
    <div className='Search'>
      <input
        type='text'
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={term} />
        {
          matches.slice(0, 5).map(m => (
            <p key={m} className='Search-item' onClick={setOnClick(m)}>{m}</p>
          ))
        }
    </div>
  );
}
