import React, {Component} from 'react'
import { View } from 'react-native'
import { Container, Content, Card, CardItem, Text, Body, H2, Button,  Row, Form, Item, Label, Input, ListItem } from 'native-base';
import Auth from '../../auth'

class Profile extends Component {
  static navigatorStyle = {

  }

  constructor () {
    super()
    this.auth = Auth
  }

  signOut () {
    this.auth.signOut()
  }

  render () {
      return (
        <Container style={{ padding: 16 }}>
          <Content>
            <ListItem><Text>{this.state.user.email}</Text></ListItem>
            <Button onPress={() => this.signOut()}><Text>{I18n.t('sign_out')}</Text></Button>
          </Content>
        </Container>
      )
  }
}

export default Profile
