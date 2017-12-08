
import PropTypes from 'prop-types'

import {Animate} from './animate'

const DEFAULT_DURATION = 200

const defaultStyle = (duration = DEFAULT_DURATION) => ({
  transition: `opacity ${duration}ms ease-out, transform ${duration}ms cubic-bezier(.28,.8,.71,1.49)`,
  opacity: 0
})

const transitionStyles = {
  entering: {
    opacity: 0,
    transform: `translateY(20px)`
  },
  entered: {
    opacity: 1,
    transform: `translateY(0)`
  },
  exiting: {
    opacity: 0,
    transform: `translateY(20px)`
  },
  exited: {
    opacity: 0,
    transform: `translateY(20px)`
  }
}

export const SlideUp = ({
  in: inProp,
  duration,
  children
}) => (
  <Animate
    in={inProp}
    timeout={duration}
    defaultStyle={defaultStyle(duration)}
    transitionStyles={transitionStyles}
  >
    {children}
  </Animate>
)
SlideUp.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number
}
SlideUp.defaultProps = {
  in: true,
  duration: DEFAULT_DURATION
}
