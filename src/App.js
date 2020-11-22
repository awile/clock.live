import React, { Suspense } from 'react'

import Page from './Page.js';
import './app.css'

const App = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="App">
        <Page />
      </div>
    </Suspense>
  )
}

export default App
