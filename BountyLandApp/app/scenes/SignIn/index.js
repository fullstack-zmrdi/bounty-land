import * as firebase from "firebase"

import { Body, Button, Card, CardItem, Container, Content, Form, H2, Input, Item, Label, Row, Text } from 'native-base';
import { Image, Platform, View } from 'react-native'
import React, {Component} from 'react'

import Auth from '../../auth'
import Icon from 'react-native-vector-icons/Zocial';
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
                <View style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 25 }}>
                  <Image
                    style={{ resizeMode: 'contain', width: null, height: null, flex: 1 }}
                    source={require('../../images/logo.png')}/>
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Icon.Button
                      style={{ width: 270, justifyContent: 'center' }}
                      name="facebook"
                      color={'#fff'}
                      backgroundColor="#3b5998"
                      onPress={() => this.signInFacebook()}>
                      <Text style={{ color: '#fff' }}>Sign in with Facebook</Text>
                    </Icon.Button>
                </View>
                <View>
                  <Icon.Button
                    name="google"
                    style={{ width: 270, justifyContent: 'center' }}
                    color={'#fff'}
                    backgroundColor='#ff0000'
                    onPress={() => this.signInGoogle()}>
                    <Text  style={{ color: '#fff' }}>Sign in with Google</Text>
                  </Icon.Button>
                </View>


                </View>
          </Image>
        </Container>

      )
  }
}

export default SignIn
