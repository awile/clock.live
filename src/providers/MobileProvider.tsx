
import React, { Context, createContext, FC, useEffect, useState } from 'react';
import { debounce } from '../utils/';

interface MobileContext {
  isMobile: boolean
}

const MobileContext: Context<MobileContext> = createContext({} as MobileContext);

const MobileProvider: FC = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [hasBeenCalled, setHasBeenCalled] = useState<boolean>(false);

  const updateIsMobile = debounce((): void => {
    let width = window.innerWidth;
    try {
      if (screen) { // eslint-disable-line
        width = screen.width; // eslint-disable-line
      }
    } catch (e) { } // eslint-disable-line
    const isMobileSize = width <= 600;
    setIsMobile(isMobileSize);
  }, 100);
  useEffect(() => {
    if (!hasBeenCalled) {
      updateIsMobile()
      setHasBeenCalled(true);
    }
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, [isMobile, updateIsMobile, hasBeenCalled]);

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};

export { MobileContext, MobileProvider };
