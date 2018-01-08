
import React, {Component} from 'react'
import {storiesOf} from '@storybook/react'
import createHistory from 'history/createMemoryHistory'
import oc from 'open-color'
import styled from 'styled-components'
import {Signal} from 'raid'

import {Navigator, createActions} from '../src/navigator/index.js'

import {PageTransition, PageGroup, childFactory, TRANSITIONS} from '../src/transitions/page'
import {AnimateGroup, PageIn, PageOut, Fade, H1, Button, View} from '../src'
import {AppHeader} from '../storybook/app'

import {TransitionGroup, Transition} from 'react-transition-group'

const signal = Signal.of()
const history = createHistory()
const actions = createActions(history)

signal.register((state, event) => {
  if (event.type === '@navigator:push') {
    return {
      ...state,
      transition: TRANSITIONS.PAGE_IN
    }
  }
  if (event.type === '@navigator:pop') {
    return {
      ...state,
      transition: TRANSITIONS.PAGE_OUT
    }
  }
  return state
})

const Group = styled(TransitionGroup)`
  width: 100%;
  height: 100%;
  position: relative;
`

const DURATION = 200
const Trans = ({
  key,
  route,
  children,
  transition,
  ...props
}) => (
  <Transition
    {...props}
    key={key}
    timeout={{
      enter: DURATION,
      exit: DURATION * 1.5
    }}
    unmountOnExit
    appear
    onEnter={(node) => {
      console.log('onEnter', transition, route)
      node.style.transition = `all ${DURATION}ms linear`
      node.style.position = 'absolute'
      node.style.top = '0px'
      node.style.left = '0px'
      node.style.bottom = '0px'
      node.style.right = '0px'

      if (!transition) {
        return
      }

      if (transition === 'PageIn') {
        node.style.zIndex = '10'
        node.style.transform = 'translateX(100%)'
        return
      }

      if (transition === 'PageOut') {
        node.style.zIndex = '5'
        node.style.transform = 'translateX(-25%)'
      }
    }}
    onEntering={node => {
      console.log('onEntering', transition, route)
      // Defer to ensure that transition occurs between onEnter
      // and onEntering. This ensures that there is not a gap between
      // exiting and entering children
      setTimeout(() => {
        node.style.transform = 'translateX(0%)'
      }, 10)
    }}
    onEntered={(node) => {
      console.log('onEntered', transition, route)
      // node.style.transform = 'translateX(0%)'
    }}
    onExit={node => {
      console.log('onExit', transition, route)
    }}
    onExiting={node => {
      console.log('onExiting', transition, route)
      if (!transition) {
        return
      }

      if (transition === 'PageIn') {
        node.style.zIndex = '5'
        node.style.transform = 'translateX(-25%)'
        return
      }

      if (transition === 'PageOut') {
        node.style.zIndex = '10'
        node.style.transform = 'translateX(100%)'
      }
    }}
    onExited={node => {
      console.log('onExited', transition, route)
    }}
  >
    {children}
  </Transition>
)

const childFactoryCreator = transition => child => (
  React.cloneElement(child, {
    transition
  })
)

class NavigationTransition extends Component {
  componentDidMount () {
    this.dispose = signal.observe(state => {
      this.setState(s => state)
    })
  }

  componentWillUnmount () {
    if (this.dispose) this.dispose()
  }

  state = {
    navigation: []
  }

  render () {
    console.log('::', this.state)
    const {transition} = this.state
    return (
      <Navigator
        signal={signal}
        navigation={this.state.navigation}
        history={history}
        storage={null}
        Component={PageGroup}
        ComponentProps={{
          childFactory: childFactory(transition)
        }}
      >
        {/* {this.props.children} */}
        <PageTransition
          key='root'
          route='/'
          transition={transition}
        >
          <RootView />
        </PageTransition>
        <PageTransition
          key='child'
          route='/child'
          transition={transition}
        >
          <ChildView />
        </PageTransition>
      </Navigator>
    )
  }
}

const RootView = () => (
  <View data-name='root' isPadded style={{background: oc.gray[3], height: '100%', boxSizing: 'border-box'}}>
    <H1>Root</H1>
    <Button primary onClick={e => actions.push('/child')}>Settings</Button>
  </View>
)

const ChildView = () => (
  <View data-name='child' isPadded style={{background: oc.green[1], height: '100%', boxSizing: 'border-box'}}>
    <H1>Child View</H1>
    <Button primary onClick={e => actions.back()}>Back</Button>
  </View>
)

storiesOf('navigator', module)
  .add('page transition', () => (
    <View flex>
      <AppHeader title='Page fade transition' />
      <NavigationTransition>
        {/* <Transition key='root' route='/'><RootView /></Transition>
        <Transition key='child' route='/child'><ChildView /></Transition> */}
        {/* <PageIn key='root' route='/'><RootView /></PageIn>
        <PageIn key='child' route='/child'><ChildView /></PageIn> */}
      </NavigationTransition>
    </View>
  ))
