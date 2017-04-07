import React from 'react'
import Layout from './layout'
import { browserHistory, createMemoryHistory, Router, Route, IndexRoute } from 'react-router'
import LandingPage from './routes/landing-page'
import AboutUs from './routes/about-us'

export const history = typeof document !== 'undefined' ? browserHistory : createMemoryHistory()

export const router = <Router history={history}>
  <Route path='/' component={Layout}>
    <IndexRoute component={LandingPage} />
    <Route path='o-nas' component={AboutUs} />
  </Route>
</Router>

export default () => router
