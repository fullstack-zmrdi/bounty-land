import 'babel-polyfill'
import 'font-awesome/css/font-awesome.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import injectTapEventPlugin from 'react-tap-event-plugin'
const rootEl = document.getElementById('wrapper')
injectTapEventPlugin()

ReactDOM.render(
  <App />,
  rootEl
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}
