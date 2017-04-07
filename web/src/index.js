import 'babel-polyfill'
import 'font-awesome/css/font-awesome.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'

const rootEl = document.getElementById('wrapper')

ReactDOM.render(
  <Routes />,
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
