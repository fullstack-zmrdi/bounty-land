import React, {Component} from 'react'

import { View } from 'react-native'
import * as firebase from "firebase"

import { Container, Content, Card, CardItem, Text, Body, H2, Button,  Row, Form, Item, Label, Input } from 'native-base';

class AddChallenge extends Component {
  static navigatorStyle = {
    navBarHidden: true,

  }

  state = {
    name: '',
    bounty: ''
  }

  render () {
    return (
      <Container style={{ padding: 16, backgroundColor: 'transparent' }}>
        <Content style={{ padding: 16, backgroundColor: 'transparent' }}>
          <Card>
            <CardItem header>
              <H2>{'add_challenge'}</H2>
            </CardItem>

            <CardItem>
              <Body>
              <Form >
                <Item floatingLabel style={{ width: 320 }} >
                  <Label>{'name'}</Label>
                  <Input value={this.state.name} onChangeText={(val) => this.setState({ name: val })} />
                </Item>
                <Item floatingLabel>
                  <Label>{'bounty'}</Label>
                  <Input value={this.state.bounty} onChangeText={(val) => this.setState({ bounty: val })} />
                </Item>
              </Form>
              </Body>
            </CardItem>
            <CardItem footer>
              <Row>
                <Button transparent onPress={() => this.props.navigator.dismissModal()}>
                  <Text>{'cancel'.toUpperCase()}</Text>
                </Button>
                <Button transparent onPress={() => this.props.selectLocation(this.state)}>
                  <Text>{'select_location'.toUpperCase()}</Text>
                </Button>
              </Row>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default AddChallenge
