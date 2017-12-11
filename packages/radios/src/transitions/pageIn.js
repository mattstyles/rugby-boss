
import PropTypes from 'prop-types'

import {Animate} from './animate'

const DEFAULT_DURATION = 200

const defaultStyle = (duration = DEFAULT_DURATION) => ({
  transition: `opacity ${duration}ms ease-out, transform ${duration}ms cubic-bezier(.28,.8,.71,1)`,
  opacity: 0,
  width: '100%',
  height: '100%'
})

const transitionStyles = distance => ({
  entering: {
    opacity: 0,
    transform: `translateX(${distance})`
  },
  entered: {
    opacity: 1,
    transform: `translateX(0) scale(1)`
  },
  exiting: {
    opacity: 1,
    transform: `scale(0.5)`
  },
  exited: {
    opacity: 0,
    transform: `scale(0.5)`
  }
})

export const PageIn = ({
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
PageIn.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
  distance: PropTypes.string
}
PageIn.defaultProps = {
  in: true,
  duration: DEFAULT_DURATION,
  distance: '100%'
}
