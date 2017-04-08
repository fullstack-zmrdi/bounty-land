import React from 'react'
import {
  Redirect
} from 'react-router-dom'
import { auth, facebookProvider, login } from '../firebase'
import styled from 'styled-components';
import { RaisedButton } from 'material-ui'

const LoginScreen = styled.div`
  background: linear-gradient(180deg, #00BBD3 0%, #AF9A38 100%);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 50%;
  height: auto;
  margin-bottom: 30px;
`

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    redirectToReferrer: false
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      this.setState({redirectToReferrer: true})
    })
  }

  processLogin = () => {
    auth.signInWithPopup(facebookProvider).then(({user}) => {
      login(user.toJSON())
      this.setState({redirectToReferrer: true})
    }).catch(function ({code, message, email, credential}) {
      console.error(message)
    })
  }

  render () {
    const {from} = this.props.location.state || '/'
    const {redirectToReferrer} = this.state

    return (
      <LoginScreen>
        {redirectToReferrer && (
          <Redirect to={from || '/'} />
        )}
        <Logo src="/images/logo.png" />
        <RaisedButton onTouchTap={this.processLogin} label="Login" />
      </LoginScreen>
    )
  }
}

export default Login
