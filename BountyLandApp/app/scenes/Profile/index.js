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

  state = {
    authData: {}
  }

  componentDidMount () {
    this.auth.getAuthData()
    .then((authData) => {
      console.log('have auth data', authData)
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
            <ListItem><Text>{this.state.authData.isAuthenticated}</Text></ListItem>
            <Button onPress={() => this.signOut()}><Text>Sign out</Text></Button>
          </Content>
        </Container>
      )
  }
}

export default Profile
