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
import { auth, storageKey, isAuthenticated, login, logout } from './firebase'

class App extends React.Component {
  componentDidMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        login(user.toJSON())
        this.setState({logged: true})
      } else {
        logout()
        this.setState({logged: false})
      }
    })
  }

  processLogout = () => {
    this.setState({logged: false})
    logout()
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Router>
          <div>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About</Link></li>
              <ProtectedLink to='/profile'>Profile</ProtectedLink>
              <ProtectedLink to='/wallet'>Wallet</ProtectedLink>
              {!isAuthenticated()
                ? <li><Link to='/login'>Login</Link></li>
                : <li onClick={logout}>Logout</li>
              }
            </ul>

            <hr />

            <Route exact path='/' component={Routes.Home} />
            <Route exact path='/profile' component={Routes.Profile} />
            <Route exact path='/login' component={Routes.Login} />
            <Route path='/about' component={Routes.AboutUs} />
            <ProtectedRoute path='/wallet' component={Routes.Wallet} />
          </div>
        </Router>
      </MuiThemeProvider>)
  }
}

const ProtectedLink = ({to, children}) => {
  if (!isAuthenticated()) return null

  return <li><Link to={to}>{children}</Link></li>
}

const ProtectedRoute = ({component: Component, ...rest}) => (
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

export default App
