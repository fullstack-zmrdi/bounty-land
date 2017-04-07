import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'

import {
  observer
} from 'mobx-react'

import globalStore from './stores/global-store'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'

import {observable} from 'mobx'
import classNames from 'classnames'

export default class Layout extends Component {
  render () {
    return <div class='bounty-land-main'>
      {this.props.children}
    </div >
  }
}
