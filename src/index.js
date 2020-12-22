
import React from 'react' // eslint-disable-line no-use-before-define
import { hydrate, render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

// Your top level component
import App from './App'

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const target = document.getElementById('root')

  const renderMethod = target.hasChildNodes()
    ? hydrate
    : render

  const renderer = Comp => {
    renderMethod(
      <AppContainer>
        <Comp />
      </AppContainer>,
      target
    )
  }

  // Render!
  renderer(App)

  // Hot Module Replacement
  if (module && module.hot) {
    module.hot.accept('./App', () => {
      renderer(App)
    })
  }
}
