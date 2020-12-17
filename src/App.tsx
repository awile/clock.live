
import React, { FunctionComponent, Suspense } from 'react'

import Page from './Page';
import './app.scss'

type AppProps = {
}

const App: FunctionComponent<AppProps> = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="App">
        <Page />
      </div>
    </Suspense>
  );
}

export default App
