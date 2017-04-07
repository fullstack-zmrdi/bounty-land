import React, {PropTypes, Component} from 'react'

import mobxReact, {observer} from 'mobx-react'
import TextField from 'material-ui/TextField'

import _ from 'lodash'
import {extendObservable, ObservableMap} from 'mobx'

const boundToProps = new WeakMap()

@observer
class BoundInput extends Component {
  constructor (props) {
    super(props)
    let {source} = props
    if (!source.errors) {
      extendObservable(source, {
        errors: new ObservableMap()
      })
    }
  }
  _runValidation () {
    const {validation, source, name} = this.props
    if (validation) {
      if (source[name] !== undefined) {
        const newErrorMsg = validation(source[name])
        if (newErrorMsg) {
          source.errors.set(name, newErrorMsg)
        } else {
          source.errors.delete(name)
        }
      }
    }
  }

  render () {
    let props = this.props
    let {source, className, name, onChange} = props

    if (!source) {
      source = {}
      source[name] = props.parent.state[name]
    }
    let cln = className
    const propsToPass = _.omit(props, 'onChange', 'className')

    const prefixPropName = boundToProps.get(props) || props.boundPrefix
    let stateObj = null
    if (props.parent) {
      stateObj = props.parent.state
    }
    let val
    if (prefixPropName) {
      val = stateObj[prefixPropName][name]
    } else {
      val = source[name]
    }
    const errMsg = source.errors.get(name)
    if (errMsg) {
      cln += ' has-error'
    }
    propsToPass.hint = errMsg
    delete propsToPass.validation

    return <TextField
      name={name}
      className={cln}
      autoComplete={props.autocomplete}
      defaultValue={val}
      inputRef={this.props.inputRef}
      onChange={(ev) => {
        const {value} = ev.target
        if (value || value === '') {  // onChange gets triggered even when invalid key is pressed(for example 'a' key on an input of type number)
          if (stateObj) {
            if (prefixPropName) {
              stateObj[prefixPropName][name] = value
            } else {
              stateObj[name] = value
            }
            props.parent.setState(stateObj)
          } else {
            source[name] = value
          }
        }

        this._runValidation()

        if (onChange) {
          onChange(ev)
        }
      }
    } {...propsToPass} />
  }
}

BoundInput.propTypes = {
  name: PropTypes.string.isRequired,
  validation: PropTypes.func,
  boundPrefix: PropTypes.string,
  onChange: PropTypes.func,
  source: mobxReact.PropTypes.observableObject.isRequired,
  parent: PropTypes.object
}

export const BoundTo = (props) => {
  const {children} = props
  if (Array.isArray(children)) {
    children.forEach((input) => {
      if (typeof input.props === 'object') {
        boundToProps.set(input.props, props.prop)
      }
    })
  } else {
    boundToProps.set(children.props, props.prop)
  }

  return <div>
    {props.children}
  </div>
}
BoundTo.propTypes = {
  prop: PropTypes.string,
  children: PropTypes.node
}

export default BoundInput
