
import React from 'react'
import styled from 'styled-components'
import {TransitionGroup, Transition} from 'react-transition-group'

const TRANSITIONS = {
  FADE: 'fade',
  PAGE_IN: 'pageIn',
  PAGE_OUT: 'pageOut',
  MODAL: 'modal'
}

export const PageGroup = styled(TransitionGroup)`
  position: relative;
  width: 100%;
  height: 100%;
`

export const childFactory = transition => child =>
  React.cloneElement(child, {transition})

const setStyles = (...args) => node => Object.assign(node.style, ...args)
const setDelayedStyles = (delay, ...args) => node => setTimeout(() => {
  Object.assign(node.style, ...args)
}, delay)

const defaultEnterStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0
}

const fadeTransition = ({timeout}) => ({
  onEnter: setStyles(defaultEnterStyle, {
    transition: `opacity ${timeout.enter}ms ease-out`,
    opacity: 0
  }),
  onEntering: setDelayedStyles(10, {
    opacity: 1
  }),
  onExiting: setStyles({
    opacity: 0
  })
})

const router = {
  [TRANSITIONS.FADE]: fadeTransition
}

const getTransition = ({transition, timeout}) => {
  if (!transition || !router[transition]) {
    return fadeTransition({timeout})
  }

  return router[transition]({timeout})
}

const Page = styled(Transition)`
  position: absolute,
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

export const PageTransition = ({
  children,
  transition,
  timeout,
  ...props
}) => (
  <Page
    timeout={timeout}
    appear
    unmountOnExit
    {...props}
    {...getTransition({
      transition,
      timeout
    })}
  >
    {children}
  </Page>
)
PageTransition.defaultProps = {
  timeout: {
    enter: 150,
    exit: 300
  }
}
