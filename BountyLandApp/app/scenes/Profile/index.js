import { Body, Button, Card, CardItem, Container, Content, Form, H2, H3, Input, Item, Label, ListItem, Row, Text, Textarea } from 'native-base';
import { Image, View } from 'react-native'
import React, {Component} from 'react'

import Auth from '../../auth'
import colors from 'material-colors'
import { navigatorStyle } from '../../theme'

class Profile extends Component {
  static navigatorStyle = navigatorStyle

  constructor () {
    super()
    this.auth = Auth
  }

  state = {
    authData: {}
  }

  componentDidMount () {
    this.auth.getAuthData()
    .then((authData) => {
      // console.log('have auth data cdnnnn', authData)
      this.setState({ authData })
    })
  }

  signOut () {
    this.auth.signOut()
  }

  render () {
      return (
        <Container style={{ padding: 16 }}>
          <Content>
            <Image
              source={{ uri: this.state.authData.photo }}
              style={{ width: 80, height: 80, alignSelf: 'center', borderRadius: 40 }} />
            <H2 style={{ textAlign: 'center', paddingVertical: 12, fontWeight: 'bold' }}>
              {this.state.authData.name}
            </H2>
            <H3 style={{ textAlign: 'center', paddingVertical: 8 }}>
              {this.state.authData.email}
            </H3>
            <Button
              style={{ alignSelf: 'center', marginTop: 16, backgroundColor: colors.cyan['500'] }}
              onPress={() => this.signOut()}>
              <Text>Sign out</Text>
            </Button>
          </Content>
        </Container>
      )
  }
}

export default Profile
