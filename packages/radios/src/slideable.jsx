
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import {noop} from 'lodash/fp'

export class Slideable extends Component {
  static defaultProps = {
    isOpenThreshold: 64,
    maxOpenThreshold: 192,
    autoActivate: true,
    onOpenLeft: noop,
    onOpenRight: noop
  }

  static propTypes = {
    isOpenThreshold: PropTypes.number,
    autoActivate: PropTypes.bool,
    onOpenLeft: PropTypes.func,
    onOpenRight: PropTypes.func
  }

  state = {
    distance: 0,
    isPanning: false,
    isOpen: true
  }

  getOpenDistance = deltaX => {
    if (deltaX > this.props.isOpenThreshold) {
      return this.props.isOpenThreshold
    }
    if (deltaX < -this.props.isOpenThreshold) {
      return -this.props.isOpenThreshold
    }
    return 0
  }

  getPanDistance = deltaX => {
    if (deltaX > this.props.maxOpenThreshold) {
      return this.props.maxOpenThreshold
    }
    if (deltaX < -this.props.maxOpenThreshold) {
      return -this.props.maxOpenThreshold
    }
    return deltaX
  }

  fireActivationEvents = distance => {
    if (distance > 0) {
      this.props.onOpenLeft()
    }

    if (distance < 0) {
      this.props.onOpenRight()
    }
  }

  onPan = event => {
    // console.log(event.deltaX)
    const distance = this.getPanDistance(event.deltaX)
    this.setState(state => ({
      ...state,
      distance: distance,
      isPanning: true,
      isOpen: false
    }))
  }

  onPanEnd = event => {
    // console.log('end', event)
    let distance = this.getOpenDistance(event.deltaX)

    if (this.props.autoActivate) {
      this.fireActivationEvents(distance)
      distance = 0
    }

    this.setState(state => ({
      ...state,
      distance: distance,
      isPanning: false,
      isOpen: Boolean(distance)
    }))
  }

  render () {
    const {children} = this.props
    const {distance, isPanning} = this.state
    const style = {
      transform: `translate3d(${distance}px, 0, 0)`
    }
    if (!isPanning) {
      style.transition = `transform 200ms linear`
    }
    return (
      <Hammer
        onPan={this.onPan}
        onPanEnd={this.onPanEnd}
        options={{
          recognizers: {
            pan: {
              direction: 6,
              threshold: 10
            }
          }
        }}
      >
        <div
          ref={el => { this.slider = el }}
          style={style}
        >{children}</div>
      </Hammer>
    )
  }
}
