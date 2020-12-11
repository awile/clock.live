import React from 'react'

const Time = ({ date, timezone }) => {

  const formatDate = (date) => {
    return date.format('h:mm A');
  };

  return (
    <div className='Time-container' style={{ textAlign: 'center' }}>
      <div>{timezone.value}</div>
      <div>{formatDate(date)}</div>
    </div>
  );
};

export default Time;
