
import PropTypes from 'prop-types'

import {Animate} from './animate'

const DEFAULT_DURATION = 200

// @TODO transition (via animate) can supply different timeouts for
// entering and leaving, this prop assumes only one duration is set
const defaultStyle = (duration = DEFAULT_DURATION) => ({
  transition: `opacity ${duration}ms ease-out`,
  opacity: 0
})

const transitionStyles = {
  entering: {
    opacity: 0
  },
  entered: {
    opacity: 1
  },
  exiting: {
    opacity: 0
  },
  exited: {
    opacity: 0
  }
}

export const Fade = ({
  in: inProp,
  duration,
  styles,
  children
}) => (
  <Animate
    in={inProp}
    timeout={duration}
    defaultStyle={{
      ...defaultStyle(duration),
      ...styles
    }}
    transitionStyles={transitionStyles}
  >
    {children}
  </Animate>
)
Fade.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
  styles: PropTypes.object
}
Fade.defaultProps = {
  in: true,
  duration: DEFAULT_DURATION,
  styles: {}
}
