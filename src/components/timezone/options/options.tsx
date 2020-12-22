
import React, { FC } from 'react';

import './_options.scss';
const closeIcon = require('../../../images/close.svg');

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
    <div className='tz-Options'>
      <div className='tz-Options-reorder'>
        <div
          className='tz-Options-move-left'
          onClick={handleMoveLeft}>
          { isFirst ? ' ' : '<' }
        </div>
        <div
          className='tz-Options-move-right'
          onClick={handleMoveRight}>
          { isLast ? ' ' : '>' }
        </div>
      </div>
      <div
        className="tz-Options-remove-tz"
        onClick={handleRemoveTimezone}>
        { !isUserTimezone ? 
            <img className='tz-Options-close-icon' src={closeIcon} alt='x' /> : 
            <div className='tz-Options-placeholder'></div> 
        }
        {/* <img className='tz-Options-close-icon' src={closeIcon} alt='x' /> */}
      </div>
    </div>
  );
};

export default Options;
