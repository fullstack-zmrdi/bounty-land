import React, { Component } from 'react'
import {CardHeader} from 'material-ui'
import BoundInput from '../components/bound-input'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import globalStore from '../stores/global-store'
const state = observable({
  name: '',
  description: '',
  imaeg: null
})

@observer
class AddChallenge extends Component {
  componentDidMount () {
    globalStore.title = 'Add new challenge'
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <BoundInput
          source={state}
          name='name'
          floatingLabelText='Name'
        /><br />
      </div>
    )
  }
}

export default AddChallenge
