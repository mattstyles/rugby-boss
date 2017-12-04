
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {TransitionMotion, spring} from 'react-motion'

const willLeave = distance => () => ({
  x: spring(0 - distance),
  opacity: spring(0)
})

const willEnter = distance => () => ({
  x: distance,
  opacity: 0
})

const TRANSLATE_PRESET = {
  stiffness: 280,
  damping: 15
}
const OPACITY_PRESET = {
  stiffness: 170,
  damping: 25
}

const mapStyles = child => ({
  key: child.key,
  style: {
    x: spring(0, TRANSLATE_PRESET),
    opacity: spring(100, OPACITY_PRESET)
  }
})

const mapChildren = children => ({key, style: {x, opacity}}) => (
  <AppearElement
    {...{key, x, opacity}}
  >{children}</AppearElement>
)

const AppearElement = styled.div.attrs({
  style: ({x, background, opacity}) => ({
    transform: `translateX(${x}%)`,
    opacity: `${opacity}`
  })
})`
  position: absolute;
  left: 0;
  top: 0;
`

export const Appear = ({
  appearDistance,
  containerStyles,
  children
}) => (
  <TransitionMotion
    willLeave={willLeave(appearDistance)}
    willEnter={willEnter(appearDistance)}
    styles={React.Children.map(children, mapStyles)}
  >
    {styles => {
      return (
        <div style={containerStyles}>
          {styles.map(mapChildren(children))}
        </div>
      )
    }}
  </TransitionMotion>
)
Appear.defaultProps = {
  appearDistance: 200
}
Appear.propTypes = {
  appearDistance: PropTypes.number,
  containerStyles: PropTypes.object.isRequired
}
