import 'babel-polyfill'
import 'font-awesome/css/font-awesome.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'


const rootEl = document.getElementById('wrapper')

ReactDOM.render(
  <App />,
  rootEl
)

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextApp = require('./routes').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}
