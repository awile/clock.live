import React from 'react'

const Time = ({ date, timezone }) => {

  const formatDate = (date) => {
    return date.format('h:mm A');
  };
  let label = timezone.timezone;
  if (label.includes('/')) {
    label = (label.split('/').reverse().join(', '))
  }
  label = label.replaceAll('_', ' ');

  return (
    <div className='Time-container' style={{ textAlign: 'center' }}>
      <div className='Time-label'>{label}</div>
      <div>{formatDate(date)}</div>
    </div>
  );
};

export default Time;
