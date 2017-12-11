
import PropTypes from 'prop-types'

import {Animate} from './animate'

const DEFAULT_DURATION = 200

const defaultStyle = (duration = DEFAULT_DURATION) => ({
  transition: `opacity ${duration}ms ease-out, transform ${duration}ms cubic-bezier(.9,.83,.71,1.37)`,
  opacity: 0
})

const transitionStyles = distance => ({
  entering: {
    opacity: 0,
    transform: `translateY(${distance})`
  },
  entered: {
    opacity: 1,
    transform: `translateY(0)`
  },
  exiting: {
    opacity: 0,
    transform: `translateY(-${distance})`
  },
  exited: {
    opacity: 0,
    transform: `translateY(-${distance})`
  }
})

export const ScrollUp = ({
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
ScrollUp.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
  distance: PropTypes.string
}
ScrollUp.defaultProps = {
  in: true,
  duration: DEFAULT_DURATION,
  distance: '20px'
}
