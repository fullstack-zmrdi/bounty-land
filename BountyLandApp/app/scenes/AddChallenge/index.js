import React, {Component} from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import * as firebase from "firebase"
import I18n from 'react-native-i18n'

import { Container, Content, Card, CardItem, Text, Body, H2, Button,  Row, Form, Item, Label, Input } from 'native-base';

class AddChallenge extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  }

  state = {
    name: '',
    bounty: ''
  }

  hide () {
    if (Platform.OS === 'ios'){
      this.props.navigator.dismissLightBox()
    } else {
      this.props.navigator.dismissModal()
    }
  }

  render () {
    return (
      <Card>
        <CardItem header>
          <H2>{I18n.t('add_challenge')}</H2>
        </CardItem>
        <CardItem body>
          <Body>
          <Form >
            <Item floatingLabel style={{ width: 300, marginBottom: 20 }} >
              <Label>{'name'}</Label>
              <Input value={this.state.name} onChangeText={(val) => this.setState({ name: val })} />
            </Item>
            <Item floatingLabel style={{ width: 300, marginBottom: 20 }}>
              <Label>{'category'}</Label>
              <Input value={this.state.category} onChangeText={(val) => this.setState({ category: val })} />
            </Item>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20  }}>
               <Item floatingLabel style={{ flex: 0.5 }}>
                <Label>{'bounty'}</Label>
                <Input value={this.state.bounty} onChangeText={(val) => this.setState({ bounty: val })} />
              </Item>
              <Item floatingLabel style={{ flex: 0.5 }}>
                <Label>{'End date'}</Label>
                <Input value={this.state.endDate} onChangeText={(val) => this.setState({ endDate: val })} />
              </Item>
            </View>
            <Item floatingLabel>
              <Label>{'Description'}</Label>
              <Input multiline numberOfLines={3} value={this.state.description} onChangeText={(val) => this.setState({ description: val })} />
            </Item>

          </Form>
          </Body>
        </CardItem>
        <CardItem footer>
          <Row>
            <Button transparent onPress={() => this.hide()}>
              <Text>{'cancel'.toUpperCase()}</Text>
            </Button>
            <Button transparent onPress={() => this.props.selectLocation(this.state)}>
              <Text>{'select_location'.toUpperCase()}</Text>
            </Button>
          </Row>
        </CardItem>
      </Card>
    )
  }
}

export default AddChallenge
