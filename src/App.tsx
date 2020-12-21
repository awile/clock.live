
import React, { FC, Suspense, useState } from 'react'

import { HighlightTimeProvider, TimezonesProvider } from './providers/';
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
      if (document.readyState === 'complete') {
        setIsDOMLoaded(true);
      }
    };
  } else {
    setIsDOMLoaded(true);
  }
  return (
      <div className="App">
        <TimezonesProvider>
          <HighlightTimeProvider>
            { isDOMLoaded ? <Page /> : <Loader /> }
          </HighlightTimeProvider>
        </TimezonesProvider>
      </div>
  );
}

const Loader: FC = () => <div>loading...</div>;

export default App
