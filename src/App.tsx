
import React, { FunctionComponent, Suspense } from 'react'

import { HighlightTimeProvider, TimezonesProvider } from './providers/';
import Page from './Page';
import './app.scss'

type AppProps = {
}

const App: FunctionComponent<AppProps> = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="App">
        <TimezonesProvider>
          <HighlightTimeProvider>
            <Page />
          </HighlightTimeProvider>
        </TimezonesProvider>
      </div>
    </Suspense>
  );
}

export default App
