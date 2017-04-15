import React, {Component} from 'react'

import { View } from 'react-native'
import * as firebase from "firebase"

import { Container, Content, Card, CardItem, Text, Body, H2, Button,  Row, Form, Item, Label, Input } from 'native-base';
import I18n from 'react-native-i18n'

class ChallengeDetail extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  state = {
    name: '',
    bounty: ''
  }

  render () {
    return (
      <Container style={{ padding: 16 }}>
        <Content>
            <Card>
                <CardItem header>
                    <H2>{this.props.challenge.name}</H2>
                </CardItem>

                <CardItem>
                    <Body>
                    </Body>
                </CardItem>
                <CardItem footer>
                  <Row>
                  <Button transparent onPress={() => this.props.navigator.dismissModal()}>
                      <Text>{I18n.t('cancel').toUpperCase()}</Text>
                  </Button>
                  <Button transparent onPress={() => console.log('test')}>
                      <Text>{I18n.t('participate').toUpperCase()}</Text>
                  </Button>
                  </Row>
                </CardItem>
            </Card>
        </Content>
      </Container>
    )
  }
}

export default ChallengeDetail
