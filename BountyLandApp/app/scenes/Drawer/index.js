import React, {Component} from 'react'

import { View, NativeModules } from 'react-native'

import { Container, Content, Button, Text, List, ListItem, Left, Body, Icon } from 'native-base'
import colors from 'material-colors'


class Drawer extends Component {
  pushScreen (screen) {
    this.props.navigator.push(screen)
    this.props.navigator.toggleDrawer({ to: 'closed', side: 'left', animated: true })
  }

  render () {
    return (
      <Container style={{ backgroundColor: colors.white, maxWidth: 320 }}>
        <Content>
          <ListItem onPress={() => NativeModules.UtilsModule.showDevMenu()}>
            <Text>{'dev menu'}</Text>
          </ListItem>
          <ListItem onPress={() => this.pushScreen({
            screen: 'PROFILE',
            title: 'profile'
          })}>
            <Text>{'profile'}</Text>
          </ListItem>
          <ListItem>
            <Text>{'challenges'}</Text>
          </ListItem>
          <ListItem>
            <Text>{'wallet'}</Text>
          </ListItem>
          <ListItem>
            <Text>{'about'}</Text>
          </ListItem>
        </Content>
      </Container>
    )
  }
}

export default Drawer
