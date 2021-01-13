
import React, { FC, Suspense, useState } from 'react'
import { Head } from 'react-static';

import { HighlightTimeProvider, MobileProvider, TimezonesProvider } from './providers/';
import { upgradeLocalStorageSchema } from './utils/';
import Page from './Page';
import './app.scss'
const favicon = require('./images/favicon.ico'); // eslint-disable-line

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
    <React.Fragment>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'/>
        <link rel="icon" href={favicon} />
      </Head>
      <TimezonesProvider>
        <HighlightTimeProvider>
          <MobileProvider>
            { isDOMLoaded ? <Page /> : <Loader /> }
          </MobileProvider>
        </HighlightTimeProvider>
      </TimezonesProvider>
    </React.Fragment>
  );
}

const Loader: FC = () => <div>loading...</div>;

export default App
