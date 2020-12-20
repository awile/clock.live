
import React, { Context, createContext, FC, useState } from 'react';

import { getLocalStorageKey, setLocalStorageKey } from '../utils/';

interface HighlightTimeContext {
  highlightTime: string
  updateHighlightTime: (newHighlightTime: string) => void
  isFixedTime: boolean
  updateIsFixedTime: (newIsFixedTime: boolean) => void
}

const HighlightTimeContext: Context<HighlightTimeContext> = createContext({} as HighlightTimeContext);

const HIGHLIGHT_TIME = 'highlightTime';

const HighlightTimeProvider: FC = ({ children }) => {

  const [highlightTime, setHighlightTime] = useState<string>(getLocalStorageKey(HIGHLIGHT_TIME, ''));
  const [isFixedTime, setIsFixedTime] = useState<boolean>(highlightTime !== '');

  const updateHighlightTime = (newHighlightTime: string) => {
    setHighlightTime(newHighlightTime);
    setLocalStorageKey(HIGHLIGHT_TIME, newHighlightTime);
  };
  const updateIsFixedTime = (newIsFixedTime: boolean) => setIsFixedTime(newIsFixedTime);

  return (
    <HighlightTimeContext.Provider
      value={{
        highlightTime,
        updateHighlightTime,
        isFixedTime,
        updateIsFixedTime
      }}
    >
      {children}
    </HighlightTimeContext.Provider>
  );
};

export { HighlightTimeProvider, HighlightTimeContext };
