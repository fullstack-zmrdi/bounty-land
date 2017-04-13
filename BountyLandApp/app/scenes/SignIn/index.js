import * as firebase from "firebase"

import { Body, Button, Card, CardItem, Container, Content, Form, H2, Input, Item, Label, Row, Text } from 'native-base';
import { Image, Platform, View } from 'react-native'
import React, {Component} from 'react'

import Auth from '../../auth'
import MapView from 'react-native-maps';
import Toast from '@remobile/react-native-toast'

class SignIn extends Component {
  static navigatorStyle = {
     navBarHidden: true, // make the nav bar hidden
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
        <Container>
          <Image
            source={require('../../images/bounty_bg.png')}
            style={{ flex: 1, resizeMode: 'cover', alignItems: 'center', justifyContent: 'center', width: null, height: null }}>
                <View>
                <Button
                  style={{ backgroundColor: '#rgb(73, 99, 159)', width: 270, justifyContent: 'center', marginBottom: 10 }}
                  onPress={() => this.signInFacebook()}>
                  <Text>Sign in with Facebook</Text>
                </Button>
                <Button
                  style={{ backgroundColor: '#ff0000', width: 270, justifyContent: 'center' }}
                  onPress={() => this.signInGoogle()}>
                  <Text>Sign in with Google</Text>
                </Button>
                </View>
          </Image>
        </Container>

      )
  }
}

export default SignIn
