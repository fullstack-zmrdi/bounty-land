import * as firebase from 'firebase'

import { Body, Button, Card, CardItem, Container, Content, Form, H2, Header, Icon, Input, Item, Label, Row, Tab, TabHeading, Tabs, Text } from 'native-base'
import { Platform, View, WebView } from 'react-native'
import React, { Component } from 'react'

import Toast from '@remobile/react-native-toast'

const a = '19922'
class Wallet extends Component {
  render () {
    return (
      <Container>
        <Header hasTabs  />
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="camera" /><Text>Transactions</Text></TabHeading>}>
            <Text>Balance</Text>
            <H2>{a}</H2>
          </Tab>
          <Tab heading={ <TabHeading><Icon name="ios-arrow-dropleft" /><Text>Top up</Text></TabHeading>}>
            <Text>Top up</Text>
            <Input></Input>
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

export default Wallet
