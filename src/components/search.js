
import React, { useState } from 'react'


function Search({ searchNames, onChange }) {
  const [term, setTerm] = useState('');
  const [matches, setMatches] = useState([]);
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      onChange(term);
      setTerm('');
      setMatches([]);
    }
  };
  const handleChange = (event) => {
    const term = event.target.value;
    setTerm(term);
    if (term === '') {
      setMatches([]);
    } else {
      const searchHits = searchNames.filter(name => name.toLowerCase().includes(term.toLowerCase()));
      setMatches(searchHits);
    }
  };
  const setOnClick = (value) => () => {
    onChange(value);
    setTerm('');
    setMatches([]);
  }
  return (
    <div>
      <input
        type='text'
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={term} />
        {
          matches.slice(0, 5).map(m => (
            <p key={m} onClick={setOnClick(m)}>{m}</p>
          ))
        }
    </div>
  );
}

export default Search;
