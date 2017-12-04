
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

const mapStyles = ({
  translatePreset = TRANSLATE_PRESET,
  opacityPreset = OPACITY_PRESET
}) => child => ({
  key: child.key,
  style: {
    x: spring(0, translatePreset),
    opacity: spring(100, opacityPreset)
  }
})

const mapChildren = (children, styles) => ({key, style: {x, opacity}}) => (
  <AppearElement
    {...{key, x, opacity}}
    styles={styles}
  >{children}</AppearElement>
)

const AppearElement = styled.div.attrs({
  style: ({x, opacity, styles}) => ({
    transform: `translateX(${x}%)`,
    opacity: `${opacity}`,
    ...styles
  })
})`
  position: absolute;
  left: 0;
  top: 0;
`

export const Appear = ({
  appearDistance,
  containerStyles,
  itemStyles,
  translatePreset,
  opacityPreset,
  children
}) => (
  <TransitionMotion
    willLeave={willLeave(appearDistance)}
    willEnter={willEnter(appearDistance)}
    styles={React.Children.map(children, mapStyles({
      translatePreset,
      opacityPreset
    }))}
  >
    {styles => {
      return (
        <div style={containerStyles}>
          {styles.map(mapChildren(children, itemStyles))}
        </div>
      )
    }}
  </TransitionMotion>
)
Appear.defaultProps = {
  appearDistance: 200,
  itemStyles: {},
  opacityPreset: null,
  translatePreset: null
}
Appear.propTypes = {
  appearDistance: PropTypes.number,
  containerStyles: PropTypes.object.isRequired,
  itemStyles: PropTypes.object
}
