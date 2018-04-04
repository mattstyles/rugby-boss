
import React, {Component} from 'react'
import Hammer from 'react-hammerjs'

export class Slideable extends Component {
  state = {
    distance: 0,
    isPanning: false,
    isOpen: true
  }

  getOpenDistance (deltaX) {
    if (deltaX > 30) {
      return 200
    }
    if (deltaX < -30) {
      return -200
    }
    return 0
  }

  onPan = event => {
    // console.log(event)
    this.setState(state => ({
      ...state,
      distance: event.deltaX,
      isPanning: true,
      isOpen: false
    }))
  }

  onPanEnd = event => {
    // console.log('end', event)
    const distance = this.getOpenDistance(event.deltaX)
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
