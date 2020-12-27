
import React, { FC } from 'react';

import './_options.scss';
const closeIcon = require('../../../images/close.svg'); // eslint-disable-line

interface OptionsProps {
  handleMoveLeft: () => void
  handleRemoveTimezone: () => void
  handleMoveRight: () => void
  isFirst: boolean
  isLast: boolean
  isUserTimezone: boolean
  isMobile?: boolean
}

const Options: FC<OptionsProps> = ({
  handleMoveLeft,
  handleRemoveTimezone,
  handleMoveRight,
  isFirst,
  isLast,
  isMobile,
  isUserTimezone
}) => {

  return (
    <div className={'tz-Options ' + (isMobile ? 'tz-Options--mobile' : '')}>
      <div
        className={'tz-Options-move-left ' + (!isFirst ? 'tz-Options--active' : '')}
        onClick={handleMoveLeft}>
        { isFirst ? ' ' : '<' }
      </div>
      <div
        className={'tz-Options-move-right ' + (!isLast ? 'tz-Options--active' : '')}
        onClick={handleMoveRight}>
        { isLast ? ' ' : '>' }
      </div>
      <div
        className="tz-Options-remove-tz"
        onClick={handleRemoveTimezone}>
        { !isUserTimezone ? 
            <img className='tz-Options-close-icon' src={closeIcon} alt='x' /> : 
            <div className='tz-Options-placeholder'></div> 
        }
      </div>
    </div>
  );
};

export default Options;
