import React from 'react'
import {
  Redirect
} from 'react-router-dom'
import { auth, facebookProvider, login } from '../firebase'

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
      <section>
        {redirectToReferrer && (
          <Redirect to={from || '/'} />
        )}
        {from && (
          <p>You must log in to view the page at {from.pathname}</p>
        )}
        <button onClick={this.processLogin}>Login via Facebook</button>
      </section>
    )
  }
}

export default Login
