import React from 'react'

export default ({ date, userTimezone }) => {

  const formatDate = (date) => {
    let [hour, minute] = date.toLocaleTimeString("en-US").split(/:| /);
    return `${userTimezone.label} - ${hour}:${minute} PM`;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>clocks.live</h1>
      <div>{formatDate(date)}</div>
    </div>
  );
};
