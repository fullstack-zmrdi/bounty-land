import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import * as firebase from 'firebase'
import Toast from 'react-native-toast'
import { Header, Container, Content, Card, CardItem, Text, Body, H2, Button, Row, Form, Item, Label, Input, Tabs, Tab, TabHeading, Icon } from 'native-base'
import { WebView } from 'react-native'
//import checkout from '../../checkout.html'

const a = 19922
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
          <Tab heading={ <TabHeading><Icon name="import export" /><Text>Top up</Text></TabHeading>}>
            <Text>Top up</Text>
            <Input></Input>
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

export default Wallet
