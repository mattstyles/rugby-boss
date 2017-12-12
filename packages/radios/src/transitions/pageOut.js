
import PropTypes from 'prop-types'

import {Animate} from './animate'

const DEFAULT_DURATION = 200

const defaultStyle = (duration = DEFAULT_DURATION) => ({
  transition: `opacity ${duration}ms ease-out, transform ${duration}ms cubic-bezier(.28,.8,.71,1)`,
  opacity: 1,
  width: '100%',
  height: '100%',
  position: 'absolute'
})

const transitionStyles = distance => ({
  entering: {
    opacity: 1,
    transform: `translateX(-${distance})`
  },
  entered: {
    opacity: 1,
    transform: `translateX(0)`
  },
  exiting: {
    opacity: 1,
    transform: `translateX(100px)`,
    transitionTimingFunction: 'ease-in'
  },
  exited: {
    opacity: 1,
    transform: `translateX(100px)`
  }
})

export const PageOut = ({
  in: inProp,
  duration,
  distance,
  children
}) => (
  <Animate
    in={inProp}
    timeout={duration}
    defaultStyle={defaultStyle(duration)}
    transitionStyles={transitionStyles(distance)}
  >
    {children}
  </Animate>
)
PageOut.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
  distance: PropTypes.string
}
PageOut.defaultProps = {
  in: true,
  duration: DEFAULT_DURATION,
  distance: '100%'
}
