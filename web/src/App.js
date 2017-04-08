import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import './App.scss'
import * as Routes from './routes'
import { observer } from 'mobx-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Drawer, MenuItem, AppBar } from 'material-ui'
import { auth, isAuthenticated, login, logout } from './firebase'

import globalStore from './stores/global-store'

@observer
class App extends React.Component {
  componentDidMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        login(user.toJSON())
      } else {
        logout()
      }
    })
  }

  toggleMenu = () => {
    globalStore.menuIsOpen = !globalStore.menuIsOpen
  }

  processLogout = () => {
    this.toggleMenu()
    logout()
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <Router>
            <div>
              {isAuthenticated() && <div>
                <AppBar
                  title={globalStore.title}
                  iconClassNameRight='muidocs-icon-navigation-expand-more'
                  onLeftIconButtonTouchTap={this.toggleMenu}
                /><Drawer
                  docked={false}
                  width={200}
                  open={globalStore.menuIsOpen}
                  onRequestChange={(open) => {
                    globalStore.menuIsOpen = open
                  }}
                >
                  <MenuItem onTouchTap={this.toggleMenu}><Link to='/'>Map</Link></MenuItem>
                  <ProtectedLink to='/profile'>Profile</ProtectedLink>
                  <ProtectedLink to='/wallet'>Wallet</ProtectedLink>
                  {!isAuthenticated()
                    ? <MenuItem onTouchTap={this.toggleMenu}><Link to='/login'>Login</Link></MenuItem>
                    : <MenuItem onTouchTap={this.processLogout}>Logout</MenuItem>
                  }
                </Drawer>
              </div>}

              <ProtectedRoute exact path='/' component={Routes.Home} />
              <Route exact path='/login' component={Routes.Login} />
              <ProtectedRoute exact path='/profile' component={Routes.Profile} />
              <ProtectedRoute path='/about' component={Routes.AboutUs} />
              <ProtectedRoute path='/add' component={Routes.AddChallenge} />
              <ProtectedRoute path='/wallet' component={Routes.Wallet} />
            </div>
          </Router>
        </div>
      </MuiThemeProvider>)
  }
}

const ProtectedLink = ({to, children}) => {
  if (!isAuthenticated()) return null

  return <MenuItem onTouchTap={() => {
    globalStore.menuIsOpen = false
  }} ><Link to={to}>{children}</Link></MenuItem>
}

const ProtectedRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={renderProps => (
    isAuthenticated() ? <Component {...renderProps} /> : (
      <Redirect to={{
        pathname: '/login',
        state: {from: renderProps.location}
      }} />
    )
  )} />
)

export default App
