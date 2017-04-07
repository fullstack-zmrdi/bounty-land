import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import * as Routes from './routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { auth, storageKey, isAuthenticated } from './firebase'

class App extends React.Component {

  componentDidMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid)
        this.setState({uid: user.uid})
      } else {
        window.localStorage.removeItem(storageKey)
        this.setState({uid: null})
      }
    })
  }

  logout = () => {
    auth.signOut()
      .then(() => this.setState({uid: null}))
      .catch((message) => console.error('logout error: ', message))

  }

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Router>
          <div>
            <ul>
              <li><Link to='/'>Home</Link></li>
              {!isAuthenticated()
                ? <li><Link to='/login'>Login</Link></li>
                : <li onClick={this.logout}>Logout</li>
              }
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/wallet'>Wallet</Link></li>
            </ul>

            <hr />

            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Routes.Login} />
            <Route path='/about' component={Routes.AboutUs} />
            <MatchWhenAuthorized path='/wallet' component={Routes.Wallet} />
          </div>
        </Router>
      </MuiThemeProvider>)
  }
}

const MatchWhenAuthorized = ({component: Component, ...rest}) => (
  <Route {...rest} render={renderProps => (
    isAuthenticated() ? (
      <Component {...renderProps} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: {from: renderProps.location}
      }} />
    )
  )} />
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

// const About = () => (
//   <div>
//     <h2>About</h2>
//   </div>
// )
//
// const Topics = ({match}) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>
//           Props v. State
//         </Link>
//       </li>
//     </ul>
//
//     <Route path={`${match.url}/:topicId`} component={Topic} />
//     <Route exact path={match.url} render={() => (
//       <h3>Please select a topic.</h3>
//     )} />
//   </div>
// )
//
// const Topic = ({match}) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// )

export default App
