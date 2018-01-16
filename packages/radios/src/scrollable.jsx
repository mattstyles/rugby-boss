
import React, {Component} from 'react'
import {scroll} from 'raid-streams/screen'

import {View} from './'

const createScrollChild = scrollEvent => Component => {
  return Component.props.onScroll
    ? React.cloneElement(Component, {
      scroll: scrollEvent
    })
    : Component
}

export class Scrollable extends Component {
  state = {
    scrollEvent: null
  }

  componentDidMount () {
    this.scrollable = scroll({
      el: this.el
    })

    this.scrollable
      .map(event => {
        // @TODO mutate or return new?
        event.payload.bottom = event.payload.top + this.el.offsetHeight
        return event
      })
      .observe(
        this.onScroll,
        err => console.error(err)
      )

    // Send initial event with parent dimensions
    this.onScroll({
      type: null,
      payload: {
        top: this.el.offsetTop,
        bottom: this.el.offsetTop + this.el.offsetHeight
      }
    })
  }

  // componentWillUnmount () {
  //   if (this.scrollable) {
  //     this.scrollable.dispose()
  //   }
  // }

  onScroll = event => {
    this.setState(state => ({
      ...state,
      scrollEvent: event
    }))
  }

  render () {
    const {children} = this.props
    const {scrollEvent} = this.state
    return (
      <View
        innerRef={(el) => { this.el = el }}
        {...this.props}
      >
        {React.Children.map(
          children,
          createScrollChild(scrollEvent)
        )}
      </View>
    )
  }
}
