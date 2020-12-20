
import React, { FC } from 'react';

interface OptionsProps {
  handleMoveLeft: () => void
  handleRemoveTimezone: () => void
  handleMoveRight: () => void
  isFirst: boolean
  isLast: boolean
  isUserTimezone: boolean
}

const Options: FC<OptionsProps> = ({
  handleMoveLeft,
  handleRemoveTimezone,
  handleMoveRight,
  isFirst,
  isLast,
  isUserTimezone
}) => {

  return (
    <div className='Timezone-options'>
      <div
        className='Timezone-move-left'
        onClick={handleMoveLeft}>
        { isFirst ? ' ' : '<' }
      </div>
      <div
        className="Timezone-remove-tz"
        onClick={handleRemoveTimezone}>
        { !isUserTimezone ? 'x' : '' }
      </div>
      <div
        className='Timezone-move-right'
        onClick={handleMoveRight}>
        { isLast ? ' ' : '>' }
      </div>
    </div>
  );
};

export default Options;
