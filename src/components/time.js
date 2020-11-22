import React from 'react'

const Time = ({ date, timezone }) => {

  const formatDate = (date) => {
    return `${timezone.label} - ${date.format('hh:mm A')}`;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div>{formatDate(date)}</div>
    </div>
  );
};

export default Time;
