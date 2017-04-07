import React, {Component} from 'react'

import { View, Platform } from 'react-native'
import * as firebase from "firebase"
import Toast from 'react-native-toast'

import { Container, Content, Card, CardItem, Text, Body, H2, Button,  Row, Form, Item, Label, Input} from 'native-base';
import Auth from '../../auth'

class SignIn extends Component {
  static navigatorStyle = {

  }

  constructor () {
    super()
    this.auth = Auth
  }

  signInFacebook () {
    this.auth.signInFacebook()
  }

  signInGoogle () {
    this.auth.signInGoogle()
  }

  render () {
      return (
        <Container style={{ padding: 16 }}>
          <Content>
            <Button onPress={() => this.signInFacebook()}><Text>sign_in_fb</Text></Button>
            <Button onPress={() => this.signInGoogle()}><Text>sign_in_google</Text></Button>
          </Content>
        </Container>
      )
  }
}

export default SignIn
