import { Body, Button, Card, CardItem, Container, Content, Form, H2, H3, Input, Item, Label, ListItem, Row, Spinner, Text, Textarea } from 'native-base';
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
    profileLoaded: false,
    profile: {}
  }

  componentDidMount () {
    this.auth.getAuthData()
    .then((authData) => {
      // console.log('have auth data cdnnnn', authData)
      this.setState({
        profileLoaded: true,
        profile: {
          photo: this.getUserPhotoUrl(authData),
          name: authData.user.name,
          email: authData.user.email
        }
      })
    })
  }

  signOut () {
    this.auth.signOut()
  }

  getUserPhotoUrl (authData: Object) {
    return authData.type === 'facebook' ? authData.user.picture.data.url : authData.user.photo
  }

  render () {
      return (
        <Container style={{ padding: 16 }}>
          {this.state.profileLoaded
          ? (
            <Content>
              <Image
                source={{ uri: this.state.profile.photo }}
                style={{ width: 80, height: 80, alignSelf: 'center', borderRadius: 40 }} />
              <H2 style={{ textAlign: 'center', paddingVertical: 12, fontWeight: 'bold' }}>
                {this.state.profile.name}
              </H2>
              <H3 style={{ textAlign: 'center', paddingVertical: 8 }}>
                {this.state.profile.email}
              </H3>
              <Button
                style={{ alignSelf: 'center', marginTop: 16, backgroundColor: colors.cyan['500'] }}
                onPress={() => this.signOut()}>
                <Text>Sign out</Text>
              </Button>
            </Content>
          ) : (
            <Spinner />
          )}
        </Container>
      )
  }
}

export default Profile
