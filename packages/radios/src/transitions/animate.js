
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Transition, TransitionGroup} from 'react-transition-group'

const Item = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${props => props.width};
  height: ${props => props.height};
`
Item.defaultProps = {
  width: 'auto',
  height: 'auto'
}

const Group = styled.div`
  position: relative;
`

export const Animate = ({
  in: inProp,
  timeout,
  defaultStyle,
  transitionStyles,
  transitionProps,
  width,
  height,
  children
}) => (
  <Transition
    in={inProp}
    timeout={timeout}
    mountOnEnter
    unmountOnExit
    {...transitionProps}
  >
    {(state) => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        <Item width={width} height={height}>{children}</Item>
      </div>
    )}
  </Transition>
)
Animate.propTypes = {
  in: PropTypes.bool,
  timeout: PropTypes.oneOfType([
    PropTypes.shape({
      enter: PropTypes.number,
      exit: PropTypes.number
    }),
    PropTypes.number
  ]),
  defaultStyle: PropTypes.object,
  transitionStyles: PropTypes.shape({
    entering: PropTypes.object,
    entered: PropTypes.object,
    exiting: PropTypes.object,
    exited: PropTypes.object
  }),
  transitionProps: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string
}
Animate.defaultProps = {
  in: false,
  timeout: 200,
  defaultStyle: {},
  transitionStyles: {},
  transitionProps: {},
  width: 'auto',
  height: 'auto'
}

export const AnimateGroup = ({
  styles,
  children
}) => (
  <Group style={{styles}}>
    <TransitionGroup>
      {children}
    </TransitionGroup>
  </Group>
)
