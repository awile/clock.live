
import React, { FC, Suspense, useState } from 'react'

import { HighlightTimeProvider, MobileProvider, TimezonesProvider } from './providers/';
import { upgradeLocalStorageSchema } from './utils/';
import Page from './Page';
import './app.scss'

type AppProps = {
}

const App: FC<AppProps> = () => {
  upgradeLocalStorageSchema();

  return (
    <Suspense fallback={<Loader />}>
      <AppContainer />
    </Suspense>
  );
}

const AppContainer: FC = () => {
  const [isDOMLoaded, setIsDOMLoaded] = useState(false);
  
  if (typeof document !== 'undefined') {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete' && !isDOMLoaded) {
        setIsDOMLoaded(true);
      }
    };
  } else {
    if (!isDOMLoaded) {
      setIsDOMLoaded(true);
    }
  }
  return (
    <TimezonesProvider>
      <HighlightTimeProvider>
        <MobileProvider>
          { isDOMLoaded ? <Page /> : <Loader /> }
        </MobileProvider>
      </HighlightTimeProvider>
    </TimezonesProvider>
  );
}

const Loader: FC = () => <div>loading...</div>;

export default App
