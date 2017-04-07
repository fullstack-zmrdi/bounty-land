// import React from 'react'
// import Layout from './layout'
// import { browserHistory, createMemoryHistory, Router, Route, IndexRoute } from 'react-router'
// import LandingPage from './routes/landing-page'
// import AboutUs from './routes/about-us'
//
// export const history = typeof document !== 'undefined' ? browserHistory : createMemoryHistory()
//
// export const router = <Router history={history}>
//   <Route path='/' component={Layout}>
//     <IndexRoute component={LandingPage} />
//     <Route path='o-nas' component={AboutUs} />
//   </Route>
// </Router>
//
// export default () => router
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import AboutUs from './routes/about-us'
import Wallet from './routes/wallet'

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
        <li><Link to="/wallet">Wallet</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={AboutUs}/>
      <Route path="/topics" component={Topics}/>
      <Route path="/wallet" component={Wallet}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default App
